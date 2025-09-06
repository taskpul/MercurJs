"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const seller_1 = require("@mercurjs/seller");
const return_request_order_1 = __importDefault(require("../../links/return-request-order"));
const workflows_1 = require("../order-return-request/workflows");
workflows_1.updateOrderReturnRequestWorkflow.hooks.orderReturnRequestUpdated(async ({ requestId }, { container }) => {
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
            order_return_request_id: requestId
        }
    });
    const { data: [order] } = await query.graph({
        entity: 'order',
        fields: ['returns.id'],
        filters: {
            id: order_id
        }
    });
    const returns = Array.isArray(order.returns)
        ? order.returns
        : [order.returns];
    const links = returns.map((r) => {
        return {
            [seller_1.SELLER_MODULE]: {
                seller_id: order_return_request.seller.id
            },
            [utils_1.Modules.ORDER]: {
                return_id: r.id
            }
        };
    });
    const linkService = container.resolve(utils_1.ContainerRegistrationKeys.LINK);
    await linkService.create(links);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItcmV0dXJuLXJlcXVlc3QtdXBkYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvaG9va3Mvb3JkZXItcmV0dXJuLXJlcXVlc3QtdXBkYXRlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHFEQUE4RTtBQUU5RSw2Q0FBZ0Q7QUFFaEQsNEZBQWlFO0FBQ2pFLGlFQUFvRjtBQUVwRiw0Q0FBZ0MsQ0FBQyxLQUFLLENBQUMseUJBQXlCLENBQzlELEtBQUssRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUNyQyxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRWhFLE1BQU0sRUFDSixJQUFJLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLEVBQzNDLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ3BCLE1BQU0sRUFBRSw4QkFBa0IsQ0FBQyxVQUFVO1FBQ3JDLE1BQU0sRUFBRTtZQUNOLFVBQVU7WUFDVix3QkFBd0I7WUFDeEIsbUNBQW1DO1lBQ25DLGdDQUFnQztTQUNqQztRQUNELE9BQU8sRUFBRTtZQUNQLHVCQUF1QixFQUFFLFNBQVM7U0FDbkM7S0FDRixDQUFDLENBQUE7SUFFRixNQUFNLEVBQ0osSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQ2QsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDcEIsTUFBTSxFQUFFLE9BQU87UUFDZixNQUFNLEVBQUUsQ0FBQyxZQUFZLENBQUM7UUFDdEIsT0FBTyxFQUFFO1lBQ1AsRUFBRSxFQUFFLFFBQVE7U0FDYjtLQUNGLENBQUMsQ0FBQTtJQUVGLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUMxQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU87UUFDZixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7SUFFbkIsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQzlCLE9BQU87WUFDTCxDQUFDLHNCQUFhLENBQUMsRUFBRTtnQkFDZixTQUFTLEVBQUUsb0JBQW9CLENBQUMsTUFBTSxDQUFDLEVBQUU7YUFDMUM7WUFDRCxDQUFDLGVBQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDZixTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUU7YUFDaEI7U0FDRixDQUFBO0lBQ0gsQ0FBQyxDQUFDLENBQUE7SUFFRixNQUFNLFdBQVcsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3JFLE1BQU0sV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQ0YsQ0FBQSJ9