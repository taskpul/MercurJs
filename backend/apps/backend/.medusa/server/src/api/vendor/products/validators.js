"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorUpdateProductStatus = exports.VendorUpdateProduct = exports.UpdateProduct = exports.VendorCreateProduct = exports.CreateProduct = exports.UpdateProductVariant = exports.CreateProductVariant = exports.UpdateProductOption = exports.VendorAssignBrandName = exports.CreateProductOption = exports.VendorGetProductParams = void 0;
const zod_1 = require("zod");
const validators_1 = require("@medusajs/medusa/api/utils/validators");
const utils_1 = require("../../../shared/infra/http/utils");
const validators_2 = require("@medusajs/medusa/api/admin/products/validators");
exports.VendorGetProductParams = validators_2.AdminGetProductsParams;
exports.CreateProductOption = zod_1.z.object({
    title: zod_1.z.string(),
    values: zod_1.z.array(zod_1.z.string())
});
exports.VendorAssignBrandName = zod_1.z.object({
    brand_name: zod_1.z.string()
});
exports.UpdateProductOption = zod_1.z.object({
    id: zod_1.z.string().optional(),
    title: zod_1.z.string().optional(),
    values: zod_1.z.array(zod_1.z.string()).optional()
});
/* Variant Prices */
/**
 * @schema CreateVariantPrice
 * type: object
 * required:
 *   - currency_code
 *   - amount
 * properties:
 *   currency_code:
 *     type: string
 *     description: The currency code of the price.
 *   amount:
 *     type: number
 *     description: The amount of the price.
 *   min_quantity:
 *     type: number
 *     nullable: true
 *     description: The minimum quantity required to get this price.
 *   max_quantity:
 *     type: number
 *     nullable: true
 *     description: The maximum quantity allowed to get this price.
 *   rules:
 *     type: object
 *     description: Additional rules that apply to the price.
 *     additionalProperties:
 *       type: string
 */
const CreateVariantPrice = zod_1.z.object({
    currency_code: zod_1.z.string(),
    amount: zod_1.z.number(),
    min_quantity: zod_1.z.number().nullish(),
    max_quantity: zod_1.z.number().nullish(),
    rules: zod_1.z.record(zod_1.z.string(), zod_1.z.string()).optional()
});
/**
 * @schema UpdateVariantPrice
 * type: object
 * properties:
 *   id:
 *     type: string
 *     description: The ID of the price to update.
 *   currency_code:
 *     type: string
 *     description: The currency code of the price.
 *   amount:
 *     type: number
 *     description: The amount of the price.
 *   min_quantity:
 *     type: number
 *     nullable: true
 *     description: The minimum quantity required to get this price.
 *   max_quantity:
 *     type: number
 *     nullable: true
 *     description: The maximum quantity allowed to get this price.
 *   rules:
 *     type: object
 *     description: Additional rules that apply to the price.
 *     additionalProperties:
 *       type: string
 */
const UpdateVariantPrice = zod_1.z.object({
    id: zod_1.z.string().optional(),
    currency_code: zod_1.z.string().optional(),
    amount: zod_1.z.number().optional(),
    min_quantity: zod_1.z.number().nullish(),
    max_quantity: zod_1.z.number().nullish(),
    rules: zod_1.z.record(zod_1.z.string(), zod_1.z.string()).optional()
});
exports.CreateProductVariant = zod_1.z
    .object({
    title: zod_1.z.string(),
    sku: zod_1.z.string().optional(),
    ean: zod_1.z.string().optional(),
    upc: zod_1.z.string().optional(),
    barcode: zod_1.z.string().optional(),
    hs_code: zod_1.z.string().optional(),
    mid_code: zod_1.z.string().optional(),
    allow_backorder: zod_1.z.literal(false).optional().default(false),
    manage_inventory: zod_1.z.literal(true).optional().default(true),
    variant_rank: zod_1.z.number().optional(),
    weight: zod_1.z.number().optional(),
    length: zod_1.z.number().optional(),
    height: zod_1.z.number().optional(),
    width: zod_1.z.number().optional(),
    origin_country: zod_1.z.string().optional(),
    material: zod_1.z.string().optional(),
    metadata: zod_1.z.record(zod_1.z.unknown()).optional(),
    prices: zod_1.z.array(CreateVariantPrice),
    options: zod_1.z.record(zod_1.z.string()).optional(),
    inventory_items: zod_1.z
        .array(zod_1.z.object({
        inventory_item_id: zod_1.z.string(),
        required_quantity: zod_1.z.number()
    }))
        .optional()
})
    .strict();
exports.UpdateProductVariant = zod_1.z
    .object({
    id: zod_1.z.string().optional(),
    title: zod_1.z.string().optional(),
    prices: zod_1.z.array(UpdateVariantPrice).optional(),
    sku: zod_1.z.string().nullish(),
    ean: zod_1.z.string().nullish(),
    upc: zod_1.z.string().nullish(),
    barcode: zod_1.z.string().nullish(),
    hs_code: zod_1.z.string().nullish(),
    mid_code: zod_1.z.string().nullish(),
    allow_backorder: zod_1.z.boolean().optional(),
    manage_inventory: zod_1.z.boolean().optional(),
    variant_rank: zod_1.z.number().optional(),
    weight: zod_1.z.number().nullish(),
    length: zod_1.z.number().nullish(),
    height: zod_1.z.number().nullish(),
    width: zod_1.z.number().nullish(),
    origin_country: zod_1.z.string().nullish(),
    material: zod_1.z.string().nullish(),
    metadata: zod_1.z.record(zod_1.z.unknown()).nullish(),
    options: zod_1.z.record(zod_1.z.string()).optional()
})
    .strict();
exports.CreateProduct = zod_1.z
    .object({
    title: zod_1.z.string(),
    subtitle: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    is_giftcard: zod_1.z.boolean().optional().default(false),
    discountable: zod_1.z.boolean().optional().default(true),
    images: zod_1.z.array(zod_1.z.object({ url: zod_1.z.string() })).optional(),
    thumbnail: zod_1.z.string().optional(),
    handle: zod_1.z.string().optional(),
    status: zod_1.z.enum(['draft', 'proposed']).optional().default('draft'),
    external_id: zod_1.z.string().optional(),
    type_id: zod_1.z.string().optional(),
    collection_id: zod_1.z.string().optional(),
    categories: zod_1.z.array(utils_1.IdAssociation).max(1).optional(),
    tags: zod_1.z.array(utils_1.IdAssociation).optional(),
    options: zod_1.z.array(exports.CreateProductOption).optional(),
    variants: zod_1.z.array(exports.CreateProductVariant).optional(),
    weight: zod_1.z.number().optional(),
    length: zod_1.z.number().optional(),
    height: zod_1.z.number().optional(),
    width: zod_1.z.number().optional(),
    hs_code: zod_1.z.string().optional(),
    mid_code: zod_1.z.string().optional(),
    origin_country: zod_1.z.string().optional(),
    material: zod_1.z.string().optional(),
    metadata: zod_1.z.record(zod_1.z.unknown()).optional(),
    sales_channels: zod_1.z.array(zod_1.z.object({ id: zod_1.z.string() })).optional(),
    brand_name: zod_1.z.string().optional()
})
    .strict();
/**
 * @schema VendorCreateProduct
 * type: object
 * allOf:
 *   - $ref: "#/components/schemas/CreateProduct"
 *   - type: object
 *     properties:
 *      additional_data:
 *        type: object
 *        description: Additional data to use in products hooks.
 *        additionalProperties: true
 *
 */
exports.VendorCreateProduct = (0, validators_1.WithAdditionalData)(exports.CreateProduct);
exports.UpdateProduct = zod_1.z
    .object({
    title: zod_1.z.string().optional(),
    discountable: zod_1.z.boolean().optional(),
    is_giftcard: zod_1.z.boolean().optional(),
    options: zod_1.z.array(exports.UpdateProductOption).optional(),
    variants: zod_1.z.array(exports.UpdateProductVariant).optional(),
    subtitle: zod_1.z.string().nullish(),
    description: zod_1.z.string().nullish(),
    images: zod_1.z.array(zod_1.z.object({ url: zod_1.z.string() })).optional(),
    thumbnail: zod_1.z.string().nullish(),
    handle: zod_1.z.string().nullish(),
    type_id: zod_1.z.string().nullish(),
    external_id: zod_1.z.string().nullish(),
    collection_id: zod_1.z.string().nullish(),
    categories: zod_1.z.array(utils_1.IdAssociation).max(1).optional(),
    tags: zod_1.z.array(utils_1.IdAssociation).optional(),
    weight: zod_1.z.number().nullish(),
    length: zod_1.z.number().nullish(),
    height: zod_1.z.number().nullish(),
    width: zod_1.z.number().nullish(),
    hs_code: zod_1.z.string().nullish(),
    mid_code: zod_1.z.string().nullish(),
    origin_country: zod_1.z.string().nullish(),
    material: zod_1.z.string().nullish(),
    metadata: zod_1.z.record(zod_1.z.unknown()).nullish(),
    sales_channels: zod_1.z.array(zod_1.z.object({ id: zod_1.z.string() })).optional()
})
    .strict();
/**
 * @schema VendorUpdateProduct
 * type: object
 * allOf:
 *   - $ref: "#/components/schemas/UpdateProduct"
 *   - type: object
 *     properties:
 *      additional_data:
 *        type: object
 *        description: Additional data to use in products hooks.
 *        additionalProperties: true
 *
 */
exports.VendorUpdateProduct = (0, validators_1.WithAdditionalData)(exports.UpdateProduct);
exports.VendorUpdateProductStatus = zod_1.z.object({
    status: zod_1.z.enum(['draft', 'proposed', 'published'])
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcGkvdmVuZG9yL3Byb2R1Y3RzL3ZhbGlkYXRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkJBQXVCO0FBR3ZCLHNFQUU4QztBQUU5Qyw0REFBZ0U7QUFDaEUsK0VBQXVGO0FBRzFFLFFBQUEsc0JBQXNCLEdBQUcsbUNBQXNCLENBQUE7QUFxQi9DLFFBQUEsbUJBQW1CLEdBQUcsT0FBQyxDQUFDLE1BQU0sQ0FBQztJQUMxQyxLQUFLLEVBQUUsT0FBQyxDQUFDLE1BQU0sRUFBRTtJQUNqQixNQUFNLEVBQUUsT0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7Q0FDNUIsQ0FBQyxDQUFBO0FBYVcsUUFBQSxxQkFBcUIsR0FBRyxPQUFDLENBQUMsTUFBTSxDQUFDO0lBQzVDLFVBQVUsRUFBRSxPQUFDLENBQUMsTUFBTSxFQUFFO0NBQ3ZCLENBQUMsQ0FBQTtBQW1CVyxRQUFBLG1CQUFtQixHQUFHLE9BQUMsQ0FBQyxNQUFNLENBQUM7SUFDMUMsRUFBRSxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDekIsS0FBSyxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDNUIsTUFBTSxFQUFFLE9BQUMsQ0FBQyxLQUFLLENBQUMsT0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFO0NBQ3ZDLENBQUMsQ0FBQTtBQUVGLG9CQUFvQjtBQUVwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxNQUFNLGtCQUFrQixHQUFHLE9BQUMsQ0FBQyxNQUFNLENBQUM7SUFDbEMsYUFBYSxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUU7SUFDekIsTUFBTSxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUU7SUFDbEIsWUFBWSxFQUFF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TUFBTSxFQUFFLE9BQUMsQ0FBQyxLQUFLLENBQUMsT0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO0lBQ3pELFNBQVMsRUFBRSxPQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFO0lBQy9CLE1BQU0sRUFBRSxPQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFO0lBQzVCLE9BQU8sRUFBRSxPQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFO0lBQzdCLFdBQVcsRUFBRSxPQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFO0lBQ2pDLGFBQWEsRUFBRSxPQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFO0lBQ25DLFVBQVUsRUFBRSxPQUFDLENBQUMsS0FBSyxDQUFDLHFCQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO0lBQ3BELElBQUksRUFBRSxPQUFDLENBQUMsS0FBSyxDQUFDLHFCQUFhLENBQUMsQ0FBQyxRQUFRLEVBQUU7SUFDdkMsTUFBTSxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUU7SUFDNUIsTUFBTSxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUU7SUFDNUIsTUFBTSxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUU7SUFDNUIsS0FBSyxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUU7SUFDM0IsT0FBTyxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUU7SUFDN0IsUUFBUSxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUU7SUFDOUIsY0FBYyxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUU7SUFDcEMsUUFBUSxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUU7SUFDOUIsUUFBUSxFQUFFLE9BQUMsQ0FBQyxNQUFNLENBQUMsT0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFO0lBQ3pDLGNBQWMsRUFBRSxPQUFDLENBQUMsS0FBSyxDQUFDLE9BQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsT0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtDQUNqRSxDQUFDO0tBQ0QsTUFBTSxFQUFFLENBQUE7QUFFWDs7Ozs7Ozs7Ozs7O0dBWUc7QUFDVSxRQUFBLG1CQUFtQixHQUFHLElBQUEsK0JBQWtCLEVBQUMscUJBQWEsQ0FBQyxDQUFBO0FBZ0J2RCxRQUFBLHlCQUF5QixHQUFHLE9BQUMsQ0FBQyxNQUFNLENBQUM7SUFDaEQsTUFBTSxFQUFFLE9BQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0NBQ25ELENBQUMsQ0FBQSJ9