"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfigurationRuleStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const configuration_1 = require("@mercurjs/configuration");
exports.createConfigurationRuleStep = (0, workflows_sdk_1.createStep)('create-configuration-rule', async (input, { container }) => {
    const service = container.resolve(configuration_1.CONFIGURATION_MODULE);
    const configuration_rule = await service.createConfigurationRules(input);
    return new workflows_sdk_1.StepResponse(configuration_rule, configuration_rule.id);
}, async (id, { container }) => {
    const service = container.resolve(configuration_1.CONFIGURATION_MODULE);
    await service.deleteConfigurationRules(id);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWNvbmZpZ3VyYXRpb24tcnVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvY29uZmlndXJhdGlvbi9zdGVwcy9jcmVhdGUtY29uZmlndXJhdGlvbi1ydWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQUE0RTtBQUU1RSwyREFBOEQ7QUFJakQsUUFBQSwyQkFBMkIsR0FBRyxJQUFBLDBCQUFVLEVBQ25ELDJCQUEyQixFQUMzQixLQUFLLEVBQUUsS0FBaUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDekQsTUFBTSxPQUFPLEdBQ1gsU0FBUyxDQUFDLE9BQU8sQ0FBNkIsb0NBQW9CLENBQUMsQ0FBQTtJQUVyRSxNQUFNLGtCQUFrQixHQUFHLE1BQU0sT0FBTyxDQUFDLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRXhFLE9BQU8sSUFBSSw0QkFBWSxDQUFDLGtCQUFrQixFQUFFLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBQ3BFLENBQUMsRUFDRCxLQUFLLEVBQUUsRUFBVSxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUNsQyxNQUFNLE9BQU8sR0FDWCxTQUFTLENBQUMsT0FBTyxDQUE2QixvQ0FBb0IsQ0FBQyxDQUFBO0lBQ3JFLE1BQU0sT0FBTyxDQUFDLHdCQUF3QixDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBQzVDLENBQUMsQ0FDRixDQUFBIn0=