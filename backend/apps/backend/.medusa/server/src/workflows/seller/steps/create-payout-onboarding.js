"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPayoutOnboardingStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const payout_1 = require("@mercurjs/payout");
exports.createPayoutOnboardingStep = (0, workflows_sdk_1.createStep)('create-payout-onboarding', async (input, { container }) => {
    const service = container.resolve(payout_1.PAYOUT_MODULE);
    const onboarding = await service.initializeOnboarding(input);
    return new workflows_sdk_1.StepResponse(onboarding, onboarding.id);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXBheW91dC1vbmJvYXJkaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9zZWxsZXIvc3RlcHMvY3JlYXRlLXBheW91dC1vbmJvYXJkaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQUE0RTtBQUc1RSw2Q0FBZ0Q7QUFHbkMsUUFBQSwwQkFBMEIsR0FBRyxJQUFBLDBCQUFVLEVBQ2xELDBCQUEwQixFQUMxQixLQUFLLEVBQUUsS0FBMEIsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDbEQsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBc0Isc0JBQWEsQ0FBQyxDQUFBO0lBRXJFLE1BQU0sVUFBVSxHQUFHLE1BQU0sT0FBTyxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRTVELE9BQU8sSUFBSSw0QkFBWSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUE7QUFDcEQsQ0FBQyxDQUNGLENBQUEifQ==