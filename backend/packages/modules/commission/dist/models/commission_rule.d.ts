export declare const CommissionRule: import("@medusajs/framework/utils").DmlEntity<import("@medusajs/framework/utils").DMLEntitySchemaBuilder<{
    id: import("@medusajs/framework/utils").PrimaryKeyModifier<string, import("@medusajs/framework/utils").IdProperty>;
    name: import("@medusajs/framework/utils").TextProperty;
    reference: import("@medusajs/framework/utils").TextProperty;
    reference_id: import("@medusajs/framework/utils").TextProperty;
    is_active: import("@medusajs/framework/utils").BooleanProperty;
    rate: import("@medusajs/framework/utils").HasOne<() => import("@medusajs/framework/utils").DmlEntity<import("@medusajs/framework/utils").DMLEntitySchemaBuilder<{
        id: import("@medusajs/framework/utils").PrimaryKeyModifier<string, import("@medusajs/framework/utils").IdProperty>;
        type: import("@medusajs/framework/utils").TextProperty;
        percentage_rate: import("@medusajs/framework/utils").NullableModifier<number, import("@medusajs/framework/utils").NumberProperty>;
        include_tax: import("@medusajs/framework/utils").BooleanProperty;
        price_set_id: import("@medusajs/framework/utils").NullableModifier<string, import("@medusajs/framework/utils").TextProperty>;
        max_price_set_id: import("@medusajs/framework/utils").NullableModifier<string, import("@medusajs/framework/utils").TextProperty>;
        min_price_set_id: import("@medusajs/framework/utils").NullableModifier<string, import("@medusajs/framework/utils").TextProperty>;
        rule: import("@medusajs/framework/utils").RelationNullableModifier<() => import("@medusajs/framework/utils").DmlEntity<import("@medusajs/framework/utils").DMLEntitySchemaBuilder</*elided*/ any>, "commission_rule">, import("@medusajs/framework/utils").BelongsTo<() => import("@medusajs/framework/utils").DmlEntity<import("@medusajs/framework/utils").DMLEntitySchemaBuilder</*elided*/ any>, "commission_rule">, undefined>, true>;
    }>, "commission_rate">>;
}>, "commission_rule">;
//# sourceMappingURL=commission_rule.d.ts.map