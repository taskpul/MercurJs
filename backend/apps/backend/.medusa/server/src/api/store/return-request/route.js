"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
exports.POST = POST;
const utils_1 = require("@medusajs/framework/utils");
const seller_order_1 = __importDefault(require("../../../links/seller-order"));
const workflows_1 = require("../../../workflows/order-return-request/workflows");
const query_config_1 = require("./query-config");
/**
 * @oas [get] /store/return-request
 * operationId: "StoreListOrderReturnRequests"
 * summary: "List return requests"
 * description: "Retrieves a list of return requests for the authenticated customer"
 * x-authenticated: true
 * parameters:
 *   - name: fields
 *     in: query
 *     schema:
 *       type: string
 *     required: false
 *     description: Comma-separated fields to include in the response
 *   - name: limit
 *     in: query
 *     schema:
 *       type: integer
 *     required: false
 *     description: The number of requests to return
 *   - name: offset
 *     in: query
 *     schema:
 *       type: integer
 *     required: false
 *     description: The number of requests to skip
 * responses:
 *   "200":
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             order_return_requests:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/OrderReturnRequest"
 *             count:
 *               type: integer
 *               description: The total number of requests
 *             offset:
 *               type: integer
 *               description: The number of requests skipped
 *             limit:
 *               type: integer
 *               description: The number of requests per page
 * tags:
 *   - Store Return Request
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 */
async function GET(req, res) {
    const query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: order_return_requests, metadata } = await query.graph({
        entity: 'order_return_request',
        fields: query_config_1.storeReturnOrderRequestFields,
        filters: {
            ...req.filterableFields,
            customer_id: req.auth_context.actor_id
        },
        pagination: req.queryConfig.pagination
    });
    res.json({
        order_return_requests,
        count: metadata.count,
        offset: metadata.skip,
        limit: metadata.take
    });
}
/**
 * @oas [post] /store/return-request
 * operationId: "StoreCreateOrderReturnRequest"
 * summary: "Create an order return request"
 * description: "Creates a new order return request for the authenticated customer"
 * x-authenticated: true
 * requestBody:
 *   content:
 *     application/json:
 *       schema:
 *         $ref: "#/components/schemas/StoreCreateOrderReturnRequest"
 * responses:
 *   "201":
 *     description: Created
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             order_return_request:
 *               $ref: "#/components/schemas/OrderReturnRequest"
 * tags:
 *   - Store Return Request
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 */
async function POST(req, res) {
    const query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: [resource] } = await query.graph({
        entity: seller_order_1.default.entryPoint,
        fields: ['seller_id'],
        filters: {
            order_id: req.validatedBody.order_id
        }
    });
    const { result: order_return_request } = await workflows_1.createOrderReturnRequestWorkflow.run({
        container: req.scope,
        input: {
            data: { ...req.validatedBody, customer_id: req.auth_context.actor_id },
            seller_id: resource.seller_id
        }
    });
    res.json({ order_return_request });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL3JldHVybi1yZXF1ZXN0L3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBNERBLGtCQXNCQztBQTZCRCxvQkEwQkM7QUF4SUQscURBQXFFO0FBRXJFLCtFQUFxRDtBQUNyRCxpRkFBb0c7QUFDcEcsaURBQThEO0FBRzlEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtREc7QUFDSSxLQUFLLFVBQVUsR0FBRyxDQUN2QixHQUErQixFQUMvQixHQUFtQjtJQUVuQixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxpQ0FBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUVoRSxNQUFNLEVBQUUsSUFBSSxFQUFFLHFCQUFxQixFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztRQUNsRSxNQUFNLEVBQUUsc0JBQXNCO1FBQzlCLE1BQU0sRUFBRSw0Q0FBNkI7UUFDckMsT0FBTyxFQUFFO1lBQ1AsR0FBRyxHQUFHLENBQUMsZ0JBQWdCO1lBQ3ZCLFdBQVcsRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVE7U0FDdkM7UUFDRCxVQUFVLEVBQUUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxVQUFVO0tBQ3ZDLENBQUMsQ0FBQTtJQUVGLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDUCxxQkFBcUI7UUFDckIsS0FBSyxFQUFFLFFBQVMsQ0FBQyxLQUFLO1FBQ3RCLE1BQU0sRUFBRSxRQUFTLENBQUMsSUFBSTtRQUN0QixLQUFLLEVBQUUsUUFBUyxDQUFDLElBQUk7S0FDdEIsQ0FBQyxDQUFBO0FBQ0osQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNJLEtBQUssVUFBVSxJQUFJLENBQ3hCLEdBQTZELEVBQzdELEdBQW1CO0lBRW5CLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRWhFLE1BQU0sRUFDSixJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFDakIsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDcEIsTUFBTSxFQUFFLHNCQUFXLENBQUMsVUFBVTtRQUM5QixNQUFNLEVBQUUsQ0FBQyxXQUFXLENBQUM7UUFDckIsT0FBTyxFQUFFO1lBQ1AsUUFBUSxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsUUFBUTtTQUNyQztLQUNGLENBQUMsQ0FBQTtJQUVGLE1BQU0sRUFBRSxNQUFNLEVBQUUsb0JBQW9CLEVBQUUsR0FDcEMsTUFBTSw0Q0FBZ0MsQ0FBQyxHQUFHLENBQUM7UUFDekMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxLQUFLO1FBQ3BCLEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUU7WUFDdEUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxTQUFTO1NBQzlCO0tBQ0YsQ0FBQyxDQUFBO0lBRUosR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQTtBQUNwQyxDQUFDIn0=