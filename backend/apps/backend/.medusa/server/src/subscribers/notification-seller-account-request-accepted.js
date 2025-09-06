"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = sellerRequestAcceptedHandler;
const utils_1 = require("@medusajs/framework/utils");
const framework_1 = require("@mercurjs/framework");
const resend_1 = require("@mercurjs/resend");
async function sellerRequestAcceptedHandler({ event, container }) {
    const notificationService = container.resolve(utils_1.Modules.NOTIFICATION);
    const requestData = event.data.data;
    await notificationService.createNotifications({
        to: requestData.provider_identity_id,
        channel: 'email',
        template: resend_1.ResendNotificationTemplates.SELLER_ACCOUNT_UPDATES_APPROVAL,
        content: {
            subject: 'Mercur - Seller account approved!'
        },
        data: { data: { user_name: requestData.member.name } }
    });
}
exports.config = {
    event: framework_1.SellerAccountRequestUpdatedEvent.ACCEPTED,
    context: {
        subscriberId: 'seller-account-request-accepted-handler'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLXNlbGxlci1hY2NvdW50LXJlcXVlc3QtYWNjZXB0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc3Vic2NyaWJlcnMvbm90aWZpY2F0aW9uLXNlbGxlci1hY2NvdW50LXJlcXVlc3QtYWNjZXB0ZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBU0EsK0NBbUJDO0FBM0JELHFEQUFtRDtBQUVuRCxtREFHNEI7QUFDNUIsNkNBQThEO0FBRS9DLEtBQUssVUFBVSw0QkFBNEIsQ0FBQyxFQUN6RCxLQUFLLEVBQ0wsU0FBUyxFQUNrQjtJQUMzQixNQUFNLG1CQUFtQixHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsZUFBTyxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ25FLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFHOUIsQ0FBQTtJQUVELE1BQU0sbUJBQW1CLENBQUMsbUJBQW1CLENBQUM7UUFDNUMsRUFBRSxFQUFFLFdBQVcsQ0FBQyxvQkFBb0I7UUFDcEMsT0FBTyxFQUFFLE9BQU87UUFDaEIsUUFBUSxFQUFFLG9DQUEyQixDQUFDLCtCQUErQjtRQUNyRSxPQUFPLEVBQUU7WUFDUCxPQUFPLEVBQUUsbUNBQW1DO1NBQzdDO1FBQ0QsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUU7S0FDdkQsQ0FBQyxDQUFBO0FBQ0osQ0FBQztBQUVZLFFBQUEsTUFBTSxHQUFxQjtJQUN0QyxLQUFLLEVBQUUsNENBQWdDLENBQUMsUUFBUTtJQUNoRCxPQUFPLEVBQUU7UUFDUCxZQUFZLEVBQUUseUNBQXlDO0tBQ3hEO0NBQ0YsQ0FBQSJ9