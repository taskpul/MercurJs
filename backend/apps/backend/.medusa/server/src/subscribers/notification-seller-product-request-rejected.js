"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = sellerProductRequestRejectedHandler;
const utils_1 = require("@medusajs/framework/utils");
const framework_1 = require("@mercurjs/framework");
const requests_1 = require("@mercurjs/requests");
const resend_1 = require("@mercurjs/resend");
async function sellerProductRequestRejectedHandler({ event, container }) {
    const notificationService = container.resolve(utils_1.Modules.NOTIFICATION);
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: [productRequest] } = await query.graph({
        entity: 'request',
        fields: ['*'],
        filters: {
            id: event.data.id
        }
    });
    if (!productRequest || productRequest.type !== 'product') {
        return;
    }
    const { data: [member] } = await query.graph({
        entity: 'member',
        fields: ['*'],
        filters: {
            id: productRequest.submitter_id
        }
    });
    if (!member || !member.email) {
        return;
    }
    await (0, requests_1.sendVendorUIRequestNotification)({
        container,
        requestId: event.data.id,
        requestType: 'product',
        template: 'seller_product_request_rejected_notification'
    });
    await notificationService.createNotifications({
        to: member.email,
        channel: 'email',
        template: resend_1.ResendNotificationTemplates.SELLER_PRODUCT_REJECTED,
        content: {
            subject: 'Mercur - Product rejected!'
        },
        data: { data: { product_title: productRequest.data.title } }
    });
}
exports.config = {
    event: framework_1.ProductRequestUpdatedEvent.REJECTED,
    context: {
        subscriberId: 'seller-product-request-rejected-handler'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLXNlbGxlci1wcm9kdWN0LXJlcXVlc3QtcmVqZWN0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc3Vic2NyaWJlcnMvbm90aWZpY2F0aW9uLXNlbGxlci1wcm9kdWN0LXJlcXVlc3QtcmVqZWN0ZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBT0Esc0RBbURDO0FBekRELHFEQUE4RTtBQUU5RSxtREFBZ0U7QUFDaEUsaURBQW9FO0FBQ3BFLDZDQUE4RDtBQUUvQyxLQUFLLFVBQVUsbUNBQW1DLENBQUMsRUFDaEUsS0FBSyxFQUNMLFNBQVMsRUFDc0I7SUFDL0IsTUFBTSxtQkFBbUIsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGVBQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUNuRSxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRWhFLE1BQU0sRUFDSixJQUFJLEVBQUUsQ0FBQyxjQUFjLENBQUMsRUFDdkIsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDcEIsTUFBTSxFQUFFLFNBQVM7UUFDakIsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDO1FBQ2IsT0FBTyxFQUFFO1lBQ1AsRUFBRSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtTQUNsQjtLQUNGLENBQUMsQ0FBQTtJQUVGLElBQUksQ0FBQyxjQUFjLElBQUksY0FBYyxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUUsQ0FBQztRQUN6RCxPQUFNO0lBQ1IsQ0FBQztJQUVELE1BQU0sRUFDSixJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFDZixHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztRQUNwQixNQUFNLEVBQUUsUUFBUTtRQUNoQixNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUM7UUFDYixPQUFPLEVBQUU7WUFDUCxFQUFFLEVBQUUsY0FBYyxDQUFDLFlBQVk7U0FDaEM7S0FDRixDQUFDLENBQUE7SUFFRixJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzdCLE9BQU07SUFDUixDQUFDO0lBRUQsTUFBTSxJQUFBLDBDQUErQixFQUFDO1FBQ3BDLFNBQVM7UUFDVCxTQUFTLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3hCLFdBQVcsRUFBRSxTQUFTO1FBQ3RCLFFBQVEsRUFBRSw4Q0FBOEM7S0FDekQsQ0FBQyxDQUFBO0lBRUYsTUFBTSxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQztRQUM1QyxFQUFFLEVBQUUsTUFBTSxDQUFDLEtBQUs7UUFDaEIsT0FBTyxFQUFFLE9BQU87UUFDaEIsUUFBUSxFQUFFLG9DQUEyQixDQUFDLHVCQUF1QjtRQUM3RCxPQUFPLEVBQUU7WUFDUCxPQUFPLEVBQUUsNEJBQTRCO1NBQ3RDO1FBQ0QsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsYUFBYSxFQUFFLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUU7S0FDN0QsQ0FBQyxDQUFBO0FBQ0osQ0FBQztBQUVZLFFBQUEsTUFBTSxHQUFxQjtJQUN0QyxLQUFLLEVBQUUsc0NBQTBCLENBQUMsUUFBUTtJQUMxQyxPQUFPLEVBQUU7UUFDUCxZQUFZLEVBQUUseUNBQXlDO0tBQ3hEO0NBQ0YsQ0FBQSJ9