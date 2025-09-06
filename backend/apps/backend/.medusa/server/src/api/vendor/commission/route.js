"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
const utils_1 = require("../../../shared/infra/http/utils");
const workflows_1 = require("../../../workflows/commission/workflows");
/**
 * @oas [get] /vendor/commission
 * operationId: "VendorListCommissionLines"
 * summary: "List Commission Lines"
 * description: "Retrieves a list of commission lines for the authenticated vendor/seller with optional filtering."
 * x-authenticated: true
 * parameters:
 *   - name: offset
 *     in: query
 *     schema:
 *       type: number
 *       default: 0
 *     required: false
 *     description: The number of items to skip before starting to collect the result set.
 *   - name: limit
 *     in: query
 *     schema:
 *       type: number
 *       default: 20
 *     required: false
 *     description: The number of items to return.
 *   - name: start_date
 *     in: query
 *     schema:
 *       type: string
 *       format: date-time
 *     required: false
 *     description: Filter commission lines created on or after this date.
 *   - name: end_date
 *     in: query
 *     schema:
 *       type: string
 *       format: date-time
 *     required: false
 *     description: Filter commission lines created on or before this date.
 * responses:
 *   "200":
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             commission_lines:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/VendorCommissionLine"
 *             count:
 *               type: integer
 *               description: The total number of commission lines available
 *             offset:
 *               type: integer
 *               description: The number of items skipped before these items
 *             limit:
 *               type: integer
 *               description: The number of items per page
 *   "401":
 *     description: Unauthorized
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Unauthorized"
 *   "403":
 *     description: Forbidden
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Forbidden"
 * tags:
 *   - Vendor Commission
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 */
const GET = async (req, res) => {
    const seller = await (0, utils_1.fetchSellerByAuthActorId)(req.auth_context.actor_id, req.scope);
    const { result: { lines: commission_lines, count } } = await (0, workflows_1.listCommissionLinesWorkflow)(req.scope).run({
        input: {
            expand: true,
            pagination: {
                skip: req.queryConfig.pagination.skip,
                take: req.queryConfig.pagination.take || 20
            },
            filters: {
                ...req.filterableFields,
                seller_id: seller.id
            }
        }
    });
    res.json({
        commission_lines,
        count,
        offset: req.queryConfig.pagination.skip,
        limit: req.queryConfig.pagination.take
    });
};
exports.GET = GET;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3ZlbmRvci9jb21taXNzaW9uL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLDREQUEyRTtBQUMzRSx1RUFBcUY7QUFFckY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlGRztBQUNJLE1BQU0sR0FBRyxHQUFHLEtBQUssRUFDdEIsR0FBK0IsRUFDL0IsR0FBbUIsRUFDbkIsRUFBRTtJQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBQSxnQ0FBd0IsRUFDM0MsR0FBRyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQ3pCLEdBQUcsQ0FBQyxLQUFLLENBQ1YsQ0FBQTtJQUVELE1BQU0sRUFDSixNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLEVBQzNDLEdBQUcsTUFBTSxJQUFBLHVDQUEyQixFQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDbkQsS0FBSyxFQUFFO1lBQ0wsTUFBTSxFQUFFLElBQUk7WUFDWixVQUFVLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUk7Z0JBQ3JDLElBQUksRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksRUFBRTthQUM1QztZQUNELE9BQU8sRUFBRTtnQkFDUCxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0I7Z0JBQ3ZCLFNBQVMsRUFBRSxNQUFNLENBQUMsRUFBRTthQUNyQjtTQUNGO0tBQ0YsQ0FBQyxDQUFBO0lBRUYsR0FBRyxDQUFDLElBQUksQ0FBQztRQUNQLGdCQUFnQjtRQUNoQixLQUFLO1FBQ0wsTUFBTSxFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUk7UUFDdkMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUk7S0FDdkMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBL0JZLFFBQUEsR0FBRyxPQStCZiJ9