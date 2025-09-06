"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = requestCreatedAdminNotifyHandler;
const utils_1 = require("@medusajs/framework/utils");
const framework_1 = require("@mercurjs/framework");
const resend_1 = require("@mercurjs/resend");
const utils_2 = require("../shared/infra/http/utils");
async function requestCreatedAdminNotifyHandler({ event, container }) {
    const notificationService = container.resolve(utils_1.Modules.NOTIFICATION);
    const { data: { type, data } } = event;
    await notificationService.createNotifications({
        to: '',
        channel: 'feed',
        template: 'admin-ui',
        content: {
            subject: `New Request Created`
        },
        data: {
            title: `New ${framework_1.HumanizeTypes[type]}`,
            description: 'You have received a new request from a seller 🔔',
            redirect: '/admin/requests'
        }
    });
    if (type === 'seller') {
        const admins = await (0, utils_2.fetchAdminEmails)(container);
        const notifications = admins.map((email) => ({
            to: email,
            channel: 'email',
            template: resend_1.ResendNotificationTemplates.ADMIN_SELLER_REQUEST_CREATED,
            content: {
                subject: 'Seller requested to join the platform'
            },
            data: {
                data: {
                    seller_name: data.seller.name || '',
                    request_address: (0, utils_2.buildHostAddress)(utils_2.Hosts.BACKEND, `/admin/requests/seller`).toString()
                }
            }
        }));
        await notificationService.createNotifications(notifications);
    }
}
exports.config = {
    event: framework_1.RequestUpdated.CREATED,
    context: {
        subscriberId: 'request-created-admin-notify-handler'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLWFkbWluLXJlcXVlc3QtY3JlYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdWJzY3JpYmVycy9ub3RpZmljYXRpb24tYWRtaW4tcmVxdWVzdC1jcmVhdGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQVlBLG1EQTZDQztBQXpERCxxREFBbUQ7QUFHbkQsbURBQStFO0FBQy9FLDZDQUE4RDtBQUU5RCxzREFJbUM7QUFFcEIsS0FBSyxVQUFVLGdDQUFnQyxDQUFDLEVBQzdELEtBQUssRUFDTCxTQUFTLEVBQ2tCO0lBQzNCLE1BQU0sbUJBQW1CLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxlQUFPLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDbkUsTUFBTSxFQUNKLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFDckIsR0FBRyxLQUFLLENBQUE7SUFFVCxNQUFNLG1CQUFtQixDQUFDLG1CQUFtQixDQUFDO1FBQzVDLEVBQUUsRUFBRSxFQUFFO1FBQ04sT0FBTyxFQUFFLE1BQU07UUFDZixRQUFRLEVBQUUsVUFBVTtRQUNwQixPQUFPLEVBQUU7WUFDUCxPQUFPLEVBQUUscUJBQXFCO1NBQy9CO1FBQ0QsSUFBSSxFQUFFO1lBQ0osS0FBSyxFQUFFLE9BQU8seUJBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNuQyxXQUFXLEVBQUUsa0RBQWtEO1lBQy9ELFFBQVEsRUFBRSxpQkFBaUI7U0FDNUI7S0FDRixDQUFDLENBQUE7SUFFRixJQUFJLElBQUksS0FBSyxRQUFRLEVBQUUsQ0FBQztRQUN0QixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUEsd0JBQWdCLEVBQUMsU0FBUyxDQUFDLENBQUE7UUFDaEQsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMzQyxFQUFFLEVBQUUsS0FBSztZQUNULE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFFBQVEsRUFBRSxvQ0FBMkIsQ0FBQyw0QkFBNEI7WUFDbEUsT0FBTyxFQUFFO2dCQUNQLE9BQU8sRUFBRSx1Q0FBdUM7YUFDakQ7WUFDRCxJQUFJLEVBQUU7Z0JBQ0osSUFBSSxFQUFFO29CQUNKLFdBQVcsRUFBRyxJQUFZLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFO29CQUM1QyxlQUFlLEVBQUUsSUFBQSx3QkFBZ0IsRUFDL0IsYUFBSyxDQUFDLE9BQU8sRUFDYix3QkFBd0IsQ0FDekIsQ0FBQyxRQUFRLEVBQUU7aUJBQ2I7YUFDRjtTQUNGLENBQUMsQ0FBQyxDQUFBO1FBRUgsTUFBTSxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUM5RCxDQUFDO0FBQ0gsQ0FBQztBQUVZLFFBQUEsTUFBTSxHQUFxQjtJQUN0QyxLQUFLLEVBQUUsMEJBQWMsQ0FBQyxPQUFPO0lBQzdCLE9BQU8sRUFBRTtRQUNQLFlBQVksRUFBRSxzQ0FBc0M7S0FDckQ7Q0FDRixDQUFBIn0=