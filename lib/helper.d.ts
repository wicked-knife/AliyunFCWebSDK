export declare type QueryParams = {
    [key: string]: string | number | string[] | number[];
};
export declare type ValidMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export declare type Headers = {
    [key: string]: string;
};
export declare function composeStringToSign(method: ValidMethod, path: string, headers: Headers, queries: QueryParams): string;
export declare function getSignature(accessKeyID: string, accessKeySecret: string, method: ValidMethod, path: string, headers: Headers, queries: QueryParams): string;
//# sourceMappingURL=helper.d.ts.map