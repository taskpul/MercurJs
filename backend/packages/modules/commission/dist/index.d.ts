import CommissionModuleService from "./service";
export declare const COMMISSION_MODULE = "commission";
export { CommissionModuleService };
declare const _default: import("@medusajs/types").ModuleExports<typeof CommissionModuleService> & {
    linkable: {
        readonly commissionRate: {
            id: {
                serviceName: "commission";
                field: "commissionRate";
                linkable: "commission_rate_id";
                primaryKey: "id";
            };
            toJSON: () => {
                serviceName: "commission";
                field: "commissionRate";
                linkable: "commission_rate_id";
                primaryKey: "id";
            };
        };
        readonly commissionRule: {
            id: {
                serviceName: "commission";
                field: "commissionRule";
                linkable: "commission_rule_id";
                primaryKey: "id";
            };
            toJSON: () => {
                serviceName: "commission";
                field: "commissionRule";
                linkable: "commission_rule_id";
                primaryKey: "id";
            };
        };
        readonly commissionLine: {
            id: {
                serviceName: "commission";
                field: "commissionLine";
                linkable: "commission_line_id";
                primaryKey: "id";
            };
            toJSON: () => {
                serviceName: "commission";
                field: "commissionLine";
                linkable: "commission_line_id";
                primaryKey: "id";
            };
        };
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map