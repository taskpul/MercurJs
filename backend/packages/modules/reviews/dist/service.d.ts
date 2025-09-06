declare const ReviewModuleService_base: import("@medusajs/framework/utils").MedusaServiceReturnType<import("@medusajs/framework/utils").ModelConfigurationsToConfigTemplate<{
    readonly Review: import("@medusajs/framework/utils").DmlEntity<import("@medusajs/framework/utils").DMLEntitySchemaBuilder<{
        id: import("@medusajs/framework/utils").PrimaryKeyModifier<string, import("@medusajs/framework/utils").IdProperty>;
        reference: import("@medusajs/framework/utils").EnumProperty<["product", "seller"]>;
        rating: import("@medusajs/framework/utils").NumberProperty;
        customer_note: import("@medusajs/framework/utils").NullableModifier<string, import("@medusajs/framework/utils").TextProperty>;
        seller_note: import("@medusajs/framework/utils").NullableModifier<string, import("@medusajs/framework/utils").TextProperty>;
    }>, "review">;
}>>;
declare class ReviewModuleService extends ReviewModuleService_base {
}
export default ReviewModuleService;
//# sourceMappingURL=service.d.ts.map