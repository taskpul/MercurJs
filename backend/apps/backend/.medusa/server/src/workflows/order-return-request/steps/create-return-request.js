"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderReturnRequestStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const order_return_request_1 = require("@mercurjs/order-return-request");
exports.createOrderReturnRequestStep = (0, workflows_sdk_1.createStep)('create-order-return-request', async (input, { container }) => {
    const service = container.resolve(order_return_request_1.ORDER_RETURN_MODULE);
    // @ts-expect-error Expects existing line item ids
    const request = await service.createOrderReturnRequests(input);
    return new workflows_sdk_1.StepResponse(request, request.id);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXJldHVybi1yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9vcmRlci1yZXR1cm4tcmVxdWVzdC9zdGVwcy9jcmVhdGUtcmV0dXJuLXJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUVBQTRFO0FBRzVFLHlFQUFvRTtBQUd2RCxRQUFBLDRCQUE0QixHQUFHLElBQUEsMEJBQVUsRUFDcEQsNkJBQTZCLEVBQzdCLEtBQUssRUFBRSxLQUFrQyxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUMxRCxNQUFNLE9BQU8sR0FDWCxTQUFTLENBQUMsT0FBTyxDQUEyQiwwQ0FBbUIsQ0FBQyxDQUFBO0lBRWxFLGtEQUFrRDtJQUNsRCxNQUFNLE9BQU8sR0FBRyxNQUFNLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUU5RCxPQUFPLElBQUksNEJBQVksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBQzlDLENBQUMsQ0FDRixDQUFBIn0=