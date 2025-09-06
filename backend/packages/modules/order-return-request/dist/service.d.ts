declare const OrderReturnModuleService_base: import("@medusajs/framework/utils").MedusaServiceReturnType<import("@medusajs/framework/utils").ModelConfigurationsToConfigTemplate<{
    readonly OrderReturnRequest: import("@medusajs/framework/utils").DmlEntity<import("@medusajs/framework/utils").DMLEntitySchemaBuilder<{
        id: import("@medusajs/framework/utils").PrimaryKeyModifier<string, import("@medusajs/framework/utils").IdProperty>;
        customer_id: import("@medusajs/framework/utils").TextProperty;
        customer_note: import("@medusajs/framework/utils").TextProperty;
        shipping_option_id: import("@medusajs/framework/utils").NullableModifier<string, import("@medusajs/framework/utils").TextProperty>;
        vendor_reviewer_id: import("@medusajs/framework/utils").NullableModifier<string, import("@medusajs/framework/utils").TextProperty>;
        vendor_reviewer_note: import("@medusajs/framework/utils").NullableModifier<string, import("@medusajs/framework/utils").TextProperty>;
        vendor_review_date: import("@medusajs/framework/utils").NullableModifier<Date, import("@medusajs/framework/utils").DateTimeProperty>;
        admin_reviewer_id: import("@medusajs/framework/utils").NullableModifier<string, import("@medusajs/framework/utils").TextProperty>;
        admin_reviewer_note: import("@medusajs/framework/utils").NullableModifier<string, import("@medusajs/framework/utils").TextProperty>;
        admin_review_date: import("@medusajs/framework/utils").NullableModifier<Date, import("@medusajs/framework/utils").DateTimeProperty>;
        line_items: import("@medusajs/framework/utils").HasMany<() => import("@medusajs/framework/utils").DmlEntity<import("@medusajs/framework/utils").DMLEntitySchemaBuilder<{
            id: import("@medusajs/framework/utils").PrimaryKeyModifier<string, import("@medusajs/framework/utils").IdProperty>;
            line_item_id: import("@medusajs/framework/utils").TextProperty;
            quantity: import("@medusajs/framework/utils").NumberProperty;
            reason_id: import("@medusajs/framework/utils").NullableModifier<string, import("@medusajs/framework/utils").TextProperty>;
            return_request: import("@medusajs/framework/utils").BelongsTo<() => import("@medusajs/framework/utils").DmlEntity<import("@medusajs/framework/utils").DMLEntitySchemaBuilder</*elided*/ any>, "order_return_request">, undefined>;
        }>, "order_return_request_line_item">>;
        status: import("@medusajs/framework/utils").EnumProperty<["pending", "refunded", "withdrawn", "escalated", "canceled"]>;
    }>, "order_return_request">;
    readonly OrderReturnRequestLineItem: import("@medusajs/framework/utils").DmlEntity<import("@medusajs/framework/utils").DMLEntitySchemaBuilder<{
        id: import("@medusajs/framework/utils").PrimaryKeyModifier<string, import("@medusajs/framework/utils").IdProperty>;
        line_item_id: import("@medusajs/framework/utils").TextProperty;
        quantity: import("@medusajs/framework/utils").NumberProperty;
        reason_id: import("@medusajs/framework/utils").NullableModifier<string, import("@medusajs/framework/utils").TextProperty>;
        return_request: import("@medusajs/framework/utils").BelongsTo<() => import("@medusajs/framework/utils").DmlEntity<import("@medusajs/framework/utils").DMLEntitySchemaBuilder<{
            id: import("@medusajs/framework/utils").PrimaryKeyModifier<string, import("@medusajs/framework/utils").IdProperty>;
            customer_id: import("@medusajs/framework/utils").TextProperty;
            customer_note: import("@medusajs/framework/utils").TextProperty;
            shipping_option_id: import("@medusajs/framework/utils").NullableModifier<string, import("@medusajs/framework/utils").TextProperty>;
            vendor_reviewer_id: import("@medusajs/framework/utils").NullableModifier<string, import("@medusajs/framework/utils").TextProperty>;
            vendor_reviewer_note: import("@medusajs/framework/utils").NullableModifier<string, import("@medusajs/framework/utils").TextProperty>;
            vendor_review_date: import("@medusajs/framework/utils").NullableModifier<Date, import("@medusajs/framework/utils").DateTimeProperty>;
            admin_reviewer_id: import("@medusajs/framework/utils").NullableModifier<string, import("@medusajs/framework/utils").TextProperty>;
            admin_reviewer_note: import("@medusajs/framework/utils").NullableModifier<string, import("@medusajs/framework/utils").TextProperty>;
            admin_review_date: import("@medusajs/framework/utils").NullableModifier<Date, import("@medusajs/framework/utils").DateTimeProperty>;
            line_items: import("@medusajs/framework/utils").HasMany<() => import("@medusajs/framework/utils").DmlEntity<import("@medusajs/framework/utils").DMLEntitySchemaBuilder</*elided*/ any>, "order_return_request_line_item">>;
            status: import("@medusajs/framework/utils").EnumProperty<["pending", "refunded", "withdrawn", "escalated", "canceled"]>;
        }>, "order_return_request">, undefined>;
    }>, "order_return_request_line_item">;
}>>;
declare class OrderReturnModuleService extends OrderReturnModuleService_base {
}
export default OrderReturnModuleService;
//# sourceMappingURL=service.d.ts.map