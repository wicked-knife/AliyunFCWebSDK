import { ValidMethod, Headers, QueryParams, getSignature} from "./helper";
interface IClient {
  accessKeyID: string;
  accessKeySecret: string;

  getSignedHeaders: InstanceType<typeof Client>['getSignedHeaders'];
  request: typeof fetch
  get: InstanceType<typeof Client>['get'];
  post: InstanceType<typeof Client>['post'];
  put: InstanceType<typeof Client>['put'];
  delete: InstanceType<typeof Client>['delete'];
}

class Client implements IClient {
  accessKeyID: string;
  accessKeySecret: string;
  constructor(config: any) {
    if (!config) {
      throw new TypeError('"config" must be passed in');
    }

    const accessKeyID = config.accessKeyID;
    if (!accessKeyID) {
      throw new TypeError('"config.accessKeyID" must be passed in');
    }

    const accessKeySecret = config.accessKeySecret;
    if (!accessKeySecret) {
      throw new TypeError('"config.accessKeySecret" must be passed in');
    }

    this.accessKeyID = accessKeyID;
    this.accessKeySecret = accessKeySecret;
  }

  getSignedHeaders(method: ValidMethod, path: string, queries: QueryParams) {
    const headers: Headers = {
      'x-fc-date': (new Date).toUTCString(),
      "content-type": "application/json",
    };

    const sign =  getSignature(this.accessKeyID, this.accessKeySecret, method, path, headers, queries);

    headers.authorization = sign;

    return headers
  }

  request(input: RequestInfo, init?: RequestInit) {
    // check fetch support
    if (!fetch) {
      throw new Error('fetch is not supported');
    }
    return fetch(input, init);
  }

  post(input: RequestInfo, init?: Omit<RequestInit, 'method'>){
    return this.request(input, {...init, method: 'POST'})
  }

  get(input: RequestInfo, init?: Omit<RequestInit, 'method'>){
    return this.request(input, {...init, method: 'GET'})
  }

  put(input: RequestInfo, init?: Omit<RequestInit, 'method'>){
    return this.request(input, {...init, method: 'PUT'})
  }

  delete(input: RequestInfo, init?: Omit<RequestInit, 'method'>){
    return this.request(input, {...init, method: 'DELETE'})
  }
}

export default Client;
