"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
const utils_1 = require("@medusajs/framework/utils");
const utils_2 = require("../../../../../shared/infra/http/utils");
const products_1 = require("../../../../../shared/infra/http/utils/products");
const workflows_1 = require("../../../../../workflows/brand/workflows");
const create_product_update_request_1 = require("../../../../../workflows/requests/workflows/create-product-update-request");
/**
 * @oas [post] /vendor/products/{id}/brand
 * operationId: "VendorAssignBrandToProduct"
 * summary: "Assign brand to the Product"
 * description: "Upserts brand and links to the product"
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
 *         $ref: "#/components/schemas/VendorAssignBrandName"
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
    const { id } = req.params;
    await workflows_1.assignBrandToProductWorkflow.run({
        container: req.scope,
        input: {
            brand_name: req.validatedBody.brand_name,
            product_id: id
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
        filters: {
            id
        }
    });
    res.json({ product });
};
exports.POST = POST;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3ZlbmRvci9wcm9kdWN0cy9baWRdL2JyYW5kL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHFEQUFxRTtBQUVyRSxrRUFBaUY7QUFDakYsOEVBQXFGO0FBQ3JGLHdFQUF1RjtBQUN2Riw2SEFBOEg7QUFHOUg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVDRztBQUNJLE1BQU0sSUFBSSxHQUFHLEtBQUssRUFDdkIsR0FBMEQsRUFDMUQsR0FBbUIsRUFDbkIsRUFBRTtJQUNGLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2hFLE1BQU0sRUFBRSxFQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFBO0lBRXpCLE1BQU0sd0NBQTRCLENBQUMsR0FBRyxDQUFDO1FBQ3JDLFNBQVMsRUFBRSxHQUFHLENBQUMsS0FBSztRQUNwQixLQUFLLEVBQUU7WUFDTCxVQUFVLEVBQUUsR0FBRyxDQUFDLGFBQWEsQ0FBQyxVQUFVO1lBQ3hDLFVBQVUsRUFBRSxFQUFFO1NBQ2Y7S0FDRixDQUFDLENBQUE7SUFFRixNQUFNLGNBQWMsR0FBRyxNQUFNLElBQUEsOEJBQW1CLEVBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQzFFLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDM0QsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFBLGdDQUF3QixFQUMzQyxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFDekIsR0FBRyxDQUFDLEtBQUssQ0FDVixDQUFBO1FBQ0QsTUFBTSxrRUFBa0MsQ0FBQyxHQUFHLENBQUM7WUFDM0MsU0FBUyxFQUFFLEdBQUcsQ0FBQyxLQUFLO1lBQ3BCLEtBQUssRUFBRTtnQkFDTCxJQUFJLEVBQUU7b0JBQ0osSUFBSSxFQUFFLEVBQUUsVUFBVSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxjQUFjLENBQUMsS0FBSyxFQUFFO29CQUNoRSxZQUFZLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxRQUFRO29CQUN2QyxJQUFJLEVBQUUsZ0JBQWdCO2lCQUN2QjtnQkFDRCxTQUFTLEVBQUUsTUFBTSxDQUFDLEVBQUU7YUFDckI7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsTUFBTSxFQUNKLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUNoQixHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztRQUNwQixNQUFNLEVBQUUsU0FBUztRQUNqQixNQUFNLEVBQUUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxNQUFNO1FBQzlCLE9BQU8sRUFBRTtZQUNQLEVBQUU7U0FDSDtLQUNGLENBQUMsQ0FBQTtJQUVGLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO0FBQ3ZCLENBQUMsQ0FBQTtBQTdDWSxRQUFBLElBQUksUUE2Q2hCIn0=