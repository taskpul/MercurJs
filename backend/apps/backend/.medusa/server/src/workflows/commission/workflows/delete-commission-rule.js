"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommissionRuleWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const steps_1 = require("../steps");
exports.deleteCommissionRuleWorkflow = (0, workflows_sdk_1.createWorkflow)('delete-commission-rule', function (id) {
    return new workflows_sdk_1.WorkflowResponse((0, steps_1.deleteCommissionRuleStep)(id));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLWNvbW1pc3Npb24tcnVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvY29tbWlzc2lvbi93b3JrZmxvd3MvZGVsZXRlLWNvbW1pc3Npb24tcnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyREFBMEU7QUFFMUUsb0NBQW1EO0FBRXRDLFFBQUEsNEJBQTRCLEdBQUcsSUFBQSw4QkFBYyxFQUN4RCx3QkFBd0IsRUFDeEIsVUFBVSxFQUFVO0lBQ2xCLE9BQU8sSUFBSSxnQ0FBZ0IsQ0FBQyxJQUFBLGdDQUF3QixFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDM0QsQ0FBQyxDQUNGLENBQUEifQ==