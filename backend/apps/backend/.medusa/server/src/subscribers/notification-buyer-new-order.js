"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = orderCreatedHandler;
const utils_1 = require("@medusajs/framework/utils");
const resend_1 = require("@mercurjs/resend");
const utils_2 = require("../shared/infra/http/utils");
async function orderCreatedHandler({ event, container }) {
    const notificationService = container.resolve(utils_1.Modules.NOTIFICATION);
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: [order] } = await query.graph({
        entity: 'order',
        fields: [
            '*',
            'customer.*',
            'items.*',
            'shipping_address.*',
            'shipping_methods.*',
            'summary.*'
        ],
        filters: {
            id: event.data.id
        }
    });
    if (!order) {
        return;
    }
    await notificationService.createNotifications({
        to: order.email,
        channel: 'email',
        template: resend_1.ResendNotificationTemplates.BUYER_NEW_ORDER,
        content: {
            subject: `Order Confirmation - #${order.display_id}`
        },
        data: {
            data: {
                user_name: order.customer?.first_name || 'Customer',
                order_id: order.id,
                order_address: (0, utils_2.buildHostAddress)(utils_2.Hosts.STOREFRONT, `/user/orders/${order.id}`).toString(),
                order: {
                    ...order,
                    display_id: order.display_id,
                    total: order.summary?.current_order_total || 0
                }
            }
        }
    });
}
exports.config = {
    event: utils_1.OrderWorkflowEvents.PLACED,
    context: {
        subscriberId: 'order-created-handler'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLWJ1eWVyLW5ldy1vcmRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdWJzY3JpYmVycy9ub3RpZmljYXRpb24tYnV5ZXItbmV3LW9yZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQVdBLHNDQW1EQztBQTdERCxxREFJa0M7QUFFbEMsNkNBQThEO0FBRTlELHNEQUFvRTtBQUVyRCxLQUFLLFVBQVUsbUJBQW1CLENBQUMsRUFDaEQsS0FBSyxFQUNMLFNBQVMsRUFDc0I7SUFDL0IsTUFBTSxtQkFBbUIsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGVBQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUVuRSxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2hFLE1BQU0sRUFDSixJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFDZCxHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztRQUNwQixNQUFNLEVBQUUsT0FBTztRQUNmLE1BQU0sRUFBRTtZQUNOLEdBQUc7WUFDSCxZQUFZO1lBQ1osU0FBUztZQUNULG9CQUFvQjtZQUNwQixvQkFBb0I7WUFDcEIsV0FBVztTQUNaO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtTQUNsQjtLQUNGLENBQUMsQ0FBQTtJQUVGLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNYLE9BQU07SUFDUixDQUFDO0lBRUQsTUFBTSxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQztRQUM1QyxFQUFFLEVBQUUsS0FBSyxDQUFDLEtBQUs7UUFDZixPQUFPLEVBQUUsT0FBTztRQUNoQixRQUFRLEVBQUUsb0NBQTJCLENBQUMsZUFBZTtRQUNyRCxPQUFPLEVBQUU7WUFDUCxPQUFPLEVBQUUseUJBQXlCLEtBQUssQ0FBQyxVQUFVLEVBQUU7U0FDckQ7UUFDRCxJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUU7Z0JBQ0osU0FBUyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsVUFBVSxJQUFJLFVBQVU7Z0JBQ25ELFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDbEIsYUFBYSxFQUFFLElBQUEsd0JBQWdCLEVBQzdCLGFBQUssQ0FBQyxVQUFVLEVBQ2hCLGdCQUFnQixLQUFLLENBQUMsRUFBRSxFQUFFLENBQzNCLENBQUMsUUFBUSxFQUFFO2dCQUNaLEtBQUssRUFBRTtvQkFDTCxHQUFHLEtBQUs7b0JBQ1IsVUFBVSxFQUFFLEtBQUssQ0FBQyxVQUFVO29CQUM1QixLQUFLLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxtQkFBbUIsSUFBSSxDQUFDO2lCQUMvQzthQUNGO1NBQ0Y7S0FDRixDQUFDLENBQUE7QUFDSixDQUFDO0FBRVksUUFBQSxNQUFNLEdBQXFCO0lBQ3RDLEtBQUssRUFBRSwyQkFBbUIsQ0FBQyxNQUFNO0lBQ2pDLE9BQU8sRUFBRTtRQUNQLFlBQVksRUFBRSx1QkFBdUI7S0FDdEM7Q0FDRixDQUFBIn0=