declare const TenantModuleService_base: import("@medusajs/framework/utils").MedusaServiceReturnType<import("@medusajs/framework/utils").ModelConfigurationsToConfigTemplate<{
    readonly Tenant: import("@medusajs/framework/utils").DmlEntity<import("@medusajs/framework/utils").DMLEntitySchemaBuilder<{
        id: import("@medusajs/framework/utils").PrimaryKeyModifier<string, import("@medusajs/framework/utils").IdProperty>;
        slug: import("@medusajs/framework/utils").TextProperty;
        settings: import("@medusajs/framework/utils").NullableModifier<Record<string, unknown>, import("@medusajs/framework/utils").JSONProperty>;
    }>, "tenant">;
}>>;
declare class TenantModuleService extends TenantModuleService_base {
}
export default TenantModuleService;
//# sourceMappingURL=service.d.ts.map