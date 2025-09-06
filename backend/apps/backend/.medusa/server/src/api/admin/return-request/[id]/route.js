"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = exports.GET = void 0;
const utils_1 = require("@medusajs/framework/utils");
const workflows_1 = require("../../../../workflows/order-return-request/workflows");
/**
 * @oas [get] /admin/return-request/{id}
 * operationId: "AdminGetOrderReturnRequestById"
 * summary: "Get return request by id"
 * description: "Retrieves a request by id."
 * x-authenticated: true
 * parameters:
 *   - in: path
 *     name: id
 *     required: true
 *     description: The ID of the Request.
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
 *             orderReturnRequest:
 *               $ref: "#/components/schemas/OrderReturnRequest"
 * tags:
 *   - Admin Return Request
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 */
const GET = async (req, res) => {
    const query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: [order_return_request] } = await query.graph({
        entity: 'order_return_request',
        fields: req.queryConfig.fields,
        filters: {
            id: req.params.id
        }
    });
    res.json({ order_return_request });
};
exports.GET = GET;
/**
 * @oas [post] /admin/return-request/{id}
 * operationId: "AdminUpdateOrderReturnRequestById"
 * summary: "Update return request by id"
 * description: "Updates a request by id."
 * x-authenticated: true
 * parameters:
 *   - in: path
 *     name: id
 *     required: true
 *     description: The ID of the Request.
 *     schema:
 *       type: string
 * requestBody:
 *   content:
 *     application/json:
 *       schema:
 *         $ref: "#/components/schemas/AdminUpdateOrderReturnRequest"
 * responses:
 *   "200":
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             orderReturnRequest:
 *               $ref: "#/components/schemas/OrderReturnRequest"
 * tags:
 *   - Admin Return Request
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 */
const POST = async (req, res) => {
    const query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: [request] } = await query.graph({
        entity: 'order_return_request',
        fields: req.queryConfig.fields,
        filters: {
            id: req.params.id,
            status: 'escalated'
        }
    });
    if (!request) {
        throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_ARGUMENT, 'Request is not in escalated state!');
    }
    const { result: order_return_request } = await workflows_1.updateOrderReturnRequestWorkflow.run({
        input: {
            id: req.params.id,
            ...req.validatedBody,
            admin_reviewer_id: req.auth_context.actor_id,
            admin_review_date: new Date()
        },
        container: req.scope
    });
    res.json({ order_return_request });
};
exports.POST = POST;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3JldHVybi1yZXF1ZXN0L1tpZF0vcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EscURBR2tDO0FBRWxDLG9GQUF1RztBQUd2Rzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtDRztBQUNJLE1BQU0sR0FBRyxHQUFHLEtBQUssRUFDdEIsR0FBK0IsRUFDL0IsR0FBbUIsRUFDbkIsRUFBRTtJQUNGLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRWhFLE1BQU0sRUFDSixJQUFJLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxFQUM3QixHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztRQUNwQixNQUFNLEVBQUUsc0JBQXNCO1FBQzlCLE1BQU0sRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLE1BQU07UUFDOUIsT0FBTyxFQUFFO1lBQ1AsRUFBRSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtTQUNsQjtLQUNGLENBQUMsQ0FBQTtJQUVGLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUE7QUFDcEMsQ0FBQyxDQUFBO0FBakJZLFFBQUEsR0FBRyxPQWlCZjtBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQ0c7QUFDSSxNQUFNLElBQUksR0FBRyxLQUFLLEVBQ3ZCLEdBQWtFLEVBQ2xFLEdBQW1CLEVBQ25CLEVBQUU7SUFDRixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxpQ0FBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUVoRSxNQUFNLEVBQ0osSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQ2hCLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ3BCLE1BQU0sRUFBRSxzQkFBc0I7UUFDOUIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsTUFBTTtRQUM5QixPQUFPLEVBQUU7WUFDUCxFQUFFLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2pCLE1BQU0sRUFBRSxXQUFXO1NBQ3BCO0tBQ0YsQ0FBQyxDQUFBO0lBRUYsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2IsTUFBTSxJQUFJLG1CQUFXLENBQ25CLG1CQUFXLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUNsQyxvQ0FBb0MsQ0FDckMsQ0FBQTtJQUNILENBQUM7SUFFRCxNQUFNLEVBQUUsTUFBTSxFQUFFLG9CQUFvQixFQUFFLEdBQ3BDLE1BQU0sNENBQWdDLENBQUMsR0FBRyxDQUFDO1FBQ3pDLEtBQUssRUFBRTtZQUNMLEVBQUUsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDakIsR0FBRyxHQUFHLENBQUMsYUFBYTtZQUNwQixpQkFBaUIsRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVE7WUFDNUMsaUJBQWlCLEVBQUUsSUFBSSxJQUFJLEVBQUU7U0FDOUI7UUFDRCxTQUFTLEVBQUUsR0FBRyxDQUFDLEtBQUs7S0FDckIsQ0FBQyxDQUFBO0lBRUosR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQTtBQUNwQyxDQUFDLENBQUE7QUFwQ1ksUUFBQSxJQUFJLFFBb0NoQiJ9