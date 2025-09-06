"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorUpdateRequestData = exports.VendorCreateRequest = exports.VendorGetRequestsParams = void 0;
const zod_1 = require("zod");
const validators_1 = require("@medusajs/medusa/api/utils/validators");
exports.VendorGetRequestsParams = (0, validators_1.createFindParams)({
    offset: 0,
    limit: 50
}).extend({
    type: zod_1.z
        .enum([
        'product_collection',
        'product_category',
        'product',
        'review_remove',
        'product_type',
        'product_tag'
    ])
        .optional(),
    status: zod_1.z.enum(['accepted', 'rejected', 'pending']).optional()
});
/**
 * @schema ProductCategoryRequest
 * type: object
 * required:
 *   - type
 *   - data
 * properties:
 *   type:
 *     type: string
 *     description: The type of the request
 *     enum: [product_category]
 *   data:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         description: The name of the product category
 *       handle:
 *         type: string
 *         description: The description of the product category
 *       description:
 *         type: string
 *         description: The description of the product category
 *       parent_category_id:
 *         type: string
 *         description: The id of the parent category
 */
const ProductCategoryRequest = zod_1.z.object({
    type: zod_1.z.literal('product_category'),
    data: zod_1.z.object({
        name: zod_1.z.string(),
        handle: zod_1.z.string(),
        description: zod_1.z.string().optional(),
        parent_category_id: zod_1.z.string().nullable().default(null)
    })
});
/**
 * @schema ProductCollectionRequest
 * type: object
 * required:
 *   - type
 *   - data
 * properties:
 *   type:
 *     type: string
 *     description: The type of the request
 *     enum: [product_collection]
 *   data:
 *     type: object
 *     properties:
 *       title:
 *         type: string
 *         description: The title of the product collection
 *       handle:
 *         type: string
 *         description: The description of the product category
 */
const ProductCollectionRequest = zod_1.z.object({
    type: zod_1.z.literal('product_collection'),
    data: zod_1.z.object({
        title: zod_1.z.string(),
        handle: zod_1.z.string()
    })
});
/**
 * @schema ReviewRemoveRequest
 * type: object
 * required:
 *   - type
 *   - data
 * properties:
 *   type:
 *     type: string
 *     description: The type of the request
 *     enum: [review_remove]
 *   data:
 *     type: object
 *     properties:
 *       review_id:
 *         type: string
 *         description: Id of the review to remove
 *       reason:
 *         type: string
 *         description: The reason to remove review
 */
const ReviewRemoveRequest = zod_1.z.object({
    type: zod_1.z.literal('review_remove'),
    data: zod_1.z.object({
        review_id: zod_1.z.string(),
        reason: zod_1.z.string()
    })
});
/**
 * @schema ProductTypeRequest
 * type: object
 * required:
 *   - type
 *   - data
 * properties:
 *   type:
 *     type: string
 *     description: The type of the request
 *     enum: [product_type]
 *   data:
 *     type: object
 *     properties:
 *       value:
 *         type: string
 *         description: The product type value
 *       metadata:
 *         type: object
 *         description: The product type metadata
 */
const ProductTypeRequest = zod_1.z.object({
    type: zod_1.z.literal('product_type'),
    data: zod_1.z.object({
        value: zod_1.z.string(),
        metadata: zod_1.z.record(zod_1.z.unknown()).nullish()
    })
});
/**
 * @schema ProductTagRequest
 * type: object
 * required:
 *   - type
 *   - data
 * properties:
 *   type:
 *     type: string
 *     description: The type of the request
 *     enum: [product_tag]
 *   data:
 *     type: object
 *     properties:
 *       value:
 *         type: string
 *         description: The product tag value
 *       metadata:
 *         type: object
 *         description: The product tag metadata
 */
const ProductTagRequest = zod_1.z.object({
    type: zod_1.z.literal('product_tag'),
    data: zod_1.z.object({
        value: zod_1.z.string(),
        metadata: zod_1.z.record(zod_1.z.unknown()).nullish()
    })
});
exports.VendorCreateRequest = zod_1.z.object({
    request: zod_1.z.discriminatedUnion('type', [
        ProductCategoryRequest,
        ProductCollectionRequest,
        ReviewRemoveRequest,
        ProductTypeRequest,
        ProductTagRequest
    ])
});
const UpdateProductCollectionRequest = zod_1.z.object({
    type: zod_1.z.literal('product_collection'),
    data: zod_1.z.object({
        title: zod_1.z.string().optional(),
        handle: zod_1.z.string().optional()
    })
});
const UpdateReviewRemoveRequest = zod_1.z.object({
    type: zod_1.z.literal('review_remove'),
    data: zod_1.z.object({
        review_id: zod_1.z.string().optional(),
        reason: zod_1.z.string().optional()
    })
});
const UpdateProductCategoryRequest = zod_1.z.object({
    type: zod_1.z.literal('product_category'),
    data: zod_1.z.object({
        name: zod_1.z.string().optional(),
        handle: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        parent_category_id: zod_1.z.string().nullable().optional()
    })
});
exports.VendorUpdateRequestData = zod_1.z.object({
    request: zod_1.z.discriminatedUnion('type', [
        UpdateProductCategoryRequest,
        UpdateProductCollectionRequest,
        UpdateReviewRemoveRequest,
        ProductTypeRequest,
        ProductTagRequest
    ])
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcGkvdmVuZG9yL3JlcXVlc3RzL3ZhbGlkYXRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkJBQXVCO0FBRXZCLHNFQUF3RTtBQUszRCxRQUFBLHVCQUF1QixHQUFHLElBQUEsNkJBQWdCLEVBQUM7SUFDdEQsTUFBTSxFQUFFLENBQUM7SUFDVCxLQUFLLEVBQUUsRUFBRTtDQUNWLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDUixJQUFJLEVBQUUsT0FBQztTQUNKLElBQUksQ0FBQztRQUNKLG9CQUFvQjtRQUNwQixrQkFBa0I7UUFDbEIsU0FBUztRQUNULGVBQWU7UUFDZixjQUFjO1FBQ2QsYUFBYTtLQUNkLENBQUM7U0FDRCxRQUFRLEVBQUU7SUFDYixNQUFNLEVBQUUsT0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUU7Q0FDL0QsQ0FBQyxDQUFBO0FBRUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsTUFBTSxzQkFBc0IsR0FBRyxPQUFDLENBQUMsTUFBTSxDQUFDO0lBQ3RDLElBQUksRUFBRSxPQUFDLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDO0lBQ25DLElBQUksRUFBRSxPQUFDLENBQUMsTUFBTSxDQUFDO1FBQ2IsSUFBSSxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUU7UUFDaEIsTUFBTSxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUU7UUFDbEIsV0FBVyxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7UUFDbEMsa0JBQWtCLEVBQUUsT0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7S0FDeEQsQ0FBQztDQUNILENBQUMsQ0FBQTtB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