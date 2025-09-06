"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCommissionLinesStep = void 0;
const utils_1 = require("@medusajs/framework/utils");
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const commission_1 = require("@mercurjs/commission");
const seller_order_1 = __importDefault(require("../../../links/seller-order"));
exports.listCommissionLinesStep = (0, workflows_sdk_1.createStep)('list-commission-lines', async (input, { container }) => {
    const { pagination, filters } = input;
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const service = container.resolve(commission_1.COMMISSION_MODULE);
    const createdFilter = {};
    const itemLineIdFilter = {};
    if (filters.start_date) {
        createdFilter.$gte = filters.start_date;
    }
    if (filters.end_date) {
        createdFilter.$lte = filters.end_date;
    }
    if (filters.seller_id) {
        const { data: sellerOrders } = await query.graph({
            entity: seller_order_1.default.entryPoint,
            fields: ['*', 'order.items.id'],
            filters: {
                seller_id: filters.seller_id,
                created_at: createdFilter
            }
        });
        itemLineIdFilter.$in = sellerOrders
            .flatMap((o) => o.order.items)
            .map((i) => i.id);
    }
    const [commissionLines, count] = await service.listAndCountCommissionLines({
        item_line_id: itemLineIdFilter,
        created_at: createdFilter
    }, {
        take: pagination.take,
        skip: pagination.skip
    });
    if (input.expand) {
        const itemIds = commissionLines.map((line) => line.item_line_id);
        const ruleIds = commissionLines.map((line) => line.rule_id);
        const { data: rules } = await query.graph({
            entity: 'commission_rule',
            fields: ['*', 'rate.*'],
            filters: {
                id: ruleIds
            },
            withDeleted: true
        });
        const { data: orders } = await query.graph({
            entity: 'order',
            fields: ['*', 'seller.id', 'seller.name', 'items.id'],
            filters: {
                items: {
                    id: itemIds
                }
            }
        });
        const expandedLines = commissionLines.map((line) => {
            const order = orders.find((o) => o.items.some((i) => i.id === line.item_line_id));
            const rule = rules.find((r) => r.id === line.rule_id);
            return {
                ...line,
                order,
                rule
            };
        });
        return new workflows_sdk_1.StepResponse({ lines: expandedLines, count });
    }
    return new workflows_sdk_1.StepResponse({ lines: commissionLines, count });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1jb21taXNzaW9uLWxpbmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9jb21taXNzaW9uL3N0ZXBzL2xpc3QtY29tbWlzc2lvbi1saW5lcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxxREFBcUU7QUFDckUscUVBQTRFO0FBRTVFLHFEQUF3RDtBQUd4RCwrRUFBcUQ7QUFleEMsUUFBQSx1QkFBdUIsR0FBRyxJQUFBLDBCQUFVLEVBQy9DLHVCQUF1QixFQUN2QixLQUFLLEVBQUUsS0FBWSxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUNwQyxNQUFNLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxHQUFHLEtBQUssQ0FBQTtJQUNyQyxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2hFLE1BQU0sT0FBTyxHQUNYLFNBQVMsQ0FBQyxPQUFPLENBQTBCLDhCQUFpQixDQUFDLENBQUE7SUFFL0QsTUFBTSxhQUFhLEdBQWlDLEVBQUUsQ0FBQTtJQUN0RCxNQUFNLGdCQUFnQixHQUF1QixFQUFFLENBQUE7SUFFL0MsSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdkIsYUFBYSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFBO0lBQ3pDLENBQUM7SUFFRCxJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNyQixhQUFhLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUE7SUFDdkMsQ0FBQztJQUVELElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3RCLE1BQU0sRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQy9DLE1BQU0sRUFBRSxzQkFBVyxDQUFDLFVBQVU7WUFDOUIsTUFB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