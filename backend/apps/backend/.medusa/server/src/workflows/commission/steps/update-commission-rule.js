"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCommissionRuleStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const commission_1 = require("@mercurjs/commission");
exports.updateCommissionRuleStep = (0, workflows_sdk_1.createStep)('update-commission-rule', async (input, { container }) => {
    const service = container.resolve(commission_1.COMMISSION_MODULE);
    const previousData = await service.retrieveCommissionRule(input.id);
    //@ts-ignore
    const updatedCommissionRule = await service.updateCommissionRules(input);
    return new workflows_sdk_1.StepResponse(updatedCommissionRule, previousData);
}, async (previousData, { container }) => {
    const service = container.resolve(commission_1.COMMISSION_MODULE);
    //@ts-ignore
    await service.updateCommissionRules(previousData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWNvbW1pc3Npb24tcnVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvY29tbWlzc2lvbi9zdGVwcy91cGRhdGUtY29tbWlzc2lvbi1ydWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQUE0RTtBQUU1RSxxREFBd0Q7QUFJM0MsUUFBQSx3QkFBd0IsR0FBRyxJQUFBLDBCQUFVLEVBQ2hELHdCQUF3QixFQUN4QixLQUFLLEVBQUUsS0FBOEIsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDdEQsTUFBTSxPQUFPLEdBQ1gsU0FBUyxDQUFDLE9BQU8sQ0FBMEIsOEJBQWlCLENBQUMsQ0FBQTtJQUUvRCxNQUFNLFlBQVksR0FDaEIsTUFBTSxPQUFPLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBRWhELFlBQVk7SUFDWixNQUFNLHFCQUFxQixHQUFHLE1BQU0sT0FBTyxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRXhFLE9BQU8sSUFBSSw0QkFBWSxDQUFDLHFCQUFxQixFQUFFLFlBQVksQ0FBQyxDQUFBO0FBQzlELENBQUMsRUFDRCxLQUFLLEVBQUUsWUFBK0IsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDdkQsTUFBTSxPQUFPLEdBQ1gsU0FBUyxDQUFDLE9BQU8sQ0FBMEIsOEJBQWlCLENBQUMsQ0FBQTtJQUUvRCxZQUFZO0lBQ1osTUFBTSxPQUFPLENBQUMscUJBQXFCLENBQUMsWUFBWSxDQUFDLENBQUE7QUFDbkQsQ0FBQyxDQUNGLENBQUEifQ==