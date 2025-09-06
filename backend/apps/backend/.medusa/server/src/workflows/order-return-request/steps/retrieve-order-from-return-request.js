"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveOrderFromReturnRequestStep = void 0;
const utils_1 = require("@medusajs/framework/utils");
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const return_request_order_1 = __importDefault(require("../../../links/return-request-order"));
exports.retrieveOrderFromReturnRequestStep = (0, workflows_sdk_1.createStep)('retrieve-order-from-return-request', async (request, { container }) => {
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: [{ order_id, order_return_request }] } = await query.graph({
        entity: return_request_order_1.default.entryPoint,
        fields: [
            'order_id',
            'order_return_request.*',
            'order_return_request.line_items.*',
            'order_return_request.seller.id'
        ],
        filters: {
            order_return_request_id: request.id
        }
    });
    return new workflows_sdk_1.StepResponse({
        order_id,
        order_return_request
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV0cmlldmUtb3JkZXItZnJvbS1yZXR1cm4tcmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3Mvb3JkZXItcmV0dXJuLXJlcXVlc3Qvc3RlcHMvcmV0cmlldmUtb3JkZXItZnJvbS1yZXR1cm4tcmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxxREFBcUU7QUFDckUscUVBQTRFO0FBTzVFLCtGQUFvRTtBQUV2RCxRQUFBLGtDQUFrQyxHQUFHLElBQUEsMEJBQVUsRUFDMUQsb0NBQW9DLEVBQ3BDLEtBQUssRUFDSCxPQUVvQyxFQUNwQyxFQUFFLFNBQVMsRUFBRSxFQUNiLEVBQUU7SUFDRixNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2hFLE1BQU0sRUFDSixJQUFJLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLEVBQzNDLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ3BCLE1BQU0sRUFBRSw4QkFBa0IsQ0FBQyxVQUFVO1FBQ3JDLE1BQU0sRUFBRTtZQUNOLFVBQVU7WUFDVix3QkFBd0I7WUFDeEIsbUNBQW1DO1lBQ25DLGdDQUFnQztTQUNqQztRQUNELE9BQU8sRUFBRTtZQUNQLHVCQUF1QixFQUFFLE9BQU8sQ0FBQyxFQUFFO1NBQ3BDO0tBQ0YsQ0FBQyxDQUFBO0lBRUYsT0FBTyxJQUFJLDRCQUFZLENBQUM7UUFDdEIsUUFBUTtRQUNSLG9CQUFvQjtLQUNyQixDQUFDLENBQUE7QUFDSixDQUFDLENBQ0YsQ0FBQSJ9