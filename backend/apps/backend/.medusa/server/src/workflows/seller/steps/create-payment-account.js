"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPayoutAccountStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const payout_1 = require("@mercurjs/payout");
exports.createPayoutAccountStep = (0, workflows_sdk_1.createStep)('create-payout-account', async (input, { container }) => {
    const service = container.resolve(payout_1.PAYOUT_MODULE);
    const payoutAccount = await service.createPayoutAccount(input);
    return new workflows_sdk_1.StepResponse(payoutAccount, payoutAccount.id);
}, async (id, { container }) => {
    if (!id) {
        return;
    }
    const service = container.resolve(payout_1.PAYOUT_MODULE);
    await service.deletePayoutAccounts(id);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXBheW1lbnQtYWNjb3VudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3Mvc2VsbGVyL3N0ZXBzL2NyZWF0ZS1wYXltZW50LWFjY291bnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUVBQTRFO0FBRzVFLDZDQUFnRDtBQUduQyxRQUFBLHVCQUF1QixHQUFHLElBQUEsMEJBQVUsRUFDL0MsdUJBQXVCLEVBQ3ZCLEtBQUssRUFBRSxLQUE2QixFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUNyRCxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFzQixzQkFBYSxDQUFDLENBQUE7SUFFckUsTUFBTSxhQUFhLEdBQUcsTUFBTSxPQUFPLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFOUQsT0FBTyxJQUFJLDRCQUFZLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUMxRCxDQUFDLEVBQ0QsS0FBSyxFQUFFLEVBQVUsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDbEMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ1IsT0FBTTtJQUNSLENBQUM7SUFFRCxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFzQixzQkFBYSxDQUFDLENBQUE7SUFFckUsTUFBTSxPQUFPLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDLENBQUE7QUFDeEMsQ0FBQyxDQUNGLENBQUEifQ==