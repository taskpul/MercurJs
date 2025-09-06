"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE = exports.POST = exports.GET = void 0;
const utils_1 = require("@medusajs/framework/utils");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const reviews_1 = require("@mercurjs/reviews");
const utils_2 = require("../../../../shared/infra/http/utils");
const products_1 = require("../../../../shared/infra/http/utils/products");
const create_product_update_request_1 = require("../../../../workflows/requests/workflows/create-product-update-request");
/**
 * @oas [get] /vendor/products/{id}
 * operationId: "VendorGetProductById"
 * summary: "Get a Product"
 * description: "Retrieves a product by id for the authenticated vendor."
 * x-authenticated: true
 * parameters:
 *   - in: path
 *     name: id
 *     required: true
 *     description: The ID of the Product.
 *     schema:
 *       type: string
 *   - name: fields
 *     in: query
 *     schema:
 *       type: string
 *     required: false
 *     description: Comma-separated fields to include in the response.
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
const GET = async (req, res) => {
    const query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: [product] } = await query.graph({
        entity: 'product',
        fields: req.queryConfig.fields,
        filters: { id: req.params.id }
    }, { throwIfKeyNotFound: true });
    const rating = await (0, reviews_1.getAvgRating)(req.scope, 'product', req.params.id);
    res.json({ product: { ...product, rating } });
};
exports.GET = GET;
/**
 * @oas [post] /vendor/products/{id}
 * operationId: "VendorUpdateProductById"
 * summary: "Update a Product"
 * description: "Updates an existing product for the authenticated vendor."
 * x-authenticated: true
 * parameters:
 *   - in: path
 *     name: id
 *     required: true
 *     description: The ID of the Product.
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
 *         $ref: "#/components/schemas/VendorUpdateProduct"
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
    const { additional_data, ...update } = req.validatedBody;
    const { result } = await (0, core_flows_1.updateProductsWorkflow)(req.scope).run({
        input: {
            // @ts-expect-error: updateProductsWorkflow does not support null values
            update,
            selector: { id: req.params.id },
            additional_data
        }
    });
    const productDetails = await (0, products_1.fetchProductDetails)(req.params.id, req.scope);
    if (!['draft', 'proposed'].includes(productDetails.status)) {
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
    const { data: [product] } = await query.graph({
        entity: 'product',
        fields: req.queryConfig.fields,
        filters: { id: result[0].id }
    }, { throwIfKeyNotFound: true });
    res.json({ product });
};
exports.POST = POST;
/**
 * @oas [delete] /vendor/products/{id}
 * operationId: "VendorDeleteProductById"
 * summary: "Delete a Product"
 * description: "Deletes a product by id for the authenticated vendor."
 * x-authenticated: true
 * parameters:
 *   - in: path
 *     name: id
 *     required: true
 *     description: The ID of the Product.
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
 *               description: The ID of the deleted Product
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
    const { id } = req.params;
    await (0, core_flows_1.deleteProductsWorkflow)(req.scope).run({
        input: {
            ids: [id]
        }
    });
    res.json({ id, object: 'product', deleted: true });
};
exports.DELETE = DELETE;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3ZlbmRvci9wcm9kdWN0cy9baWRdL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUtBLHFEQUFxRTtBQUNyRSw0REFHb0M7QUFFcEMsK0NBQWdEO0FBRWhELCtEQUE4RTtBQUM5RSwyRUFBa0Y7QUFDbEYsMEhBQTJIO0FBTTNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0NHO0FBQ0ksTUFBTSxHQUFHLEdBQUcsS0FBSyxFQUN0QixHQUE4QyxFQUM5QyxHQUFtQixFQUNuQixFQUFFO0lBQ0YsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFaEUsTUFBTSxFQUNKLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUNoQixHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FDbkI7UUFDRSxNQUFNLEVBQUUsU0FBUztRQUNqQixNQUFNLEVBQUUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxNQUFNO1FBQzlCLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTtLQUMvQixFQUNELEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLENBQzdCLENBQUE7SUFFRCxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUEsc0JBQVksRUFBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBRXRFLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxHQUFHLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUE7QUFDL0MsQ0FBQyxDQUFBO0FBcEJZLFFBQUEsR0FBRyxPQW9CZjtBQUVEOzs7Ozs7Ozs7Ozs7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