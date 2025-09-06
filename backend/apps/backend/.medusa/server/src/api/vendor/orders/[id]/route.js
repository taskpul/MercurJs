"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
const workflows_1 = require("../../../../workflows/commission/workflows");
const workflows_2 = require("../../../../workflows/order/workflows");
/**
 * @oas [get] /vendor/orders/{id}
 * operationId: "VendorGetOrder"
 * summary: "Get Order details"
 * description: "Retrieves the details of specified order."
 * x-authenticated: true
 * parameters:
 * - in: path
 *   name: id
 *   required: true
 *   description: The ID of the Order.
 *   schema:
 *     type: string
 * responses:
 *   "200":
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             order:
 *               $ref: "#/components/schemas/VendorOrderDetails"
 * tags:
 *   - Vendor Orders
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 */
const GET = async (req, res) => {
    const { id } = req.params;
    const { result } = await (0, workflows_2.getVendorOrdersListWorkflow)(req.scope).run({
        input: {
            fields: req.queryConfig.fields,
            variables: {
                filters: {
                    id
                }
            }
        }
    });
    const [order] = result;
    const { result: commission } = await (0, workflows_1.listOrderCommissionLinesWorkflow)(req.scope).run({
        input: {
            order_id: id
        }
    });
    res.json({ order: { ...order, ...commission } });
};
exports.GET = GET;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3ZlbmRvci9vcmRlcnMvW2lkXS9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSwwRUFBNkY7QUFDN0YscUVBQW1GO0FBRW5GOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBQ0ksTUFBTSxHQUFHLEdBQUcsS0FBSyxFQUN0QixHQUErQixFQUMvQixHQUFtQixFQUNuQixFQUFFO0lBQ0YsTUFBTSxFQUFFLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUE7SUFFekIsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLE1BQU0sSUFBQSx1Q0FBMkIsRUFBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ2xFLEtBQUssRUFBRTtZQUNMLE1BQU0sRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLE1BQU07WUFDOUIsU0FBUyxFQUFFO2dCQUNULE9BQU8sRUFBRTtvQkFDUCxFQUFFO2lCQUNIO2FBQ0Y7U0FDRjtLQUNGLENBQUMsQ0FBQTtJQUVGLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxNQUFvQixDQUFBO0lBRXBDLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsTUFBTSxJQUFBLDRDQUFnQyxFQUNuRSxHQUFHLENBQUMsS0FBSyxDQUNWLENBQUMsR0FBRyxDQUFDO1FBQ0osS0FBSyxFQUFFO1lBQ0wsUUFBUSxFQUFFLEVBQUU7U0FDYjtLQUNGLENBQUMsQ0FBQTtJQUNGLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxHQUFHLEtBQUssRUFBRSxHQUFHLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQTtBQUNsRCxDQUFDLENBQUE7QUEzQlksUUFBQSxHQUFHLE9BMkJmIn0=