"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = sellerNewOrderHandler;
const utils_1 = require("@medusajs/framework/utils");
const resend_1 = require("@mercurjs/resend");
async function sellerNewOrderHandler({ event, container }) {
    const notificationService = container.resolve(utils_1.Modules.NOTIFICATION);
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: [order] } = await query.graph({
        entity: 'order',
        fields: [
            'id',
            'display_id',
            'items.*',
            'seller.email',
            'seller.name',
            'seller.id',
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
    const sellerEmail = order.seller?.email;
    if (!sellerEmail) {
        console.error('Seller email not found for order:', order.id);
        return;
    }
    const customer_name = `${order.customer?.first_name || ''} ${order.customer?.last_name || ''}`;
    await notificationService.createNotifications([
        {
            to: order.seller?.id,
            channel: 'seller_feed',
            template: 'seller_new_order_notification',
            data: {
                order_id: order.id,
                customer_name
            }
        },
        {
            to: sellerEmail,
            channel: 'email',
            template: resend_1.ResendNotificationTemplates.SELLER_NEW_ORDER,
            content: {
                subject: `New order #${order.display_id} received`
            },
            data: {
                data: {
                    order_id: order.id,
                    order,
                    customer_name,
                    seller_name: order.seller?.name || ''
                }
            }
        }
    ]);
}
exports.config = {
    event: utils_1.OrderWorkflowEvents.PLACED,
    context: {
        subscriberId: 'seller-new-order-handler'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLXNlbGxlci1uZXctb3JkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc3Vic2NyaWJlcnMvbm90aWZpY2F0aW9uLXNlbGxlci1uZXctb3JkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBU0Esd0NBaUVDO0FBekVELHFEQUlrQztBQUVsQyw2Q0FBOEQ7QUFFL0MsS0FBSyxVQUFVLHFCQUFxQixDQUFDLEVBQ2xELEtBQUssRUFDTCxTQUFTLEVBQ3NCO0lBQy9CLE1BQU0sbUJBQW1CLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxlQUFPLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDbkUsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxpQ0FBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUVoRSxNQUFNLEVBQ0osSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQ2QsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDcEIsTUFBTSxFQUFFLE9BQU87UUFDZixNQUFNLEVBQUU7WUFDTixJQUFJO1lBQ0osWUFBWTtZQUNaLFNBQVM7WUFDVCxjQUFjO1lBQ2QsYUFBYTtZQUNiLFdBQVc7WUFDWCxxQkFBcUI7WUFDckIsb0JBQW9CO1NBQ3JCO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtTQUNsQjtLQUNGLENBQUMsQ0FBQTtJQUVGLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNYLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNoRCxPQUFNO0lBQ1IsQ0FBQztJQUVELE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFBO0lBQ3ZDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNqQixPQUFPLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUM1RCxPQUFNO0lBQ1IsQ0FBQztJQUVELE1BQU0sYUFBYSxHQUFHLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxVQUFVLElBQUksRUFBRSxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsU0FBUyxJQUFJLEVBQUUsRUFBRSxDQUFBO0lBQzlGLE1BQU0sbUJBQW1CLENBQUMsbUJBQW1CLENBQUM7UUFDNUM7WUFDRSxFQUFFLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ3BCLE9BQU8sRUFBRSxhQUFhO1lBQ3RCLFFBQVEsRUFBRSwrQkFBK0I7WUFDekMsSUFBSSxFQUFFO2dCQUNKLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDbEIsYUFBYTthQUNkO1NBQ0Y7UUFDRDtZQUNFLEVBQUUsRUFBRSxXQUFXO1lBQ2YsT0FBTyxFQUFFLE9BQU87WUFDaEIsUUFBUSxFQUFFLG9DQUEyQixDQUFDLGdCQUFnQjtZQUN0RCxPQUFPLEVBQUU7Z0JBQ1AsT0FBTyxFQUFFLGNBQWMsS0FBSyxDQUFDLFVBQVUsV0FBVzthQUNuRDtZQUNELElBQUksRUFBRTtnQkFDSixJQUFJLEVBQUU7b0JBQ0osUUFBUSxFQUFFLEtBQUssQ0FBQyxFQUFFO29CQUNsQixLQUFLO29CQUNMLGFBQWE7b0JBQ2IsV0FBVyxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxJQUFJLEVBQUU7aUJBQ3RDO2FBQ0Y7U0FDRjtLQUNGLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFFWSxRQUFBLE1BQU0sR0FBcUI7SUFDdEMsS0FBSyxFQUFFLDJCQUFtQixDQUFDLE1BQU07SUFDakMsT0FBTyxFQUFFO1FBQ1AsWUFBWSxFQUFFLDBCQUEwQjtLQUN6QztDQUNGLENBQUEifQ==