"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = buyerAccountCreatedHandler;
const utils_1 = require("@medusajs/framework/utils");
const resend_1 = require("@mercurjs/resend");
async function buyerAccountCreatedHandler({ event, container }) {
    const notificationService = container.resolve(utils_1.Modules.NOTIFICATION);
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: [customer] } = await query.graph({
        entity: 'customer',
        fields: ['id', 'email', 'first_name', 'last_name'],
        filters: {
            id: event.data.id
        }
    });
    if (!customer) {
        console.error('Customer not found:', event.data.id);
        return;
    }
    await notificationService.createNotifications({
        to: customer.email,
        channel: 'email',
        template: resend_1.ResendNotificationTemplates.BUYER_ACCOUNT_CREATED,
        content: {
            subject: `Welcome to Mercur, ${customer.first_name || ''}!`
        },
        data: {
            data: {
                user_name: customer.first_name || 'Customer'
            }
        }
    });
}
exports.config = {
    event: 'customer.created',
    context: {
        subscriberId: 'buyer-account-created-handler'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLWJ1eWVyLWFjY291bnQtY3JlYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdWJzY3JpYmVycy9ub3RpZmljYXRpb24tYnV5ZXItYWNjb3VudC1jcmVhdGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUtBLDZDQW1DQztBQXZDRCxxREFBOEU7QUFFOUUsNkNBQThEO0FBRS9DLEtBQUssVUFBVSwwQkFBMEIsQ0FBQyxFQUN2RCxLQUFLLEVBQ0wsU0FBUyxFQUNzQjtJQUMvQixNQUFNLG1CQUFtQixHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsZUFBTyxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ25FLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFaEUsTUFBTSxFQUNKLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUNqQixHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztRQUNwQixNQUFNLEVBQUUsVUFBVTtRQUNsQixNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLENBQUM7UUFDbEQsT0FBTyxFQUFFO1lBQ1AsRUFBRSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtTQUNsQjtLQUNGLENBQUMsQ0FBQTtJQUVGLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMscUJBQXFCLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNuRCxPQUFNO0lBQ1IsQ0FBQztJQUVELE1BQU0sbUJBQW1CLENBQUMsbUJBQW1CLENBQUM7UUFDNUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxLQUFLO1FBQ2xCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLFFBQVEsRUFBRSxvQ0FBMkIsQ0FBQyxxQkFBcUI7UUFDM0QsT0FBTyxFQUFFO1lBQ1AsT0FBTyxFQUFFLHNCQUFzQixRQUFRLENBQUMsVUFBVSxJQUFJLEVBQUUsR0FBRztTQUM1RDtRQUNELElBQUksRUFBRTtZQUNKLElBQUksRUFBRTtnQkFDSixTQUFTLEVBQUUsUUFBUSxDQUFDLFVBQVUsSUFBSSxVQUFVO2FBQzdDO1NBQ0Y7S0FDRixDQUFDLENBQUE7QUFDSixDQUFDO0FBRVksUUFBQSxNQUFNLEdBQXFCO0lBQ3RDLEtBQUssRUFBRSxrQkFBa0I7SUFDekIsT0FBTyxFQUFFO1FBQ1AsWUFBWSxFQUFFLCtCQUErQjtLQUM5QztDQUNGLENBQUEifQ==