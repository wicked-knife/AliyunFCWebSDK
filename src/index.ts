import { ValidMethod, Headers, QueryParams, getSignature} from "./helper";
interface IClient {
  accessKeyID: string;
  accessKeySecret: string;

  getSignedHeaders: InstanceType<typeof Client>['getSignedHeaders'];
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
}

export default Client;
