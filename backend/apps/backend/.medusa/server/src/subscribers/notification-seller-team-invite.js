"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = sellerTeamInviteHandler;
const utils_1 = require("@medusajs/framework/utils");
const framework_1 = require("@mercurjs/framework");
const resend_1 = require("@mercurjs/resend");
const utils_2 = require("../shared/infra/http/utils");
async function sellerTeamInviteHandler({ event, container }) {
    const notificationService = container.resolve(utils_1.Modules.NOTIFICATION);
    const invite = event.data;
    await notificationService.createNotifications({
        to: invite.email,
        channel: 'email',
        template: resend_1.ResendNotificationTemplates.SELLER_TEAM_MEMBER_INVITATION,
        content: {
            subject: `You've been invited to join a team on Mercur`
        },
        data: {
            data: {
                user_name: invite.user_name,
                store_name: invite.store_name,
                host: (0, utils_2.buildInviteUrl)(invite.token).toString(),
                id: invite.id,
                email: invite.email
            }
        }
    });
}
exports.config = {
    event: framework_1.SellerTeamInviteEvent.CREATED,
    context: {
        subscriberId: 'seller-team-invite-handler'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLXNlbGxlci10ZWFtLWludml0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdWJzY3JpYmVycy9ub3RpZmljYXRpb24tc2VsbGVyLXRlYW0taW52aXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQVFBLDBDQThCQztBQXJDRCxxREFBbUQ7QUFFbkQsbURBQTJEO0FBQzNELDZDQUE4RDtBQUU5RCxzREFBMkQ7QUFFNUMsS0FBSyxVQUFVLHVCQUF1QixDQUFDLEVBQ3BELEtBQUssRUFDTCxTQUFTLEVBT1Q7SUFDQSxNQUFNLG1CQUFtQixHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsZUFBTyxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ25FLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUE7SUFFekIsTUFBTSxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQztRQUM1QyxFQUFFLEVBQUUsTUFBTSxDQUFDLEtBQUs7UUFDaEIsT0FBTyxFQUFFLE9BQU87UUFDaEIsUUFBUSxFQUFFLG9DQUEyQixDQUFDLDZCQUE2QjtRQUNuRSxPQUFPLEVBQUU7WUFDUCxPQUFPLEVBQUUsOENBQThDO1NBQ3hEO1FBQ0QsSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFO2dCQUNKLFNBQVMsRUFBRSxNQUFNLENBQUMsU0FBUztnQkFDM0IsVUFBVSxFQUFFLE1BQU0sQ0FBQyxVQUFVO2dCQUM3QixJQUFJLEVBQUUsSUFBQSxzQkFBYyxFQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUU7Z0JBQzdDLEVBQUUsRUFBRSxNQUFNLENBQUMsRUFBRTtnQkFDYixLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7YUFDcEI7U0FDRjtLQUNGLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFFWSxRQUFBLE1BQU0sR0FBcUI7SUFDdEMsS0FBSyxFQUFFLGlDQUFxQixDQUFDLE9BQU87SUFDcEMsT0FBTyxFQUFFO1FBQ1AsWUFBWSxFQUFFLDRCQUE0QjtLQUMzQztDQUNGLENBQUEifQ==