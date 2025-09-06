"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderReturnRequestWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const steps_1 = require("../steps");
const proceed_return_request_1 = require("./proceed-return-request");
exports.updateOrderReturnRequestWorkflow = (0, workflows_sdk_1.createWorkflow)('update-order-return-request', function (input) {
    (0, workflows_sdk_1.when)(input, (input) => input.status === 'refunded').then(() => {
        proceed_return_request_1.proceedReturnRequestWorkflow.runAsStep({ input });
    });
    const request = (0, steps_1.updateOrderReturnRequestStep)(input);
    const orderReturnRequestUpdatedHook = (0, workflows_sdk_1.createHook)('orderReturnRequestUpdated', {
        requestId: request.id
    });
    return new workflows_sdk_1.WorkflowResponse(request, {
        hooks: [orderReturnRequestUpdatedHook]
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXJldHVybi1yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9vcmRlci1yZXR1cm4tcmVxdWVzdC93b3JrZmxvd3MvdXBkYXRlLXJldHVybi1yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQUswQztBQU8xQyxvQ0FBdUQ7QUFDdkQscUVBQXVFO0FBRTFELFFBQUEsZ0NBQWdDLEdBQUcsSUFBQSw4QkFBYyxFQUM1RCw2QkFBNkIsRUFDN0IsVUFDRSxLQUEyRTtJQUUzRSxJQUFBLG9CQUFJLEVBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFDNUQscURBQTRCLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtJQUNuRCxDQUFDLENBQUMsQ0FBQTtJQUVGLE1BQU0sT0FBTyxHQUFHLElBQUEsb0NBQTRCLEVBQUMsS0FBSyxDQUFDLENBQUE7SUFDbkQsTUFBTSw2QkFBNkIsR0FBRyxJQUFBLDBCQUFVLEVBQzlDLDJCQUEyQixFQUMzQjtRQUNFLFNBQVMsRUFBRSxPQUFPLENBQUMsRUFBRTtLQUN0QixDQUNGLENBQUE7SUFFRCxPQUFPLElBQUksZ0NBQWdCLENBQUMsT0FBTyxFQUFFO1FBQ25DLEtBQUssRUFBRSxDQUFDLDZCQUE2QixDQUFDO0tBQ3ZDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FDRixDQUFBIn0=