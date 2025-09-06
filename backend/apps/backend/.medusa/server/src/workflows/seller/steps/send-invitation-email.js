"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSellerInvitationEmailStep = void 0;
const utils_1 = require("@medusajs/framework/utils");
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const resend_1 = require("@mercurjs/resend");
const hosts_1 = require("../../../shared/infra/http/utils/hosts");
exports.sendSellerInvitationEmailStep = (0, workflows_sdk_1.createStep)('send-seller-invitation-email', async (input, { container }) => {
    const service = container.resolve(utils_1.Modules.NOTIFICATION);
    const logger = container.resolve(utils_1.ContainerRegistrationKeys.LOGGER);
    try {
        const notification = await service.createNotifications({
            channel: 'email',
            to: input.email,
            template: resend_1.ResendNotificationTemplates.NEW_SELLER_INVITATION,
            content: {
                subject: `You've been invited to join Mercur`
            },
            data: {
                data: {
                    url: (0, hosts_1.buildHostAddress)(hosts_1.Hosts.VENDOR_PANEL, '/register')
                }
            }
        });
        return new workflows_sdk_1.StepResponse(notification);
    }
    catch (e) {
        logger.error(e);
        throw new utils_1.MedusaError(utils_1.MedusaError.Types.UNEXPECTED_STATE, 'Notification provider failed!');
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZC1pbnZpdGF0aW9uLWVtYWlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9zZWxsZXIvc3RlcHMvc2VuZC1pbnZpdGF0aW9uLWVtYWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFEQUlrQztBQUNsQyxxRUFBNEU7QUFHNUUsNkNBQThEO0FBRTlELGtFQUFnRjtBQUVuRSxRQUFBLDZCQUE2QixHQUFHLElBQUEsMEJBQVUsRUFDckQsOEJBQThCLEVBQzlCLEtBQUssRUFBRSxLQUFnQyxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUN4RCxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGVBQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUN2RCxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBRWxFLElBQUksQ0FBQztRQUNILE1BQU0sWUFBWSxHQUFHLE1BQU0sT0FBTyxDQUFDLG1CQUFtQixDQUFDO1lBQ3JELE9BQU8sRUFBRSxPQUFPO1lBQ2hCLEVBQUUsRUFBRSxLQUFLLENBQUMsS0FBSztZQUNmLFFBQVEsRUFBRSxvQ0FBMkIsQ0FBQyxxQkFBcUI7WUFDM0QsT0FBTyxFQUFFO2dCQUNQLE9BQU8sRUFBRSxvQ0FBb0M7YUFDOUM7WUFDRCxJQUFJLEVBQUU7Z0JBQ0osSUFBSSxFQUFFO29CQUNKLEdBQUcsRUFBRSxJQUFBLHdCQUFnQixFQUFDLGFBQUssQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDO2lCQUN2RDthQUNGO1NBQ0YsQ0FBQyxDQUFBO1FBRUYsT0FBTyxJQUFJLDRCQUFZLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDdkMsQ0FBQztJQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDWCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2YsTUFBTSxJQUFJLG1CQUFXLENBQ25CLG1CQUFXLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUNsQywrQkFBK0IsQ0FDaEMsQ0FBQTtJQUNILENBQUM7QUFDSCxDQUFDLENBQ0YsQ0FBQSJ9