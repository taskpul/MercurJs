"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReturnObjectStep = void 0;
const utils_1 = require("@medusajs/framework/utils");
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const return_request_order_1 = __importDefault(require("../../../links/return-request-order"));
exports.createReturnObjectStep = (0, workflows_sdk_1.createStep)('create-return-object', async (request, { container }) => {
    if (request.status !== 'refunded') {
        return new workflows_sdk_1.StepResponse();
    }
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: [{ order_id, order_return_request }] } = await query.graph({
        entity: return_request_order_1.default.entryPoint,
        fields: [
            'order_id',
            'order_return_request.*',
            'order_return_request.line_items.*',
            'order_return_request.seller.id'
        ],
        filters: {
            order_return_request_id: request.id
        }
    });
    await core_flows_1.createAndCompleteReturnOrderWorkflow.run({
        container,
        input: {
            order_id: order_id,
            created_by: order_return_request.customer_id,
            note: order_return_request.customer_note,
            return_shipping: {
                option_id: order_return_request.shipping_option_id
            },
            items: order_return_request.line_items.map((item) => {
                return {
                    id: item.line_item_id,
                    quantity: item.quantity,
                    reason_id: item.reason_id
                };
            })
        }
    });
    return new workflows_sdk_1.StepResponse();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXJldHVybi1vYmplY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL29yZGVyLXJldHVybi1yZXF1ZXN0L3N0ZXBzL2NyZWF0ZS1yZXR1cm4tb2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHFEQUFxRTtBQUNyRSxxRUFBNEU7QUFDNUUsNERBQWtGO0FBSWxGLCtGQUFvRTtBQUV2RCxRQUFBLHNCQUFzQixHQUFHLElBQUEsMEJBQVUsRUFDOUMsc0JBQXNCLEVBQ3RCLEtBQUssRUFBRSxPQUE4QixFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUN0RCxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssVUFBVSxFQUFFLENBQUM7UUFDbEMsT0FBTyxJQUFJLDRCQUFZLEVBQUUsQ0FBQTtJQUMzQixDQUFDO0lBRUQsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxpQ0FBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNoRSxNQUFNLEVBQ0osSUFBSSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxFQUMzQyxHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztRQUNwQixNQUFNLEVBQUUsOEJBQWtCLENBQUMsVUFBVTtRQUNyQyxNQUFNLEVBQUU7WUFDTixVQUFVO1lBQ1Ysd0JBQXdCO1lBQ3hCLG1DQUFtQztZQUNuQyxnQ0FBZ0M7U0FDakM7UUFDRCxPQUFPLEVBQUU7WUFDUCx1QkFBdUIsRUFBRSxPQUFPLENBQUMsRUFBRTtTQUNwQztLQUNGLENBQUMsQ0FBQTtJQUVGLE1BQU0saURBQW9DLENBQUMsR0FBRyxDQUFDO1FBQzdDLFNBQVM7UUFDVCxLQUFLLEVBQUU7WUFDTCxRQUFRLEVBQUUsUUFBUTtZQUNsQixVQUFVLEVBQUUsb0JBQW9CLENBQUMsV0FBVztZQUM1QyxJQUFJLEVBQUUsb0JBQW9CLENBQUMsYUFBYTtZQUN4QyxlQUFlLEVBQUU7Z0JBQ2YsU0FBUyxFQUFFLG9CQUFvQixDQUFDLGtCQUFrQjthQUNuRDtZQUNELEtBQUssRUFBRSxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ2xELE9BQU87b0JBQ0wsRUFBRSxFQUFFLElBQUksQ0FBQyxZQUFZO29CQUNyQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7b0JBQ3ZCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztpQkFDMUIsQ0FBQTtZQUNILENBQUMsQ0FBQztTQUNIO0tBQ0YsQ0FBQyxDQUFBO0lBRUYsT0FBTyxJQUFJLDRCQUFZLEVBQUUsQ0FBQTtBQUMzQixDQUFDLENBQ0YsQ0FBQSJ9