"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptProductRequestWorkflow = void 0;
const core_flows_1 = require("@medusajs/medusa/core-flows");
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const update_request_1 = require("./update-request");
exports.acceptProductRequestWorkflow = (0, workflows_sdk_1.createWorkflow)('accept-product-request', function (input) {
    const product = core_flows_1.updateProductsWorkflow.runAsStep({
        input: {
            selector: { id: input.data.product_id },
            update: { status: 'published' }
        }
    });
    update_request_1.updateRequestWorkflow.runAsStep({ input });
    return new workflows_sdk_1.WorkflowResponse(product);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZXB0LXByb2R1Y3QtcmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvcmVxdWVzdHMvd29ya2Zsb3dzL2FjY2VwdC1wcm9kdWN0LXJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNERBQW9FO0FBQ3BFLDJEQUEwRTtBQUkxRSxxREFBd0Q7QUFFM0MsUUFBQSw0QkFBNEIsR0FBRyxJQUFBLDhCQUFjLEVBQ3hELHdCQUF3QixFQUN4QixVQUFVLEtBQXVCO0lBQy9CLE1BQU0sT0FBTyxHQUFHLG1DQUFzQixDQUFDLFNBQVMsQ0FBQztRQUMvQyxLQUFLLEVBQUU7WUFDTCxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDdkMsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRTtTQUNoQztLQUNGLENBQUMsQ0FBQTtJQUVGLHNDQUFxQixDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7SUFDMUMsT0FBTyxJQUFJLGdDQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQ3RDLENBQUMsQ0FDRixDQUFBIn0=