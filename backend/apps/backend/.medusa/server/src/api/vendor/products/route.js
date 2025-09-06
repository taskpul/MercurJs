"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = exports.GET = void 0;
const utils_1 = require("@medusajs/framework/utils");
const utils_2 = require("../../../shared/infra/http/utils");
const workflows_1 = require("../../../workflows/brand/workflows");
const workflows_2 = require("../../../workflows/requests/workflows");
/**
 * @oas [get] /vendor/products
 * operationId: "VendorListProducts"
 * summary: "List Products"
 * description: "Retrieves a list of products for the authenticated vendor."
 * x-authenticated: true
 * parameters:
 *   - name: offset
 *     in: query
 *     schema:
 *       type: number
 *     required: false
 *     description: The number of items to skip before starting to collect the result set.
 *   - name: limit
 *     in: query
 *     schema:
 *       type: number
 *     required: false
 *     description: The number of items to return.
 *   - name: fields
 *     in: query
 *     schema:
 *       type: string
 *     required: false
 *     description: Comma-separated fields to include in the response.
 *   - name: order
 *     in: query
 *     schema:
 *       type: string
 *     required: false
 *     description: The order of the returned items.
 * responses:
 *   "200":
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             products:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/VendorProduct"
 *             count:
 *               type: integer
 *               description: The total number of items available
 *             offset:
 *               type: integer
 *               description: The number of items skipped before these items
 *             limit:
 *               type: integer
 *               description: The number of items per page
 * tags:
 *   - Vendor Products
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 */
const GET = async (req, res) => {
    const query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: sellerProducts, metadata } = await query.graph({
        entity: 'product',
        fields: req.queryConfig.fields,
        filters: req.filterableFields,
        pagination: req.queryConfig.pagination
    });
    res.json({
        products: sellerProducts,
        count: metadata.count,
        offset: metadata.skip,
        limit: metadata.take
    });
};
exports.GET = GET;
/**
 * @oas [post] /vendor/products
 * operationId: "VendorCreateProduct"
 * summary: "Create a Product"
 * description: "Creates a new product for the authenticated vendor."
 * x-authenticated: true
 * requestBody:
 *   content:
 *     application/json:
 *       schema:
 *         $ref: "#/components/schemas/VendorCreateProduct"
 * responses:
 *   "201":
 *     description: Created
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
    const seller = await (0, utils_2.fetchSellerByAuthActorId)(req.auth_context?.actor_id, req.scope);
    const { brand_name, additional_data, ...validatedBody } = req.validatedBody;
    const { result } = await workflows_2.createProductRequestWorkflow.run({
        container: req.scope,
        input: {
            seller_id: seller.id,
            data: {
                data: validatedBody,
                type: 'product',
                submitter_id: req.auth_context.actor_id
            },
            additional_data
        }
    });
    const { product_id } = result[0].data;
    if (brand_name) {
        await workflows_1.assignBrandToProductWorkflow.run({
            container: req.scope,
            input: {
                brand_name,
                product_id
            }
        });
    }
    const { data: [product] } = await query.graph({
        entity: 'product',
        fields: req.queryConfig.fields,
        filters: { id: product_id }
    }, { throwIfKeyNotFound: true });
    res.status(201).json({ product });
};
exports.POST = POST;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3ZlbmRvci9wcm9kdWN0cy9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFLQSxxREFBcUU7QUFFckUsNERBQTJFO0FBQzNFLGtFQUFpRjtBQUNqRixxRUFBb0Y7QUFNcEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlERztBQUNJLE1BQU0sR0FBRyxHQUFHLEtBQUssRUFDdEIsR0FBOEMsRUFDOUMsR0FBbUIsRUFDbkIsRUFBRTtJQUNGLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRWhFLE1BQU0sRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztRQUMzRCxNQUFNLEVBQUUsU0FBUztRQUNqQixNQUFNLEVBQUUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxNQUFNO1FBQzlCLE9BQU8sRUFBRSxHQUFHLENBQUMsZ0JBQWdCO1FBQzdCLFVBQVUsRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLFVBQVU7S0FDdkMsQ0FBQyxDQUFBO0lBRUYsR0FBRyxDQUFDLElBQUksQ0FBQztRQUNQLFFBQVEsRUFBRSxjQUFjO1FBQ3hCLEtBQUssRUFBRSxRQUFTLENBQUMsS0FBSztRQUN0QixNQUFNLEVBQUUsUUFBUyxDQUFDLElBQUk7UUFDdEIsS0FBSyxFQUFFLFFBQVMsQ0FBQyxJQUFJO0tBQ3RCLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQW5CWSxRQUFBLEdBQUcsT0FtQmY7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSSxNQUFNLElBQUksR0FBRyxLQUFLLEVBQ3ZCLEdBQXdELEVBQ3hELEdBQW1CLEVBQ25CLEVBQUU7SUFDRixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxpQ0FBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUVoRSxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUEsZ0NBQXdCLEVBQzNDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsUUFBUSxFQUMxQixHQUFHLENBQUMsS0FBSyxDQUNWLENBQUE7SUFFRCxNQUFNLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxHQUFHLGFBQWEsRUFBRSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUE7SUFFM0UsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLE1BQU0sd0NBQTRCLENBQUMsR0FBRyxDQUFDO1FBQ3hELFNBQVMsRUFBRSxHQUFHLENBQUMsS0FBSztRQUNwQixLQUFLLEVBQUU7WUFDTCxTQUFTLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDcEIsSUFBSSxFQUFFO2dCQUNKLElBQUksRUFBRSxhQUFhO2dCQUNuQixJQUFJLEVBQUUsU0FBUztnQkFDZixZQUFZLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxRQUFRO2FBQ3hDO1lBQ0QsZUFBZTtTQUNoQjtLQUNGLENBQUMsQ0FBQTtJQUVGLE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBO0lBRXJDLElBQUksVUFBVSxFQUFFLENBQUM7UUFDZixNQUFNLHdDQUE0QixDQUFDLEdBQUcsQ0FBQztZQUNyQyxTQUFTLEVBQUUsR0FBRyxDQUFDLEtBQUs7WUFDcEIsS0FBSyxFQUFFO2dCQUNMLFVBQVU7Z0JBQ1YsVUFBVTthQUNYO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELE1BQU0sRUFDSixJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFDaEIsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQ25CO1FBQ0UsTUFBTSxFQUFFLFNBQVM7UUFDakIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsTUFBTTtRQUM5QixPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFO0tBQzVCLEVBQ0QsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsQ0FDN0IsQ0FBQTtJQUVELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQTtBQUNuQyxDQUFDLENBQUE7QUFsRFksUUFBQSxJQUFJLFFBa0RoQiJ9