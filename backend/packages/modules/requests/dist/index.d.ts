import RequestsModuleService from "./service";
export declare const REQUESTS_MODULE = "requests";
export { RequestsModuleService };
export * from "./utils";
declare const _default: import("@medusajs/types").ModuleExports<typeof RequestsModuleService> & {
    linkable: {
        readonly request: {
            id: {
                serviceName: "requests";
                field: "request";
                linkable: "request_id";
                primaryKey: "id";
            };
            toJSON: () => {
                serviceName: "requests";
                field: "request";
                linkable: "request_id";
                primaryKey: "id";
            };
        };
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map