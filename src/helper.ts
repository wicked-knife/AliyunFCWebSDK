import HmacSHA256 from "crypto-js/hmac-sha256";
import Base64 from "crypto-js/enc-base64";

export type QueryParams = { [key: string]: string | number | string[] | number[] };

export type ValidMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type Headers = {[key: string]: string};

function signString(source: string, secret: string) {
  return HmacSHA256(source, secret).toString(Base64);
}

function buildCanonicalHeaders(headers: Headers, prefix: string) {
  var list: string[] = [];
  var keys = Object.keys(headers);

  const fcHeaders: Headers = {};
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];

    const lowerKey = key.toLowerCase().trim();
    if (lowerKey.startsWith(prefix)) {
      list.push(lowerKey);
      fcHeaders[lowerKey] = headers[key];
    }
  }
  list.sort();

  var canonical = '';
  for (let i = 0; i < list.length; i++) {
    const key = list[i];
    canonical += `${key}:${fcHeaders[key]}\n`;
  }

  return canonical;
}


export function composeStringToSign(method: ValidMethod, path: string, headers: Headers, queries: QueryParams) {
  const contentMD5 = headers['content-md5'] || '';
  const contentType = headers['content-type'] || headers['Content-Type'] || '';
  const date = headers['x-fc-date'] || '';
  const signHeaders = buildCanonicalHeaders(headers, 'x-fc-');
  const A = document.createElement('a');
  A.href = path;
  const pathUnescaped = decodeURIComponent(A.pathname);
  let str = `${method}\n${contentMD5}\n${contentType}\n${date}\n${signHeaders}${pathUnescaped}`;

  if (queries) {
    const params: string[] = [];
    Object.keys(queries).forEach(function(key) {
      const values = queries[key];
      if (typeof values === 'string') {
        params.push(`${key}=${values}`);
        return;
      }
      if (Array.isArray(values)) {
        values.forEach(function(value){
          params.push(`${key}=${value}`);
        });
      }
    });
    params.sort();
    str += '\n' + params.join('\n');
  } else {
    str += '\n';
  }
  return str;
}

export function getSignature(accessKeyID: string, accessKeySecret: string, method: ValidMethod, path: string, headers: Headers, queries: QueryParams) {
  var stringToSign = composeStringToSign(method.toUpperCase() as ValidMethod, path, headers, queries);
  var sign = signString(stringToSign, accessKeySecret);
  return `FC ${accessKeyID}:${sign}`;
}
