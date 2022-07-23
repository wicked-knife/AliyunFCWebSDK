import { ValidMethod, Headers, QueryParams } from "./helper";
interface IClient {
    accessKeyID: string;
    accessKeySecret: string;
}
declare class Client implements IClient {
    accessKeyID: string;
    accessKeySecret: string;
    constructor(config: any);
    getSignature(method: ValidMethod, path: string, headers: Headers, queries: QueryParams): string;
}
export default Client;
//# sourceMappingURL=index.d.ts.map