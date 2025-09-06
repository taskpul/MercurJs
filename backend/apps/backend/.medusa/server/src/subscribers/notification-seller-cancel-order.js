"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = sellerCancelOrderHandler;
const utils_1 = require("@medusajs/framework/utils");
const resend_1 = require("@mercurjs/resend");
const utils_2 = require("../shared/infra/http/utils");
async function sellerCancelOrderHandler({ event, container }) {
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
            'customer.last_name',
            'seller.*'
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
        to: order.seller.email,
        channel: 'email',
        template: resend_1.ResendNotificationTemplates.SELLER_CANCELED_ORDER,
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
                order_address: (0, utils_2.buildHostAddress)(utils_2.Hosts.VENDOR_PANEL, `/orders/${order.id}`).toString()
            }
        }
    });
}
exports.config = {
    event: 'order.canceled',
    context: {
        subscriberId: 'notification-seller-cancel-order'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLXNlbGxlci1jYW5jZWwtb3JkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc3Vic2NyaWJlcnMvbm90aWZpY2F0aW9uLXNlbGxlci1jYW5jZWwtb3JkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBT0EsMkNBbURDO0FBekRELHFEQUE4RTtBQUU5RSw2Q0FBOEQ7QUFFOUQsc0RBQW9FO0FBRXJELEtBQUssVUFBVSx3QkFBd0IsQ0FBQyxFQUNyRCxLQUFLLEVBQ0wsU0FBUyxFQUNzQjtJQUMvQixNQUFNLG1CQUFtQixHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsZUFBTyxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ25FLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFaEUsTUFBTSxFQUNKLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUNkLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ3BCLE1BQU0sRUFBRSxPQUFPO1FBQ2YsTUFBTSxFQUFFO1lBQ04sSUFBSTtZQUNKLE9BQU87WUFDUCxZQUFZO1lBQ1osU0FBUztZQUNULHFCQUFxQjtZQUNyQixvQkFBb0I7WUFDcEIsVUFBVTtTQUNYO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtTQUNsQjtLQUNGLENBQUMsQ0FBQTtJQUVGLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNYLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNoRCxPQUFNO0lBQ1IsQ0FBQztJQUVELE1BQU0sbUJBQW1CLENBQUMsbUJBQW1CLENBQUM7UUFDNUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSztRQUN0QixPQUFPLEVBQUUsT0FBTztRQUNoQixRQUFRLEVBQUUsb0NBQTJCLENBQUMscUJBQXFCO1FBQzNELE9BQU8sRUFBRTtZQUNQLE9BQU8sRUFBRSxlQUFlLEtBQUssQ0FBQyxVQUFVLG9CQUFvQjtTQUM3RDtRQUNELElBQUksRUFBRTtZQUNKLElBQUksRUFBRTtnQkFDSixLQUFLLEVBQUU7b0JBQ0wsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFO29CQUNaLFVBQVUsRUFBRSxLQUFLLENBQUMsVUFBVTtvQkFDNUIsSUFBSSxFQUFFLEtBQUssQ0FBQyxLQUFLO2lCQUNsQjtnQkFDRCxhQUFhLEVBQUUsSUFBQSx3QkFBZ0IsRUFDN0IsYUFBSyxDQUFDLFlBQVksRUFDbEIsV0FBVyxLQUFLLENBQUMsRUFBRSxFQUFFLENBQ3RCLENBQUMsUUFBUSxFQUFFO2FBQ2I7U0FDRjtLQUNGLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFFWSxRQUFBLE1BQU0sR0FBcUI7SUFDdEMsS0FBSyxFQUFFLGdCQUFnQjtJQUN2QixPQUFPLEVBQUU7UUFDUCxZQUFZLEVBQUUsa0NBQWtDO0tBQ2pEO0NBQ0YsQ0FBQSJ9