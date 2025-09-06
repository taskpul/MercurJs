export declare const Request: import("@medusajs/framework/utils").DmlEntity<import("@medusajs/framework/utils").DMLEntitySchemaBuilder<{
    id: import("@medusajs/framework/utils").PrimaryKeyModifier<string, import("@medusajs/framework/utils").IdProperty>;
    type: import("@medusajs/framework/utils").TextProperty;
    data: import("@medusajs/framework/utils").JSONProperty;
    submitter_id: import("@medusajs/framework/utils").TextProperty;
    reviewer_id: import("@medusajs/framework/utils").NullableModifier<string, import("@medusajs/framework/utils").TextProperty>;
    reviewer_note: import("@medusajs/framework/utils").NullableModifier<string, import("@medusajs/framework/utils").TextProperty>;
    status: import("@medusajs/framework/utils").EnumProperty<["draft", "pending", "accepted", "rejected"]>;
}>, "request">;
//# sourceMappingURL=request.d.ts.map