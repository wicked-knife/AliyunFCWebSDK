import { ValidMethod, Headers, QueryParams } from "./helper";
interface IClient {
    accessKeyID: string;
    accessKeySecret: string;
    getSignedHeaders: InstanceType<typeof Client>['getSignedHeaders'];
}
declare class Client implements IClient {
    accessKeyID: string;
    accessKeySecret: string;
    constructor(config: any);
    getSignedHeaders(method: ValidMethod, path: string, queries: QueryParams): Headers;
}
export default Client;
//# sourceMappingURL=index.d.ts.map