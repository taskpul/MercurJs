"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommissionRuleStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const commission_1 = require("@mercurjs/commission");
exports.deleteCommissionRuleStep = (0, workflows_sdk_1.createStep)('delete-commission-rule', async (id, { container }) => {
    const service = container.resolve(commission_1.COMMISSION_MODULE);
    await service.softDeleteCommissionRules(id);
    return new workflows_sdk_1.StepResponse(id);
}, async (id, { container }) => {
    const service = container.resolve(commission_1.COMMISSION_MODULE);
    await service.restoreCommissionRules(id);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLWNvbW1pc3Npb24tcnVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvY29tbWlzc2lvbi9zdGVwcy9kZWxldGUtY29tbWlzc2lvbi1ydWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQUE0RTtBQUU1RSxxREFBd0Q7QUFHM0MsUUFBQSx3QkFBd0IsR0FBRyxJQUFBLDBCQUFVLEVBQ2hELHdCQUF3QixFQUN4QixLQUFLLEVBQUUsRUFBVSxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUNsQyxNQUFNLE9BQU8sR0FDWCxTQUFTLENBQUMsT0FBTyxDQUEwQiw4QkFBaUIsQ0FBQyxDQUFBO0lBRS9ELE1BQU0sT0FBTyxDQUFDLHlCQUF5QixDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBRTNDLE9BQU8sSUFBSSw0QkFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBQzdCLENBQUMsRUFDRCxLQUFLLEVBQUUsRUFBVSxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUNsQyxNQUFNLE9BQU8sR0FDWCxTQUFTLENBQUMsT0FBTyxDQUEwQiw4QkFBaUIsQ0FBQyxDQUFBO0lBRS9ELE1BQU0sT0FBTyxDQUFDLHNCQUFzQixDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBQzFDLENBQUMsQ0FDRixDQUFBIn0=