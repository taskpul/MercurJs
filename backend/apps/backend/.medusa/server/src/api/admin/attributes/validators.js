"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCreateAttribute = exports.CreateAttribute = exports.AdminUpdateAttribute = exports.AdminUpdateAttributeValue = exports.AdminCreateAttributeValue = exports.AdminGetAttributesParams = exports.GetAttributesParams = exports.AdminGetAttributeParams = exports.AdminGetAttributeValuesParams = exports.AdminGetAttributeValueParams = void 0;
const zod_1 = require("zod");
const common_1 = require("@medusajs/medusa/api/utils/common-validators/common");
const validators_1 = require("@medusajs/medusa/api/utils/validators");
var AttributeUIComponent;
(function (AttributeUIComponent) {
    AttributeUIComponent["SELECT"] = "select";
    AttributeUIComponent["MULTIVALUE"] = "multivalue";
    AttributeUIComponent["UNIT"] = "unit";
    AttributeUIComponent["TOGGLE"] = "toggle";
    AttributeUIComponent["TEXTAREA"] = "text_area";
    AttributeUIComponent["COLOR_PICKER"] = "color_picker";
})(AttributeUIComponent || (AttributeUIComponent = {}));
exports.AdminGetAttributeValueParams = (0, validators_1.createSelectParams)();
exports.AdminGetAttributeValuesParams = (0, validators_1.createFindParams)();
exports.AdminGetAttributeParams = (0, validators_1.createSelectParams)();
exports.GetAttributesParams = zod_1.z.object({
    id: zod_1.z.string().optional(),
    name: zod_1.z.string().optional(),
    handle: zod_1.z.string().optional(),
    is_global: zod_1.z.boolean().default(false),
    created_at: (0, validators_1.createOperatorMap)().optional(),
    updated_at: (0, validators_1.createOperatorMap)().optional(),
    deleted_at: (0, validators_1.createOperatorMap)().optional(),
    ui_component: zod_1.z.nativeEnum(AttributeUIComponent).optional()
});
exports.AdminGetAttributesParams = (0, validators_1.createFindParams)({
    offset: 0,
    limit: 50
})
    .merge((0, common_1.applyAndAndOrOperators)(exports.GetAttributesParams))
    .merge(exports.GetAttributesParams);
exports.AdminCreateAttributeValue = zod_1.z.object({
    value: zod_1.z.string().min(1),
    rank: zod_1.z.number(),
    metadata: zod_1.z.record(zod_1.z.unknown()).optional()
});
exports.AdminUpdateAttributeValue = zod_1.z.object({
    id: zod_1.z.string().optional(),
    value: zod_1.z.string().optional(),
    rank: zod_1.z.number().optional(),
    metadata: zod_1.z.record(zod_1.z.unknown()).optional()
});
exports.AdminUpdateAttribute = zod_1.z
    .object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    handle: zod_1.z.string().optional(),
    is_filterable: zod_1.z.boolean().optional(),
    metadata: zod_1.z.record(zod_1.z.unknown()).optional(),
    ui_component: zod_1.z.nativeEnum(AttributeUIComponent).optional(),
    product_category_ids: zod_1.z.array(zod_1.z.string()).optional(),
    possible_values: zod_1.z.array(exports.AdminUpdateAttributeValue).optional()
})
    .strict();
exports.CreateAttribute = zod_1.z.object({
    name: zod_1.z.string().min(1),
    description: zod_1.z.string().optional(),
    is_filterable: zod_1.z.boolean().optional(),
    ui_component: zod_1.z
        .nativeEnum(AttributeUIComponent)
        .default(AttributeUIComponent.SELECT),
    handle: zod_1.z.string().optional(),
    metadata: zod_1.z.record(zod_1.z.unknown()).optional(),
    possible_values: zod_1.z.array(exports.AdminCreateAttributeValue).optional(),
    product_category_ids: zod_1.z.array(zod_1.z.string()).optional()
});
exports.AdminCreateAttribute = (0, validators_1.WithAdditionalData)(exports.CreateAttribute, (schema) => {
    return schema.refine((data) => data.ui_component !== AttributeUIComponent.SELECT ||
        (data.possible_values && data.possible_values.length > 0), {
        message: 'Possible values are required when ui_component is SELECT',
        path: ['possible_values']
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcGkvYWRtaW4vYXR0cmlidXRlcy92YWxpZGF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZCQUF1QjtBQUV2QixnRkFBNEY7QUFDNUYsc0VBSzhDO0FBRTlDLElBQUssb0JBT0o7QUFQRCxXQUFLLG9CQUFvQjtJQUN2Qix5Q0FBaUIsQ0FBQTtJQUNqQixpREFBeUIsQ0FBQTtJQUN6QixxQ0FBYSxDQUFBO0lBQ2IseUNBQWlCLENBQUE7SUFDakIsOENBQXNCLENBQUE7SUFDdEIscURBQTZCLENBQUE7QUFDL0IsQ0FBQyxFQVBJLG9CQUFvQixLQUFwQixvQkFBb0IsUUFPeEI7QUFLWSxRQUFBLDRCQUE0QixHQUFHLElBQUEsK0JBQWtCLEdBQUUsQ0FBQTtBQUtuRCxRQUFBLDZCQUE2QixHQUFHLElBQUEsNkJBQWdCLEdBQUUsQ0FBQTtBQUtsRCxRQUFBLHVCQUF1QixHQUFHLElBQUEsK0JBQWtCLEdBQUUsQ0FBQTtBQUU5QyxRQUFBLG1CQUFtQixHQUFHLE9BQUMsQ0FBQyxNQUFNLENBQUM7SUFDMUMsRUFBRSxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDekIsSUFBSSxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDM0IsTUFBTSxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDN0IsU0FBUyxFQUFFLE9BQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO0lBQ3JDLFVBQVUsRUFBRSxJQUFBLDhCQUFpQixHQUFFLENBQUMsUUFBUSxFQUFFO0lBQzFDLFVBQVUsRUFBRSxJQUFBLDhCQUFpQixHQUFFLENBQUMsUUFBUSxFQUFFO0lBQzFDLFVBQVUsRUFBRSxJQUFBLDhCQUFpQixHQUFFLENBQUMsUUFBUSxF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