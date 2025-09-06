"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRequestWorkflow = void 0;
const core_flows_1 = require("@medusajs/medusa/core-flows");
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const framework_1 = require("@mercurjs/framework");
const requests_1 = require("@mercurjs/requests");
const seller_1 = require("@mercurjs/seller");
const steps_1 = require("../steps");
exports.createRequestWorkflow = (0, workflows_sdk_1.createWorkflow)('create-request', function (input) {
    const request = (0, steps_1.createRequestStep)(input.data);
    const link = (0, workflows_sdk_1.transform)({ request, input }, ({ request, input }) => {
        return [
            {
                [seller_1.SELLER_MODULE]: {
                    seller_id: input.seller_id
                },
                [requests_1.REQUESTS_MODULE]: {
                    request_id: request[0].id
                }
            }
        ];
    });
    (0, core_flows_1.createRemoteLinkStep)(link);
    (0, core_flows_1.emitEventStep)({
        eventName: framework_1.RequestUpdated.CREATED,
        data: input.data
    });
    const requestCreatedHook = (0, workflows_sdk_1.createHook)('requestCreated', {
        requestId: request[0].id,
        sellerId: input.seller_id
    });
    return new workflows_sdk_1.WorkflowResponse(request, {
        hooks: [requestCreatedHook]
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXJlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL3JlcXVlc3RzL3dvcmtmbG93cy9jcmVhdGUtcmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0REFHb0M7QUFDcEMsMkRBS2dDO0FBRWhDLG1EQUFzRTtBQUN0RSxpREFBb0Q7QUFDcEQsNkNBQWdEO0FBRWhELG9DQUE0QztBQUUvQixRQUFBLHFCQUFxQixHQUFHLElBQUEsOEJBQWMsRUFDakQsZ0JBQWdCLEVBQ2hCLFVBQVUsS0FBb0Q7SUFDNUQsTUFBTSxPQUFPLEdBQUcsSUFBQSx5QkFBaUIsRUFBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7SUFFN0MsTUFBTSxJQUFJLEdBQUcsSUFBQSx5QkFBUyxFQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRTtRQUNoRSxPQUFPO1lBQ0w7Z0JBQ0UsQ0FBQyxzQkFBYSxDQUFDLEVBQUU7b0JBQ2YsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTO2lCQUMzQjtnQkFDRCxDQUFDLDBCQUFlLENBQUMsRUFBRTtvQkFDakIsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2lCQUMxQjthQUNGO1NBQ0YsQ0FBQTtJQUNILENBQUMsQ0FBQyxDQUFBO0lBRUYsSUFBQSxpQ0FBb0IsRUFBQyxJQUFJLENBQUMsQ0FBQTtJQUUxQixJQUFBLDBCQUFhLEVBQUM7UUFDWixTQUFTLEVBQUUsMEJBQWMsQ0FBQyxPQUFPO1FBQ2pDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTtLQUNqQixDQUFDLENBQUE7SUFFRixNQUFNLGtCQUFrQixHQUFHLElBQUEsMEJBQVUsRUFBQyxnQkFBZ0IsRUFBRTtRQUN0RCxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDeEIsUUFBUSxFQUFFLEtBQUssQ0FBQyxTQUFTO0tBQzFCLENBQUMsQ0FBQTtJQUNGLE9BQU8sSUFBSSxnQ0FBZ0IsQ0FBQyxPQUFPLEVBQUU7UUFDbkMsS0FBSyxFQUFFLENBQUMsa0JBQWtCLENBQUM7S0FDNUIsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUNGLENBQUEifQ==