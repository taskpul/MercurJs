"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSellerOnboardingStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const seller_1 = require("@mercurjs/seller");
exports.createSellerOnboardingStep = (0, workflows_sdk_1.createStep)('create-seller-onboarding', async (input, { container }) => {
    const service = container.resolve(seller_1.SELLER_MODULE);
    const onboarding = await service.createSellerOnboardings({
        seller_id: input.id
    });
    return new workflows_sdk_1.StepResponse(onboarding, onboarding.id);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXNlbGxlci1vbmJvYXJkaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9zZWxsZXIvc3RlcHMvY3JlYXRlLXNlbGxlci1vbmJvYXJkaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQUE0RTtBQUc1RSw2Q0FBcUU7QUFFeEQsUUFBQSwwQkFBMEIsR0FBRyxJQUFBLDBCQUFVLEVBQ2xELDBCQUEwQixFQUMxQixLQUFLLEVBQUUsS0FBZ0IsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDeEMsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBc0Isc0JBQWEsQ0FBQyxDQUFBO0lBRXJFLE1BQU0sVUFBVSxHQUFHLE1BQU0sT0FBTyxDQUFDLHVCQUF1QixDQUFDO1FBQ3ZELFNBQVMsRUFBRSxLQUFLLENBQUMsRUFBRTtLQUNwQixDQUFDLENBQUE7SUFFRixPQUFPLElBQUksNEJBQVksQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBQ3BELENBQUMsQ0FDRixDQUFBIn0=