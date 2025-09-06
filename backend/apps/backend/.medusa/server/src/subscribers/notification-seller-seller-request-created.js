"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = requestCreatedSellerAccountUpdatesNotifyHandler;
const utils_1 = require("@medusajs/framework/utils");
const framework_1 = require("@mercurjs/framework");
const resend_1 = require("@mercurjs/resend");
async function requestCreatedSellerAccountUpdatesNotifyHandler({ event, container }) {
    const requestData = event.data.data;
    if (event.data.type !== 'seller') {
        return;
    }
    const notificationService = container.resolve(utils_1.Modules.NOTIFICATION);
    await notificationService.createNotifications({
        to: requestData.provider_identity_id,
        channel: 'email',
        template: resend_1.ResendNotificationTemplates.SELLER_ACCOUNT_UPDATES_SUBMISSION,
        content: {
            subject: 'Your submission has been received'
        },
        data: {
            data: {
                user_name: requestData.member.name
            }
        }
    });
}
exports.config = {
    event: framework_1.SellerRequest.CREATED,
    context: {
        subscriberId: 'request-created-seller-account-updates-notify-handler'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLXNlbGxlci1zZWxsZXItcmVxdWVzdC1jcmVhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3N1YnNjcmliZXJzL25vdGlmaWNhdGlvbi1zZWxsZXItc2VsbGVyLXJlcXVlc3QtY3JlYXRlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFNQSxrRUE0QkM7QUFsQ0QscURBQW1EO0FBR25ELG1EQUErRDtBQUMvRCw2Q0FBOEQ7QUFFL0MsS0FBSyxVQUFVLCtDQUErQyxDQUFDLEVBQzVFLEtBQUssRUFDTCxTQUFTLEVBQ2tCO0lBQzNCLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFHOUIsQ0FBQTtJQUVELElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFLENBQUM7UUFDakMsT0FBTTtJQUNSLENBQUM7SUFFRCxNQUFNLG1CQUFtQixHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsZUFBTyxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBRW5FLE1BQU0sbUJBQW1CLENBQUMsbUJBQW1CLENBQUM7UUFDNUMsRUFBRSxFQUFFLFdBQVcsQ0FBQyxvQkFBb0I7UUFDcEMsT0FBTyxFQUFFLE9BQU87UUFDaEIsUUFBUSxFQUFFLG9DQUEyQixDQUFDLGlDQUFpQztRQUN2RSxPQUFPLEVBQUU7WUFDUCxPQUFPLEVBQUUsbUNBQW1DO1NBQzdDO1FBQ0QsSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFO2dCQUNKLFNBQVMsRUFBRSxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUk7YUFDbkM7U0FDRjtLQUNGLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFFWSxRQUFBLE1BQU0sR0FBcUI7SUFDdEMsS0FBSyxFQUFFLHlCQUFhLENBQUMsT0FBTztJQUM1QixPQUFPLEVBQUU7UUFDUCxZQUFZLEVBQUUsdURBQXVEO0tBQ3RFO0NBQ0YsQ0FBQSJ9