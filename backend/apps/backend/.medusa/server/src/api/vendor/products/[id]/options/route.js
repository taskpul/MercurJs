"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
const utils_1 = require("@medusajs/framework/utils");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const utils_2 = require("../../../../../shared/infra/http/utils");
const products_1 = require("../../../../../shared/infra/http/utils/products");
const create_product_update_request_1 = require("../../../../../workflows/requests/workflows/create-product-update-request");
/**
 * @oas [post] /vendor/products/{id}/options
 * operationId: "VendorCreateOptionForProductById"
 * summary: "Create option for product"
 * description: "Creates option for product."
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
 *         $ref: "#/components/schemas/CreateProductOption"
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
    await (0, core_flows_1.createProductOptionsWorkflow)(req.scope).run({
        input: {
            product_options: [
                {
                    ...req.validatedBody,
                    product_id: productId
                }
            ]
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
        filters: { id: req.params.id }
    }, { throwIfKeyNotFound: true });
    res.json({ product });
};
exports.POST = POST;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3ZlbmRvci9wcm9kdWN0cy9baWRdL29wdGlvbnMvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EscURBQXFFO0FBQ3JFLDREQUEwRTtBQUUxRSxrRUFBaUY7QUFDakYsOEVBQXFGO0FBQ3JGLDZIQUE4SDtBQUc5SDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUNHO0FBQ0ksTUFBTSxJQUFJLEdBQUcsS0FBSyxFQUN2QixHQUF3RCxFQUN4RCxHQUFtQixFQUNuQixFQUFFO0lBQ0YsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDaEUsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUE7SUFFL0IsTUFBTSxJQUFBLHlDQUE0QixFQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDaEQsS0FBSyxFQUFFO1lBQ0wsZUFBZSxFQUFFO2dCQUNmO29CQUNFLEdBQUcsR0FBRyxDQUFDLGFBQWE7b0JBQ3BCLFVBQVUsRUFBRSxTQUFTO2lCQUN0QjthQUNGO1NBQ0Y7S0FDRixDQUFDLENBQUE7SUFFRixNQUFNLGNBQWMsR0FBRyxNQUFNLElBQUEsOEJBQW1CLEVBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQzFFLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDM0QsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFBLGdDQUF3QixFQUMzQyxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFDekIsR0FBRyxDQUFDLEtBQUssQ0FDVixDQUFBO1FBQ0QsTUFBTSxrRUFBa0MsQ0FBQyxHQUFHLENBQUM7WUFDM0MsU0FBUyxFQUFFLEdBQUcsQ0FBQyxLQUFLO1lBQ3BCLEtBQUssRUFBRTtnQkFDTCxJQUFJLEVBQUU7b0JBQ0osSUFBSSxFQUFFLEVBQUUsVUFBVSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxjQUFjLENBQUMsS0FBSyxFQUFFO29CQUNoRSxZQUFZLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxRQUFRO29CQUN2QyxJQUFJLEVBQUUsZ0JBQWdCO2lCQUN2QjtnQkFDRCxTQUFTLEVBQUUsTUFBTSxDQUFDLEVBQUU7YUFDckI7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsTUFBTSxFQUNKLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUNoQixHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FDbkI7UUFDRSxNQUFNLEVBQUUsU0FBUztRQUNqQixNQUFNLEVBQUUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxNQUFNO1FBQzlCLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTtLQUMvQixFQUNELEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLENBQzdCLENBQUE7SUFFRCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQTtBQUN2QixDQUFDLENBQUE7QUFqRFksUUFBQSxJQUFJLFFBaURoQiJ9