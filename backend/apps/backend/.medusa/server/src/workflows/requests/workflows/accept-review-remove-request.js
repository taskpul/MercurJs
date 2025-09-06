"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptReviewRemoveRequestWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const workflows_1 = require("../../review/workflows");
const update_request_1 = require("./update-request");
exports.acceptReviewRemoveRequestWorkflow = (0, workflows_sdk_1.createWorkflow)('accept-review-remove-request', function (input) {
    const result = workflows_1.deleteReviewWorkflow.runAsStep({
        input: input.data.review_id
    });
    update_request_1.updateRequestWorkflow.runAsStep({ input });
    return new workflows_sdk_1.WorkflowResponse(result);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZXB0LXJldmlldy1yZW1vdmUtcmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvcmVxdWVzdHMvd29ya2Zsb3dzL2FjY2VwdC1yZXZpZXctcmVtb3ZlLXJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkRBQTBFO0FBSTFFLHNEQUE2RDtBQUM3RCxxREFBd0Q7QUFFM0MsUUFBQSxpQ0FBaUMsR0FBRyxJQUFBLDhCQUFjLEVBQzdELDhCQUE4QixFQUM5QixVQUFVLEtBQXVCO0lBQy9CLE1BQU0sTUFBTSxHQUFHLGdDQUFvQixDQUFDLFNBQVMsQ0FBQztRQUM1QyxLQUFLLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTO0tBQzVCLENBQUMsQ0FBQTtJQUVGLHNDQUFxQixDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7SUFDMUMsT0FBTyxJQUFJLGdDQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQ3JDLENBQUMsQ0FDRixDQUFBIn0=