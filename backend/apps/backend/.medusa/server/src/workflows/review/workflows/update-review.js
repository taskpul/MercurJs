"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReviewWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const framework_1 = require("@mercurjs/framework");
const steps_1 = require("../steps");
exports.updateReviewWorkflow = (0, workflows_sdk_1.createWorkflow)({
    name: 'update-review'
}, function (input) {
    const review = (0, steps_1.updateReviewStep)(input);
    (0, core_flows_1.emitEventStep)({
        eventName: framework_1.AlgoliaEvents.REVIEW_CHANGED,
        data: { review }
    });
    return new workflows_sdk_1.WorkflowResponse(review);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXJldmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvcmV2aWV3L3dvcmtmbG93cy91cGRhdGUtcmV2aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQUcwQztBQUMxQyw0REFBMkQ7QUFFM0QsbURBQW9FO0FBRXBFLG9DQUEyQztBQUU5QixRQUFBLG9CQUFvQixHQUFHLElBQUEsOEJBQWMsRUFDaEQ7SUFDRSxJQUFJLEVBQUUsZUFBZTtDQUN0QixFQUNELFVBQVUsS0FBc0I7SUFDOUIsTUFBTSxNQUFNLEdBQUcsSUFBQSx3QkFBZ0IsRUFBQyxLQUFLLENBQUMsQ0FBQTtJQUN0QyxJQUFBLDBCQUFhLEVBQUM7UUFDWixTQUFTLEVBQUUseUJBQWEsQ0FBQyxjQUFjO1FBQ3ZDLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRTtLQUNqQixDQUFDLENBQUE7SUFDRixPQUFPLElBQUksZ0NBQWdCLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDckMsQ0FBQyxDQUNGLENBQUEifQ==