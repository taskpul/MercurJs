"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderReturnRequestWorkflow = void 0;
const utils_1 = require("@medusajs/framework/utils");
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const order_return_request_1 = require("@mercurjs/order-return-request");
const seller_1 = require("@mercurjs/seller");
const steps_1 = require("../steps");
exports.createOrderReturnRequestWorkflow = (0, workflows_sdk_1.createWorkflow)('create-order-return-request', function (input) {
    (0, steps_1.validateOrderReturnRequestStep)(input.data);
    const request = (0, steps_1.createOrderReturnRequestStep)(input.data);
    const requestId = (0, workflows_sdk_1.transform)({ request }, ({ request }) => request.id);
    (0, core_flows_1.createRemoteLinkStep)([
        {
            [seller_1.SELLER_MODULE]: {
                seller_id: input.seller_id
            },
            [order_return_request_1.ORDER_RETURN_MODULE]: {
                order_return_request_id: requestId
            }
        },
        {
            [order_return_request_1.ORDER_RETURN_MODULE]: {
                order_return_request_id: requestId
            },
            [utils_1.Modules.ORDER]: {
                order_id: input.data.order_id
            }
        }
    ]);
    const orderReturnRequestCreatedHook = (0, workflows_sdk_1.createHook)('orderReturnRequestCreated', {
        requestId: request.id
    });
    return new workflows_sdk_1.WorkflowResponse(request, {
        hooks: [orderReturnRequestCreatedHook]
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXJldHVybi1yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9vcmRlci1yZXR1cm4tcmVxdWVzdC93b3JrZmxvd3MvY3JlYXRlLXJldHVybi1yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFEQUFtRDtBQUNuRCxxRUFLMEM7QUFDMUMsNERBQWtFO0FBR2xFLHlFQUFvRTtBQUNwRSw2Q0FBZ0Q7QUFFaEQsb0NBR2lCO0FBRUosUUFBQSxnQ0FBZ0MsR0FBRyxJQUFBLDhCQUFjLEVBQzVELDZCQUE2QixFQUM3QixVQUFVLEtBQStEO0lBQ3ZFLElBQUEsc0NBQThCLEVBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzFDLE1BQU0sT0FBTyxHQUFHLElBQUEsb0NBQTRCLEVBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3hELE1BQU0sU0FBUyxHQUFHLElBQUEseUJBQVMsRUFBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBRXJFLElBQUEsaUNBQW9CLEVBQUM7UUFDbkI7WUFDRSxDQUFDLHNCQUFhLENBQUMsRUFBRTtnQkFDZixTQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVM7YUFDM0I7WUFDRCxDQUFDLDBDQUFtQixDQUFDLEVBQUU7Z0JBQ3JCLHVCQUF1QixFQUFFLFNBQVM7YUFDbkM7U0FDRjtRQUNEO1lBQ0UsQ0FBQywwQ0FBbUIsQ0FBQyxFQUFFO2dCQUNyQix1QkFBdUIsRUFBRSxTQUFTO2FBQ25DO1lBQ0QsQ0FBQyxlQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2YsUUFBUSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUTthQUM5QjtTQUNGO0tBQ0YsQ0FBQyxDQUFBO0lBRUYsTUFBTSw2QkFBNkIsR0FBRyxJQUFBLDBCQUFVLEVBQzlDLDJCQUEyQixFQUMzQjtRQUNFLFNBQVMsRUFBRSxPQUFPLENBQUMsRUFBRTtLQUN0QixDQUNGLENBQUE7SUFFRCxPQUFPLElBQUksZ0NBQWdCLENBQUMsT0FBTyxFQUFFO1FBQ25DLEtBQUssRUFBRSxDQUFDLDZCQUE2QixDQUFDO0tBQ3ZDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FDRixDQUFBIn0=