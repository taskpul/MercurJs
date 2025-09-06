"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReviewWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const steps_1 = require("../steps");
exports.deleteReviewWorkflow = (0, workflows_sdk_1.createWorkflow)({
    name: 'delete-review'
}, function (id) {
    return new workflows_sdk_1.WorkflowResponse((0, steps_1.deleteReviewStep)(id));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLXJldmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvcmV2aWV3L3dvcmtmbG93cy9kZWxldGUtcmV2aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQUcwQztBQUUxQyxvQ0FBMkM7QUFFOUIsUUFBQSxvQkFBb0IsR0FBRyxJQUFBLDhCQUFjLEVBQ2hEO0lBQ0UsSUFBSSxFQUFFLGVBQWU7Q0FDdEIsRUFDRCxVQUFVLEVBQVU7SUFDbEIsT0FBTyxJQUFJLGdDQUFnQixDQUFDLElBQUEsd0JBQWdCLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUNuRCxDQUFDLENBQ0YsQ0FBQSJ9