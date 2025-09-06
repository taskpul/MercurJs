"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSellerCreationRequestWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const framework_1 = require("@mercurjs/framework");
const steps_1 = require("../../common/steps");
const steps_2 = require("../steps");
exports.createSellerCreationRequestWorkflow = (0, workflows_sdk_1.createWorkflow)('create-seller-creation-request', function (input) {
    const request = (0, steps_2.createRequestStep)(input);
    (0, steps_1.emitMultipleEventsStep)([
        {
            name: framework_1.SellerRequest.CREATED,
            data: input
        },
        {
            name: framework_1.RequestUpdated.CREATED,
            data: input
        }
    ]);
    return new workflows_sdk_1.WorkflowResponse(request);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXNlbGxlci1jcmVhdGlvbi1yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9yZXF1ZXN0cy93b3JrZmxvd3MvY3JlYXRlLXNlbGxlci1jcmVhdGlvbi1yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJEQUEwRTtBQUUxRSxtREFJNEI7QUFFNUIsOENBQTJEO0FBQzNELG9DQUE0QztBQUUvQixRQUFBLG1DQUFtQyxHQUFHLElBQUEsOEJBQWMsRUFDL0QsZ0NBQWdDLEVBQ2hDLFVBQVUsS0FBdUI7SUFDL0IsTUFBTSxPQUFPLEdBQUcsSUFBQSx5QkFBaUIsRUFBQyxLQUFLLENBQUMsQ0FBQTtJQUV4QyxJQUFBLDhCQUFzQixFQUFDO1FBQ3JCO1lBQ0UsSUFBSSxFQUFFLHlCQUFhLENBQUMsT0FBTztZQUMzQixJQUFJLEVBQUUsS0FBSztTQUNaO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsMEJBQWMsQ0FBQyxPQUFPO1lBQzVCLElBQUksRUFBRSxLQUFLO1NBQ1o7S0FDRixDQUFDLENBQUE7SUFDRixPQUFPLElBQUksZ0NBQWdCLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDdEMsQ0FBQyxDQUNGLENBQUEifQ==