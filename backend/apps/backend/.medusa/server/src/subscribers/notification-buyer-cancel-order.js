"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = buyerCancelOrderHandler;
const utils_1 = require("@medusajs/framework/utils");
const resend_1 = require("@mercurjs/resend");
const utils_2 = require("../shared/infra/http/utils");
async function buyerCancelOrderHandler({ event, container }) {
    const notificationService = container.resolve(utils_1.Modules.NOTIFICATION);
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: [order] } = await query.graph({
        entity: 'order',
        fields: [
            'id',
            'email',
            'display_id',
            'items.*',
            'customer.first_name',
            'customer.last_name'
        ],
        filters: {
            id: event.data.id
        }
    });
    if (!order) {
        console.error('Order not found:', event.data.id);
        return;
    }
    await notificationService.createNotifications({
        to: order.email,
        channel: 'email',
        template: resend_1.ResendNotificationTemplates.BUYER_CANCELED_ORDER,
        content: {
            subject: `Your order #${order.display_id} has been canceled`
        },
        data: {
            data: {
                order: {
                    id: order.id,
                    display_id: order.display_id,
                    item: order.items
                },
                order_address: (0, utils_2.buildHostAddress)(utils_2.Hosts.STOREFRONT, `/user/orders/${order.id}`).toString()
            }
        }
    });
}
exports.config = {
    event: 'order.canceled',
    context: {
        subscriberId: 'notification-buyer-cancel-order'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLWJ1eWVyLWNhbmNlbC1vcmRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdWJzY3JpYmVycy9ub3RpZmljYXRpb24tYnV5ZXItY2FuY2VsLW9yZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQU9BLDBDQWtEQztBQXhERCxxREFBOEU7QUFFOUUsNkNBQThEO0FBRTlELHNEQUFvRTtBQUVyRCxLQUFLLFVBQVUsdUJBQXVCLENBQUMsRUFDcEQsS0FBSyxFQUNMLFNBQVMsRUFDc0I7SUFDL0IsTUFBTSxtQkFBbUIsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGVBQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUNuRSxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRWhFLE1BQU0sRUFDSixJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFDZCxHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztRQUNwQixNQUFNLEVBQUUsT0FBTztRQUNmLE1BQU0sRUFBRTtZQUNOLElBQUk7WUFDSixPQUFPO1lBQ1AsWUFBWTtZQUNaLFNBQVM7WUFDVCxxQkFBcUI7WUFDckIsb0JBQW9CO1NBQ3JCO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtTQUNsQjtLQUNGLENBQUMsQ0FBQTtJQUVGLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNYLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNoRCxPQUFNO0lBQ1IsQ0FBQztJQUVELE1BQU0sbUJBQW1CLENBQUMsbUJBQW1CLENBQUM7UUFDNUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxLQUFLO1FBQ2YsT0FBTyxFQUFFLE9BQU87UUFDaEIsUUFBUSxFQUFFLG9DQUEyQixDQUFDLG9CQUFvQjtRQUMxRCxPQUFPLEVBQUU7WUFDUCxPQUFPLEVBQUUsZUFBZSxLQUFLLENBQUMsVUFBVSxvQkFBb0I7U0FDN0Q7UUFDRCxJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUU7Z0JBQ0osS0FBSyxFQUFFO29CQUNMLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRTtvQkFDWixVQUFVLEVBQUUsS0FBSyxDQUFDLFVBQVU7b0JBQzVCLElBQUksRUFBRSxLQUFLLENBQUMsS0FBSztpQkFDbEI7Z0JBQ0QsYUFBYSxFQUFFLElBQUEsd0JBQWdCLEVBQzdCLGFBQUssQ0FBQyxVQUFVLEVBQ2hCLGdCQUFnQixLQUFLLENBQUMsRUFBRSxFQUFFLENBQzNCLENBQUMsUUFBUSxFQUFFO2FBQ2I7U0FDRjtLQUNGLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFFWSxRQUFBLE1BQU0sR0FBcUI7SUFDdEMsS0FBSyxFQUFFLGdCQUFnQjtJQUN2QixPQUFPLEVBQUU7UUFDUCxZQUFZLEVBQUUsaUNBQWlDO0tBQ2hEO0NBQ0YsQ0FBQSJ9