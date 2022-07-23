import { ValidMethod, Headers, QueryParams, getSignature} from "./helper";
interface IClient {
  accessKeyID: string;
  accessKeySecret: string;
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

  getSignature(method: ValidMethod, path: string, headers: Headers, queries: QueryParams) {
    return getSignature(this.accessKeyID, this.accessKeySecret, method, path, headers, queries);
  }
}

export default Client;
