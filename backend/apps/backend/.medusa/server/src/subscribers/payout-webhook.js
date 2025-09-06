"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = payoutWebhookHandler;
const framework_1 = require("@mercurjs/framework");
const payout_1 = require("@mercurjs/payout");
const workflows_1 = require("../workflows/payout/workflows");
async function payoutWebhookHandler({ event, container }) {
    const payoutService = container.resolve(payout_1.PAYOUT_MODULE);
    const input = event.data;
    if (input.rawData?.type === 'Buffer') {
        input.rawData = Buffer.from(input.rawData.data);
    }
    const actionAndData = await payoutService.getWebhookActionAndData(input);
    if (!actionAndData) {
        return;
    }
    await (0, workflows_1.processPayoutWebhookActionWorkflow)(container).run({
        input: {
            action: actionAndData.action,
            data: actionAndData.data
        }
    });
}
exports.config = {
    event: framework_1.PayoutWebhookEvents.ACCOUNT_WEBHOOK_RECEIVED,
    context: {
        subscriberId: 'payout-account-webhook-handler'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5b3V0LXdlYmhvb2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc3Vic2NyaWJlcnMvcGF5b3V0LXdlYmhvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBZ0JBLHVDQTBCQztBQXhDRCxtREFHNEI7QUFDNUIsNkNBQWdEO0FBR2hELDZEQUFrRjtBQU9uRSxLQUFLLFVBQVUsb0JBQW9CLENBQUMsRUFDakQsS0FBSyxFQUNMLFNBQVMsRUFDa0M7SUFDM0MsTUFBTSxhQUFhLEdBQXdCLFNBQVMsQ0FBQyxPQUFPLENBQUMsc0JBQWEsQ0FBQyxDQUFBO0lBRTNFLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUE7SUFFeEIsSUFBSyxLQUFLLENBQUMsT0FBdUMsRUFBRSxJQUFJLEtBQUssUUFBUSxFQUFFLENBQUM7UUFDdEUsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUN4QixLQUFLLENBQUMsT0FBdUMsQ0FBQyxJQUFJLENBQ3BELENBQUE7SUFDSCxDQUFDO0lBRUQsTUFBTSxhQUFhLEdBQUcsTUFBTSxhQUFhLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFeEUsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ25CLE9BQU07SUFDUixDQUFDO0lBRUQsTUFBTSxJQUFBLDhDQUFrQyxFQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN0RCxLQUFLLEVBQUU7WUFDTCxNQUFNLEVBQUUsYUFBYSxDQUFDLE1BQU07WUFDNUIsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJO1NBQ3pCO0tBQ0YsQ0FBQyxDQUFBO0FBQ0osQ0FBQztBQUVZLFFBQUEsTUFBTSxHQUFxQjtJQUN0QyxLQUFLLEVBQUUsK0JBQW1CLENBQUMsd0JBQXdCO0lBQ25ELE9BQU8sRUFBRTtRQUNQLFlBQVksRUFBRSxnQ0FBZ0M7S0FDL0M7Q0FDRixDQUFBIn0=