export declare const Review: import("@medusajs/framework/utils").DmlEntity<import("@medusajs/framework/utils").DMLEntitySchemaBuilder<{
    id: import("@medusajs/framework/utils").PrimaryKeyModifier<string, import("@medusajs/framework/utils").IdProperty>;
    reference: import("@medusajs/framework/utils").EnumProperty<["product", "seller"]>;
    rating: import("@medusajs/framework/utils").NumberProperty;
    customer_note: import("@medusajs/framework/utils").NullableModifier<string, import("@medusajs/framework/utils").TextProperty>;
    seller_note: import("@medusajs/framework/utils").NullableModifier<string, import("@medusajs/framework/utils").TextProperty>;
}>, "review">;
//# sourceMappingURL=review.d.ts.map