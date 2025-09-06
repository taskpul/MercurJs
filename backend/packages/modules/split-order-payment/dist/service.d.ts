declare const SplitOrderPaymentModuleService_base: import("@medusajs/framework/utils").MedusaServiceReturnType<import("@medusajs/framework/utils").ModelConfigurationsToConfigTemplate<{
    readonly SplitOrderPayment: import("@medusajs/framework/utils").DmlEntity<import("@medusajs/framework/utils").DMLEntitySchemaBuilder<{
        id: import("@medusajs/framework/utils").PrimaryKeyModifier<string, import("@medusajs/framework/utils").IdProperty>;
        status: import("@medusajs/framework/utils").TextProperty;
        currency_code: import("@medusajs/framework/utils").TextProperty;
        authorized_amount: import("@medusajs/framework/utils").BigNumberProperty;
        captured_amount: import("@medusajs/framework/utils").BigNumberProperty;
        refunded_amount: import("@medusajs/framework/utils").BigNumberProperty;
        payment_collection_id: import("@medusajs/framework/utils").TextProperty;
    }>, "split_order_payment">;
}>>;
declare class SplitOrderPaymentModuleService extends SplitOrderPaymentModuleService_base {
}
export default SplitOrderPaymentModuleService;
//# sourceMappingURL=service.d.ts.map