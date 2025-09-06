import TenantModuleService from "./service";
export declare const TENANT_MODULE = "tenant";
export { TenantModuleService };
declare const _default: import("@medusajs/types").ModuleExports<typeof TenantModuleService> & {
    linkable: {
        readonly tenant: {
            id: {
                serviceName: "tenant";
                field: "tenant";
                linkable: "tenant_id";
                primaryKey: "id";
            };
            toJSON: () => {
                serviceName: "tenant";
                field: "tenant";
                linkable: "tenant_id";
                primaryKey: "id";
            };
        };
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map