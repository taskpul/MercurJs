"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommissionRuleWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const steps_1 = require("../steps");
exports.createCommissionRuleWorkflow = (0, workflows_sdk_1.createWorkflow)('create-commission-rule', function (input) {
    (0, steps_1.checkForDuplicateStep)(input);
    return new workflows_sdk_1.WorkflowResponse((0, steps_1.createCommissionRuleStep)(input));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWNvbW1pc3Npb24tcnVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvY29tbWlzc2lvbi93b3JrZmxvd3MvY3JlYXRlLWNvbW1pc3Npb24tcnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyREFBMEU7QUFJMUUsb0NBQTBFO0FBRTdELFFBQUEsNEJBQTRCLEdBQUcsSUFBQSw4QkFBYyxFQUN4RCx3QkFBd0IsRUFDeEIsVUFBVSxLQUE4QjtJQUN0QyxJQUFBLDZCQUFxQixFQUFDLEtBQUssQ0FBQyxDQUFBO0lBRTVCLE9BQU8sSUFBSSxnQ0FBZ0IsQ0FBQyxJQUFBLGdDQUF3QixFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7QUFDOUQsQ0FBQyxDQUNGLENBQUEifQ==