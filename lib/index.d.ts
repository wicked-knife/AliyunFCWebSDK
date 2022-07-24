import { ValidMethod, QueryParams } from "./helper";
interface IClient {
    accessKeyID: string;
    accessKeySecret: string;
}
declare class Client implements IClient {
    accessKeyID: string;
    accessKeySecret: string;
    constructor(config: any);
    getSignedHeaders(method: ValidMethod, path: string, queries: QueryParams): {
        'x-fc-date': string;
        "content-type": string;
        authorization: string;
    };
}
export default Client;
//# sourceMappingURL=index.d.ts.map