"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = passwordResetHandler;
const utils_1 = require("@medusajs/framework/utils");
const resend_1 = require("@mercurjs/resend");
const hosts_1 = require("../shared/infra/http/utils/hosts");
async function passwordResetHandler({ event, container }) {
    const notificationService = container.resolve(utils_1.Modules.NOTIFICATION);
    const hostType = hosts_1.actorTypeToHost[event.data.actor_type];
    if (!hostType) {
        return;
    }
    await notificationService.createNotifications({
        to: event.data.entity_id,
        channel: 'email',
        template: resend_1.ResendNotificationTemplates.FORGOT_PASSWORD,
        content: {
            subject: 'Mercur - Reset password request'
        },
        data: {
            data: {
                url: (0, hosts_1.buildResetPasswordUrl)(hostType, event.data.token).toString()
            }
        }
    });
}
exports.config = {
    event: utils_1.AuthWorkflowEvents.PASSWORD_RESET,
    context: {
        subscriberId: 'password-reset-handler'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLWFsbC1wYXNzd29yZC1yZXNldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdWJzY3JpYmVycy9ub3RpZmljYXRpb24tYWxsLXBhc3N3b3JkLXJlc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQVVBLHVDQXdCQztBQWpDRCxxREFBdUU7QUFFdkUsNkNBQThEO0FBRTlELDREQUd5QztBQUUxQixLQUFLLFVBQVUsb0JBQW9CLENBQUMsRUFDakQsS0FBSyxFQUNMLFNBQVMsRUFDZ0U7SUFDekUsTUFBTSxtQkFBbUIsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGVBQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUVuRSxNQUFNLFFBQVEsR0FBRyx1QkFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDdkQsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2QsT0FBTTtJQUNSLENBQUM7SUFFRCxNQUFNLG1CQUFtQixDQUFDLG1CQUFtQixDQUFDO1FBQzVDLEVBQUUsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVM7UUFDeEIsT0FBTyxFQUFFLE9BQU87UUFDaEIsUUFBUSxFQUFFLG9DQUEyQixDQUFDLGVBQWU7UUFDckQsT0FBTyxFQUFFO1lBQ1AsT0FBTyxFQUFFLGlDQUFpQztTQUMzQztRQUNELElBQUksRUFBRTtZQUNKLElBQUksRUFBRTtnQkFDSixHQUFHLEVBQUUsSUFBQSw2QkFBcUIsRUFBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUU7YUFDbEU7U0FDRjtLQUNGLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFFWSxRQUFBLE1BQU0sR0FBcUI7SUFDdEMsS0FBSyxFQUFFLDBCQUFrQixDQUFDLGNBQWM7SUFDeEMsT0FBTyxFQUFFO1FBQ1AsWUFBWSxFQUFFLHdCQUF3QjtLQUN2QztDQUNGLENBQUEifQ==