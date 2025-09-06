"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = exports.DELETE = void 0;
const utils_1 = require("@medusajs/framework/utils");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const utils_2 = require("../../../../../../shared/infra/http/utils");
const products_1 = require("../../../../../../shared/infra/http/utils/products");
const create_product_update_request_1 = require("../../../../../../workflows/requests/workflows/create-product-update-request");
/**
 * @oas [delete] /vendor/products/{id}/variants/{variant_id}
 * operationId: "VendorDeleteProductVariantById"
 * summary: "Delete a Product variant"
 * description: "Deletes a product variant by id for the authenticated vendor."
 * x-authenticated: true
 * parameters:
 *   - in: path
 *     name: id
 *     required: true
 *     description: The ID of the Product.
 *     schema:
 *       type: string
 *   - in: path
 *     name: variant_id
 *     required: true
 *     description: The ID of the Variant.
 *     schema:
 *       type: string
 * responses:
 *   "200":
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: The ID of the deleted Product variant
 *             object:
 *               type: string
 *               description: The type of the object that was deleted
 *             deleted:
 *               type: boolean
 *               description: Whether or not the items were deleted
 * tags:
 *   - Vendor Products
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 */
const DELETE = async (req, res) => {
    const productId = req.params.id;
    const variantId = req.params.variant_id;
    const query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: [variant] } = await query.graph({
        entity: 'product_variant',
        fields: ['product_id'],
        filters: {
            id: variantId
        }
    });
    if (productId !== variant.product_id) {
        throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, 'Invalid product variant id!');
    }
    await (0, core_flows_1.deleteProductVariantsWorkflow)(req.scope).run({
        input: { ids: [variantId] }
    });
    res.json({
        id: variantId,
        object: 'variant',
        deleted: true
    });
};
exports.DELETE = DELETE;
/**
 * @oas [post] /vendor/products/{id}/variants/{variant_id}
 * operationId: "VendorUpdateProductVariantById"
 * summary: "Update a Product variant"
 * description: "Updates an existing product variant for the authenticated vendor."
 * x-authenticated: true
 * parameters:
 *   - in: path
 *     name: id
 *     required: true
 *     description: The ID of the Product.
 *     schema:
 *       type: string
 *   - in: path
 *     name: variant_id
 *     required: true
 *     description: The ID of the Variant.
 *     schema:
 *       type: string
 *   - name: fields
 *     in: query
 *     schema:
 *       type: string
 *     required: false
 *     description: Comma-separated fields to include in the response.
 * requestBody:
 *   content:
 *     application/json:
 *       schema:
 *         $ref: "#/components/schemas/UpdateProductVariant"
 * responses:
 *   "200":
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             product:
 *               $ref: "#/components/schemas/VendorProduct"
 * tags:
 *   - Vendor Products
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 */
const POST = async (req, res) => {
    const query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const productId = req.params.id;
    const variantId = req.params.variant_id;
    const productDetails = await (0, products_1.fetchProductDetails)(productId, req.scope);
    await core_flows_1.updateProductVariantsWorkflow.run({
        container: req.scope,
        input: {
            update: req.validatedBody,
            selector: { id: variantId, product_id: productId }
        }
    });
    if (!['draft', 'proposed'].includes(productDetails.status)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { prices, ...rest } = req.validatedBody;
        // Check if there are other changes than prices
        if (rest) {
            const seller = await (0, utils_2.fetchSellerByAuthActorId)(req.auth_context.actor_id, req.scope);
            await create_product_update_request_1.createProductUpdateRequestWorkflow.run({
                container: req.scope,
                input: {
                    data: {
                        data: { product_id: req.params.id, title: productDetails.title },
                        submitter_id: req.auth_context.actor_id,
                        type: 'product_update'
                    },
                    seller_id: seller.id
                }
            });
        }
    }
    const { data: [product] } = await query.graph({
        entity: 'product',
        fields: req.queryConfig.fields,
        filters: { id: productId }
    }, { throwIfKeyNotFound: true });
    res.json({ product });
};
exports.POST = POST;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3ZlbmRvci9wcm9kdWN0cy9baWRdL3ZhcmlhbnRzL1t2YXJpYW50X2lkXS9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxxREFHa0M7QUFDbEMsNERBR29DO0FBRXBDLHFFQUFvRjtBQUNwRixpRkFBd0Y7QUFDeEYsZ0lBQWlJO0FBR2pJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlDRztBQUNJLE1BQU0sTUFBTSxHQUFHLEtBQUssRUFDekIsR0FBK0IsRUFDL0IsR0FBbUIsRUFDbkIsRUFBRTtJQUNGLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFBO0lBQy9CLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFBO0lBRXZDLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRWhFLE1BQU0sRUFDSixJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFDaEIsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDcEIsTUFBTSxFQUFFLGlCQUFpQjtRQUN6QixNQUFNLEVBQUUsQ0FBQyxZQUFZLENBQUM7UUFDdEIsT0FBTyxFQUFFO1lBQ1AsRUFBRSxFQUFFLFNBQVM7U0FDZDtLQUNGLENBQUMsQ0FBQTtJQUVGLElBQUksU0FBUyxLQUFLLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNyQyxNQUFNLElBQUksbUJBQVcsQ0FDbkIsbUJBQVcsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUM5Qiw2QkFBNkIsQ0FDOUIsQ0FBQTtJQUNILENBQUM7SUFFRCxNQUFNLElBQUEsMENBQTZCLEVBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFD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