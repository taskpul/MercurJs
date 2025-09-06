"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = notificationSellerPayoutSummary;
const utils_1 = require("@medusajs/framework/utils");
const framework_1 = require("@mercurjs/framework");
const resend_1 = require("@mercurjs/resend");
async function notificationSellerPayoutSummary({ event, container }) {
    const { seller, payouts } = event.data;
    const notificationService = container.resolve(utils_1.Modules.NOTIFICATION);
    await notificationService.createNotifications([
        {
            to: seller.email,
            channel: 'email',
            template: resend_1.ResendNotificationTemplates.SELLER_PAYOUT_SUMMARY,
            content: {
                subject: `Payout summary for ${seller.name}`
            },
            data: {
                data: {
                    seller,
                    payouts
                }
            }
        }
    ]);
}
exports.config = {
    event: framework_1.PayoutSummaryEvents.NOTIFICATION_SENT,
    context: {
        subscriberId: 'notification-seller-payout-summary'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLXNlbGxlci1wYXlvdXQtc3VtbWFyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdWJzY3JpYmVycy9ub3RpZmljYXRpb24tc2VsbGVyLXBheW91dC1zdW1tYXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQU1BLGtEQXNCQztBQTNCRCxxREFBbUQ7QUFFbkQsbURBQXlEO0FBQ3pELDZDQUE4RDtBQUUvQyxLQUFLLFVBQVUsK0JBQStCLENBQUMsRUFDNUQsS0FBSyxFQUNMLFNBQVMsRUFDcUM7SUFDOUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFBO0lBQ3RDLE1BQU0sbUJBQW1CLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxlQUFPLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDbkUsTUFBTSxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQztRQUM1QztZQUNFLEVBQUUsRUFBRSxNQUFNLENBQUMsS0FBSztZQUNoQixPQUFPLEVBQUUsT0FBTztZQUNoQixRQUFRLEVBQUUsb0NBQTJCLENBQUMscUJBQXFCO1lBQzNELE9BQU8sRUFBRTtnQkFDUCxPQUFPLEVBQUUsc0JBQXNCLE1BQU0sQ0FBQyxJQUFJLEVBQUU7YUFDN0M7WUFDRCxJQUFJLEVBQUU7Z0JBQ0osSUFBSSxFQUFFO29CQUNKLE1BQU07b0JBQ04sT0FBTztpQkFDUjthQUNGO1NBQ0Y7S0FDRixDQUFDLENBQUE7QUFDSixDQUFDO0FBRVksUUFBQSxNQUFNLEdBQXFCO0lBQ3RDLEtBQUssRUFBRSwrQkFBbUIsQ0FBQyxpQkFBaUI7SUFDNUMsT0FBTyxFQUFFO1FBQ1AsWUFBWSxFQUFFLG9DQUFvQztLQUNuRDtDQUNGLENBQUEifQ==