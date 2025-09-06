"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSellerProductsStep = exports.exportProductFields = void 0;
const utils_1 = require("@medusajs/framework/utils");
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const seller_product_1 = __importDefault(require("../../../links/seller-product"));
exports.exportProductFields = [
    'id',
    'title',
    'subtitle',
    'status',
    'external_id',
    'description',
    'handle',
    'is_giftcard',
    'discountable',
    'thumbnail',
    'collection_id',
    'type_id',
    'weight',
    'length',
    'height',
    'width',
    'hs_code',
    'origin_country',
    'mid_code',
    'material',
    'metadata',
    'brand.name',
    'type',
    'collection',
    'options.*',
    'options.values',
    'tags.*',
    'images.*',
    'variants.*',
    'variants.prices',
    'variants.prices.price_rules.value',
    'variants.prices.price_rules.attribute',
    'variants.options.*'
];
exports.getSellerProductsStep = (0, workflows_sdk_1.createStep)('get-seller-products', async (seller_id, { container }) => {
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: products } = await query.graph({
        entity: seller_product_1.default.entryPoint,
        fields: exports.exportProductFields.map((field) => `product.${field}`),
        filters: {
            seller_id
        }
    });
    return new workflows_sdk_1.StepResponse(products.map((rel) => rel.product));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LXNlbGxlci1wcm9kdWN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3Mvc2VsbGVyL3N0ZXBzL2dldC1zZWxsZXItcHJvZHVjdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEscURBQXFFO0FBQ3JFLHFFQUE0RTtBQUU1RSxtRkFBeUQ7QUFFNUMsUUFBQSxtQkFBbUIsR0FBRztJQUNqQyxJQUFJO0lBQ0osT0FBTztJQUNQLFVBQVU7SUFDVixRQUFRO0lBQ1IsYUFBYTtJQUNiLGFBQWE7SUFDYixRQUFRO0lBQ1IsYUFBYTtJQUNiLGNBQWM7SUFDZCxXQUFXO0lBQ1gsZUFBZTtJQUNmLFNBQVM7SUFDVCxRQUFRO0lBQ1IsUUFBUTtJQUNSLFFBQVE7SUFDUixPQUFPO0lBQ1AsU0FBUztJQUNULGdCQUFnQjtJQUNoQixVQUFVO0lBQ1YsVUFBVTtJQUNWLFVBQVU7SUFDVixZQUFZO0lBQ1osTUFBTTtJQUNOLFlBQVk7SUFDWixXQUFXO0lBQ1gsZ0JBQWdCO0lBQ2hCLFFBQVE7SUFDUixVQUFVO0lBQ1YsWUFBWTtJQUNaLGlCQUFpQjtJQUNqQixtQ0FBbUM7SUFDbkMsdUNBQXVDO0lBQ3ZDLG9CQUFvQjtDQUNyQixDQUFBO0FBRVksUUFBQSxxQkFBcUIsR0FBRyxJQUFBLDBCQUFVLEVBQzdDLHFCQUFxQixFQUNyQixLQUFLLEVBQUUsU0FBaUIsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDekMsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxpQ0FBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUVoRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztRQUMzQyxNQUFNLEVBQUUsd0JBQWEsQ0FBQyxVQUFVO1FBQ2hDLE1BQU0sRUFBRSwyQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUM7UUFDOUQsT0FBTyxFQUFFO1lBQ1AsU0FBUztTQUNWO0tBQ0YsQ0FBQyxDQUFBO0lBRUYsT0FBTyxJQUFJLDRCQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7QUFDN0QsQ0FBQyxDQUNGLENBQUEifQ==