"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = exports.GET = void 0;
const utils_1 = require("@medusajs/framework/utils");
const seller_request_1 = __importDefault(require("../../../links/seller-request"));
const utils_2 = require("../../../shared/infra/http/utils");
const workflows_1 = require("../../../workflows/requests/workflows");
/**
 * @oas [get] /vendor/requests
 * operationId: "VendorListRequests"
 * summary: "List requests"
 * description: "Retrieves submited requests list"
 * x-authenticated: true
 * parameters:
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
 *             requests:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/VendorRequest"
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
 *   - Vendor Requests
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 */
const GET = async (req, res) => {
    const query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: requests, metadata } = await query.graph({
        entity: seller_request_1.default.entryPoint,
        fields: req.queryConfig.fields.map((field) => `request.${field}`),
        filters: {
            ...req.filterableFields,
            deleted_at: {
                $eq: null
            }
        },
        pagination: req.queryConfig.pagination
    });
    res.json({
        requests: requests.map((relation) => relation.request),
        count: metadata.count,
        offset: metadata.skip,
        limit: metadata.take
    });
};
exports.GET = GET;
/**
 * @oas [post] /vendor/requests
 * operationId: "VendorCreateRequest"
 * summary: "Create a request to admin"
 * description: "Creates a request to admin to accept new resource"
 * x-authenticated: true
 * requestBody:
 *   content:
 *     application/json:
 *       schema:
 *         $ref: "#/components/schemas/VendorCreateRequest"
 * responses:
 *   "201":
 *     description: Created
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             request:
 *               $ref: "#/components/schemas/VendorRequest"
 * tags:
 *   - Vendor Requests
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 */
const POST = async (req, res) => {
    const query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const seller = await (0, utils_2.fetchSellerByAuthActorId)(req.auth_context.actor_id, req.scope);
    const { result } = await workflows_1.createRequestWorkflow.run({
        input: {
            data: {
                submitter_id: req.auth_context.actor_id,
                ...req.validatedBody.request
            },
            seller_id: seller.id
        },
        container: req.scope
    });
    const { data: [request] } = await query.graph({
        entity: 'request',
        fields: req.queryConfig.fields,
        filters: {
            id: result[0].id
        }
    });
    res.status(201).json({ request });
};
exports.POST = POST;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3ZlbmRvci9yZXF1ZXN0cy9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxxREFBcUU7QUFFckUsbUZBQXlEO0FBQ3pELDREQUEyRTtBQUMzRSxxRUFBNkU7QUFHN0U7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVDRztBQUNJLE1BQU0sR0FBRyxHQUFHLEtBQUssRUFDdEIsR0FBK0IsRUFDL0IsR0FBbUIsRUFDbkIsRUFBRTtJQUNGLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRWhFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztRQUNyRCxNQUFNLEVBQUUsd0JBQWEsQ0FBQyxVQUFVO1FBQ2hDLE1BQU0sRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUM7UUFDakUsT0FBTyxFQUFFO1lBQ1AsR0FBRyxHQUFHLENBQUMsZ0JBQWdCO1lBQ3ZCLFVBQVUsRUFBRTtnQkFDVixHQUFHLEVBQUUsSUFBSTthQUNWO1NBQ0Y7UUFDRCxVQUFVLEVBQUUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxVQUFVO0tBQ3ZDLENBQUMsQ0FBQTtJQUVGLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDUCxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUN0RCxLQUFLLEVBQUUsUUFBUyxDQUFDLEtBQUs7UUFDdEIsTUFBTSxFQUFFLFFBQVMsQ0FBQyxJQUFJO1FBQ3RCLEtBQUssRUFBRSxRQUFTLENBQUMsSUFBSTtLQUN0QixDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUF4QlksUUFBQSxHQUFHLE9Bd0JmO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0ksTUFBTSxJQUFJLEdBQUcsS0FBSyxFQUN2QixHQUF3RCxFQUN4RCxHQUFtQixFQUNuQixFQUFFO0lBQ0YsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFaEUsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFBLGdDQUF3QixFQUMzQyxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFDekIsR0FBRyxDQUFDLEtBQUssQ0FDVixDQUFBO0lBRUQsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLE1BQU0saUNBQXFCLENBQUMsR0FBRyxDQUFDO1FBQ2pELEtBQUssRUFBRTtZQUNMLElBQUksRUFBRTtnQkFDSixZQUFZLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxRQUFRO2dCQUN2QyxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTzthQUM3QjtZQUNELFNBQVMsRUFBRSxNQUFNLENBQUMsRUFBRTtTQUNyQjtRQUNELFNBQVMsRUFBRSxHQUFHLENBQUMsS0FBSztLQUNyQixDQUFDLENBQUE7SUFFRixNQUFNLEVBQ0osSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQ2hCLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ3BCLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLE1BQU0sRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLE1BQU07UUFDOUIsT0FBTyxFQUFFO1lBQ1AsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1NBQ2pCO0tBQ0YsQ0FBQyxDQUFBO0lBRUYsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO0FBQ25DLENBQUMsQ0FBQTtBQWpDWSxRQUFBLElBQUksUUFpQ2hCIn0=