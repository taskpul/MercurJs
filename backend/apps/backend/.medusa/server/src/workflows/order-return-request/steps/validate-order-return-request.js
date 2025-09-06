"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOrderReturnRequestStep = void 0;
const utils_1 = require("@medusajs/framework/utils");
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const return_request_order_1 = __importDefault(require("../../../links/return-request-order"));
exports.validateOrderReturnRequestStep = (0, workflows_sdk_1.createStep)('validate-order-return-request', async (input, { container }) => {
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: [returnRequest] } = await query.graph({
        entity: return_request_order_1.default.entryPoint,
        fields: ['return_request_id'],
        filters: {
            order_id: input.order_id
        }
    });
    if (returnRequest) {
        throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_ARGUMENT, 'Order return request already exists');
    }
    const { data: [order] } = await query.graph({
        entity: 'order',
        fields: ['items.id'],
        filters: {
            id: input.order_id
        }
    });
    const orderLineItems = order.items.map((i) => i.id);
    for (const item of input.line_items) {
        if (!orderLineItems.includes(item.line_item_id)) {
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_ARGUMENT, 'Invalid line item');
        }
    }
    const reason_ids = [
        ...new Set(input.line_items.map((item) => item.reason_id))
    ];
    const { data: reasons } = await query.graph({
        entity: 'return_reason',
        fields: ['id'],
        filters: {
            id: reason_ids
        }
    });
    if (reasons.length !== reason_ids.length) {
        throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, 'Invalid reason');
    }
    return new workflows_sdk_1.StepResponse(true);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUtb3JkZXItcmV0dXJuLXJlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL29yZGVyLXJldHVybi1yZXF1ZXN0L3N0ZXBzL3ZhbGlkYXRlLW9yZGVyLXJldHVybi1yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHFEQUdrQztBQUNsQyxxRUFBNEU7QUFJNUUsK0ZBQW9FO0FBRXZELFFBQUEsOEJBQThCLEdBQUcsSUFBQSwwQkFBVSxFQUN0RCwrQkFBK0IsRUFDL0IsS0FBSyxFQUFFLEtBQWtDLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO0lBQzFELE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFaEUsTUFBTSxFQUNKLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUN0QixHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztRQUNwQixNQUFNLEVBQUUsOEJBQWtCLENBQUMsVUFBVTtRQUNyQyxNQUFNLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztRQUM3QixPQUFPLEVBQUU7WUFDUCxRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7U0FDekI7S0FDRixDQUFDLENBQUE7SUFFRixJQUFJLGFBQWEsRUFBRSxDQUFDO1FBQ2xCLE1BQU0sSUFBSSxtQkFBVyxDQUNuQixtQkFBVyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFDbEMscUNBQXFDLENBQ3RDLENBQUE7SUFDSCxDQUFDO0lBRUQsTUFBTSxFQUNKLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUNkLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ3BCLE1BQU0sRUFBRSxPQUFPO1FBQ2YsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDO1FBQ3BCLE9BQU8sRUFBRTtZQUNQLEVBQUUsRUFBRSxLQUFLLENBQUMsUUFBUTtTQUNuQjtLQUNGLENBQUMsQ0FBQTtJQUVGLE1BQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7SUFFbkQsS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUM7WUFDaEQsTUFBTSxJQUFJLG1CQUFXLENBQ25CLG1CQUFXLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUNsQyxtQkFBbUIsQ0FDcEIsQ0FBQTtRQUNILENBQUM7SUFDSCxDQUFDO0lBRUQsTUFBTSxVQUFVLEdBQUc7UUFDakIsR0FBRyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQzNELENBQUE7SUFFRCxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztRQUMxQyxNQUFNLEVBQUUsZUFBZTtRQUN2QixNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7UUFDZCxPQUFPLEVBQUU7WUFDUCxFQUFFLEVBQUUsVUFBVTtTQUNmO0tBQ0YsQ0FBQyxDQUFBO0lBRUYsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN6QyxNQUFNLElBQUksbUJBQVcsQ0FBQyxtQkFBVyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQTtJQUN6RSxDQUFDO0lBRUQsT0FBTyxJQUFJLDRCQUFZLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDL0IsQ0FBQyxDQUNGLENBQUEifQ==