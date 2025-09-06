"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptSellerCreationRequestWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const workflows_1 = require("../../seller/workflows");
const update_request_1 = require("./update-request");
exports.acceptSellerCreationRequestWorkflow = (0, workflows_sdk_1.createWorkflow)('accept-seller-creation-request', function (input) {
    const seller = workflows_1.createSellerWorkflow.runAsStep({
        input: {
            member: input.data.member,
            seller: input.data.seller,
            auth_identity_id: input.data.auth_identity_id
        }
    });
    update_request_1.updateRequestWorkflow.runAsStep({ input });
    return new workflows_sdk_1.WorkflowResponse(seller);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZXB0LXNlbGxlci1jcmVhdGlvbi1yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9yZXF1ZXN0cy93b3JrZmxvd3MvYWNjZXB0LXNlbGxlci1jcmVhdGlvbi1yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJEQUEwRTtBQUkxRSxzREFBNkQ7QUFDN0QscURBQXdEO0FBRTNDLFFBQUEsbUNBQW1DLEdBQUcsSUFBQSw4QkFBYyxFQUMvRCxnQ0FBZ0MsRUFDaEMsVUFBVSxLQUF1QjtJQUMvQixNQUFNLE1BQU0sR0FBRyxnQ0FBb0IsQ0FBQyxTQUFTLENBQUM7UUFDNUMsS0FBSyxFQUFFO1lBQ0wsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTTtZQUN6QixNQUFNLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNO1lBQ3pCLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsZ0JBQWdCO1NBQzlDO0tBQ0YsQ0FBQyxDQUFBO0lBRUYsc0NBQXFCLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtJQUMxQyxPQUFPLElBQUksZ0NBQWdCLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDckMsQ0FBQyxDQUNGLENBQUEifQ==