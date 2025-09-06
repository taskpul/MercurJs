"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
const utils_1 = require("@medusajs/framework/utils");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const utils_2 = require("../../../../../shared/infra/http/utils");
const products_1 = require("../../../../../shared/infra/http/utils/products");
const create_product_update_request_1 = require("../../../../../workflows/requests/workflows/create-product-update-request");
/**
 * @oas [post] /vendor/products/{id}/variants
 * operationId: "VendorCreateVariantForProductById"
 * summary: "Create variant for product"
 * description: "Creates variant for product."
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
 *         $ref: "#/components/schemas/CreateProductVariant"
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
    const seller = await (0, utils_2.fetchSellerByAuthActorId)(req.auth_context.actor_id, req.scope);
    await core_flows_1.createProductVariantsWorkflow.run({
        container: req.scope,
        input: {
            product_variants: [
                {
                    ...req.validatedBody,
                    product_id: req.params.id
                }
            ],
            additional_data: {
                seller_id: seller.id
            }
        }
    });
    const productDetails = await (0, products_1.fetchProductDetails)(req.params.id, req.scope);
    if (!['draft', 'proposed'].includes(productDetails.status)) {
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
        filters: { id: req.params.id }
    }, { throwIfKeyNotFound: true });
    res.json({ product });
};
exports.POST = POST;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3ZlbmRvci9wcm9kdWN0cy9baWRdL3ZhcmlhbnRzL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHFEQUFxRTtBQUNyRSw0REFBMkU7QUFFM0Usa0VBQWlGO0FBQ2pGLDhFQUFxRjtBQUNyRiw2SEFBOEg7QUFHOUg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVDRztBQUNJLE1BQU0sSUFBSSxHQUFHLEtBQUssRUFDdkIsR0FBeUQsRUFDekQsR0FBbUIsRUFDbkIsRUFBRTtJQUNGLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRWhFLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBQSxnQ0FBd0IsRUFDM0MsR0FBRyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQ3pCLEdBQUcsQ0FBQyxLQUFLLENBQ1YsQ0FBQTtJQUVELE1BQU0sMENBQTZCLENBQUMsR0FBRyxDQUFDO1FBQ3RDLFNBQVMsRUFBRSxHQUFHLENBQUMsS0FBSztRQUNwQixLQUFLLEVBQUU7WUFDTCxnQkFBZ0IsRUFBRTtnQkFDaEI7b0JBQ0UsR0FBRyxHQUFHLENBQUMsYUFBYTtvQkFDcEIsVUFBVSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtpQkFDMUI7YUFDRjtZQUNELGVBQWUsRUFBRTtnQkFDZixTQUFTLEVBQUUsTUFBTSxDQUFDLEVBQUU7YUFDckI7U0FDRjtLQUNGLENBQUMsQ0FBQTtJQUVGLE1BQU0sY0FBYyxHQUFHLE1BQU0sSUFBQSw4QkFBbUIsRUFBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDMUUsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUMzRCxNQUFNLGtFQUFrQyxDQUFDLEdBQUcsQ0FBQztZQUMzQyxTQUFTLEVBQUUsR0FBRyxDQUFDLEtBQUs7WUFDcEIsS0FBSyxFQUFFO2dCQUNMLElBQUksRUFBRTtvQkFDSixJQUFJLEVBQUUsRUFBRSxVQUFVLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLGNBQWMsQ0FBQyxLQUFLLEVBQUU7b0JBQ2hFLFlBQVksRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVE7b0JBQ3ZDLElBQUksRUFBRSxnQkFBZ0I7aUJBQ3ZCO2dCQUNELFNBQVMsRUFBRSxNQUFNLENBQUMsRUFBRTthQUNyQjtTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxNQUFNLEVBQ0osSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQ2hCLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUNuQjtRQUNFLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLE1BQU0sRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLE1BQU07UUFDOUIsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFO0tBQy9CLEVBQ0QsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsQ0FDN0IsQ0FBQTtJQUVELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO0FBQ3ZCLENBQUMsQ0FBQTtBQXJEWSxRQUFBLElBQUksUUFxRGhCIn0=