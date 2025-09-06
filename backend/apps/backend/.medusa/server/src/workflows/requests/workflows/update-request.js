"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRequestWorkflow = void 0;
const core_flows_1 = require("@medusajs/medusa/core-flows");
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const steps_1 = require("../steps");
exports.updateRequestWorkflow = (0, workflows_sdk_1.createWorkflow)('update-request', function (input) {
    const request = (0, steps_1.updateRequestStep)(input);
    const requestUpdatedHook = (0, workflows_sdk_1.createHook)('requestUpdated', {
        id: input.id
    });
    (0, core_flows_1.emitEventStep)({
        eventName: (0, workflows_sdk_1.transform)(request, (request) => {
            return `requests.${request.type}.${request.status}`;
        }),
        data: request
    });
    return new workflows_sdk_1.WorkflowResponse(request, { hooks: [requestUpdatedHook] });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXJlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL3JlcXVlc3RzL3dvcmtmbG93cy91cGRhdGUtcmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0REFBMkQ7QUFDM0QsMkRBS2dDO0FBSWhDLG9DQUE0QztBQUUvQixRQUFBLHFCQUFxQixHQUFHLElBQUEsOEJBQWMsRUFDakQsZ0JBQWdCLEVBQ2hCLFVBQVUsS0FBdUI7SUFDL0IsTUFBTSxPQUFPLEdBQUcsSUFBQSx5QkFBaUIsRUFBQyxLQUFLLENBQUMsQ0FBQTtJQUV4QyxNQUFNLGtCQUFrQixHQUFHLElBQUEsMEJBQVUsRUFBQyxnQkFBZ0IsRUFBRTtRQUN0RCxFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUU7S0FDYixDQUFDLENBQUE7SUFFRixJQUFBLDBCQUFhLEVBQUM7UUFDWixTQUFTLEVBQUUsSUFBQSx5QkFBUyxFQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3hDLE9BQU8sWUFBWSxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUNyRCxDQUFDLENBQUM7UUFDRixJQUFJLEVBQUUsT0FBTztLQUNkLENBQUMsQ0FBQTtJQUNGLE9BQU8sSUFBSSxnQ0FBZ0IsQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUN2RSxDQUFDLENBQ0YsQ0FBQSJ9