import { ValidMethod, Headers, QueryParams } from "./helper";
interface IClient {
    accessKeyID: string;
    accessKeySecret: string;
    getSignedHeaders: InstanceType<typeof Client>['getSignedHeaders'];
    request: typeof fetch;
    get: InstanceType<typeof Client>['get'];
    post: InstanceType<typeof Client>['post'];
    put: InstanceType<typeof Client>['put'];
    delete: InstanceType<typeof Client>['delete'];
}
declare class Client implements IClient {
    accessKeyID: string;
    accessKeySecret: string;
    constructor(config: any);
    getSignedHeaders(method: ValidMethod, path: string, queries: QueryParams): Headers;
    request(input: RequestInfo, init?: RequestInit): Promise<Response>;
    post(input: RequestInfo, init?: Omit<RequestInit, 'method'>): Promise<Response>;
    get(input: RequestInfo, init?: Omit<RequestInit, 'method'>): Promise<Response>;
    put(input: RequestInfo, init?: Omit<RequestInit, 'method'>): Promise<Response>;
    delete(input: RequestInfo, init?: Omit<RequestInit, 'method'>): Promise<Response>;
}
export default Client;
//# sourceMappingURL=index.d.ts.map