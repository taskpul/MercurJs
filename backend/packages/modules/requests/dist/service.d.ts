declare const RequestsModuleService_base: import("@medusajs/framework/utils").MedusaServiceReturnType<import("@medusajs/framework/utils").ModelConfigurationsToConfigTemplate<{
    readonly Request: import("@medusajs/framework/utils").DmlEntity<import("@medusajs/framework/utils").DMLEntitySchemaBuilder<{
        id: import("@medusajs/framework/utils").PrimaryKeyModifier<string, import("@medusajs/framework/utils").IdProperty>;
        type: import("@medusajs/framework/utils").TextProperty;
        data: import("@medusajs/framework/utils").JSONProperty;
        submitter_id: import("@medusajs/framework/utils").TextProperty;
        reviewer_id: import("@medusajs/framework/utils").NullableModifier<string, import("@medusajs/framework/utils").TextProperty>;
        reviewer_note: import("@medusajs/framework/utils").NullableModifier<string, import("@medusajs/framework/utils").TextProperty>;
        status: import("@medusajs/framework/utils").EnumProperty<["draft", "pending", "accepted", "rejected"]>;
    }>, "request">;
}>>;
declare class RequestsModuleService extends RequestsModuleService_base {
}
export default RequestsModuleService;
//# sourceMappingURL=service.d.ts.map