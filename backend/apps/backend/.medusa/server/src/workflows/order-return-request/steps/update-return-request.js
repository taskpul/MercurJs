"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderReturnRequestStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const order_return_request_1 = require("@mercurjs/order-return-request");
exports.updateOrderReturnRequestStep = (0, workflows_sdk_1.createStep)('update-order-return-request', async (input, { container }) => {
    const service = container.resolve(order_return_request_1.ORDER_RETURN_MODULE);
    const previousData = await service.retrieveOrderReturnRequest(input.id);
    const request = await service.updateOrderReturnRequests(input);
    return new workflows_sdk_1.StepResponse(request[0], previousData);
}, async (previousData, { container }) => {
    const service = container.resolve(order_return_request_1.ORDER_RETURN_MODULE);
    // @ts-expect-error - incomplete type
    await service.updateOrderReturnRequests(previousData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXJldHVybi1yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9vcmRlci1yZXR1cm4tcmVxdWVzdC9zdGVwcy91cGRhdGUtcmV0dXJuLXJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUVBQTRFO0FBTzVFLHlFQUd1QztBQUUxQixRQUFBLDRCQUE0QixHQUFHLElBQUEsMEJBQVUsRUFDcEQsNkJBQTZCLEVBQzdCLEtBQUssRUFDSCxLQUEyRSxFQUMzRSxFQUFFLFNBQVMsRUFBRSxFQUNiLEVBQUU7SUFDRixNQUFNLE9BQU8sR0FDWCxTQUFTLENBQUMsT0FBTyxDQUEyQiwwQ0FBbUIsQ0FBQyxDQUFBO0lBRWxFLE1BQU0sWUFBWSxHQUFHLE1BQU0sT0FBTyxDQUFDLDBCQUEwQixDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUV2RSxNQUFNLE9BQU8sR0FDWCxNQUFNLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUVoRCxPQUFPLElBQUksNEJBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUE7QUFDbkQsQ0FBQyxFQUNELEtBQUssRUFBRSxZQUFtQyxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUMzRCxNQUFNLE9BQU8sR0FDWCxTQUFTLENBQUMsT0FBTyxDQUEyQiwwQ0FBbUIsQ0FBQyxDQUFBO0lBRWxFLHFDQUFxQztJQUNyQyxNQUFNLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxZQUFZLENBQUMsQ0FBQTtBQUN2RCxDQUFDLENBQ0YsQ0FBQSJ9