"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePayoutAccountStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const payout_1 = require("@mercurjs/payout");
exports.updatePayoutAccountStep = (0, workflows_sdk_1.createStep)('update-payout-account', async (input, { container }) => {
    const service = container.resolve(payout_1.PAYOUT_MODULE);
    const previousData = await service.retrievePayoutAccount(input.id);
    const updatedAccount = await service.updatePayoutAccounts(input);
    return new workflows_sdk_1.StepResponse(updatedAccount, previousData);
}, async (previousData, { container }) => {
    const service = container.resolve(payout_1.PAYOUT_MODULE);
    await service.updatePayoutAccounts(previousData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXBheW91dC1hY2NvdW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9wYXlvdXQvc3RlcHMvdXBkYXRlLXBheW91dC1hY2NvdW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQUE0RTtBQUc1RSw2Q0FBZ0Q7QUFHbkMsUUFBQSx1QkFBdUIsR0FBRyxJQUFBLDBCQUFVLEVBQy9DLHVCQUF1QixFQUN2QixLQUFLLEVBQUUsS0FBNkIsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDckQsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBc0Isc0JBQWEsQ0FBQyxDQUFBO0lBRXJFLE1BQU0sWUFBWSxHQUFHLE1BQU0sT0FBTyxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUVsRSxNQUFNLGNBQWMsR0FDbEIsTUFBTSxPQUFPLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFM0MsT0FBTyxJQUFJLDRCQUFZLENBQUMsY0FBYyxFQUFFLFlBQVksQ0FBQyxDQUFBO0FBQ3ZELENBQUMsRUFDRCxLQUFLLEVBQUUsWUFBOEIsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDdEQsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBc0Isc0JBQWEsQ0FBQyxDQUFBO0lBRXJFLE1BQU0sT0FBTyxDQUFDLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxDQUFBO0FBQ2xELENBQUMsQ0FDRixDQUFBIn0=