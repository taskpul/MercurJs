import ReviewModuleService from "./service";
export declare const REVIEW_MODULE = "review";
export * from "./utils";
export { ReviewModuleService };
declare const _default: import("@medusajs/types").ModuleExports<typeof ReviewModuleService> & {
    linkable: {
        readonly review: {
            id: {
                serviceName: "review";
                field: "review";
                linkable: "review_id";
                primaryKey: "id";
            };
            toJSON: () => {
                serviceName: "review";
                field: "review";
                linkable: "review_id";
                primaryKey: "id";
            };
        };
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map