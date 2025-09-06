"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSplitOrderPaymentsStep = void 0;
const utils_1 = require("@medusajs/framework/utils");
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const split_order_payment_1 = require("@mercurjs/split-order-payment");
exports.createSplitOrderPaymentsStep = (0, workflows_sdk_1.createStep)('create-split-order-payments', async (input, { container }) => {
    const service = container.resolve(split_order_payment_1.SPLIT_ORDER_PAYMENT_MODULE);
    const linkService = container.resolve(utils_1.ContainerRegistrationKeys.LINK);
    const payments = [];
    const links = [];
    for (const payment of input) {
        const [result] = await service.createSplitOrderPayments([payment]);
        links.push({
            [utils_1.Modules.ORDER]: {
                order_id: payment.order_id
            },
            [split_order_payment_1.SPLIT_ORDER_PAYMENT_MODULE]: {
                split_order_payment_id: result.id
            }
        });
        payments.push(result);
    }
    await linkService.create(links);
    return new workflows_sdk_1.StepResponse(payments, { ids: payments.map((p) => p.id), links });
}, async (compensation, { container }) => {
    const service = container.resolve(split_order_payment_1.SPLIT_ORDER_PAYMENT_MODULE);
    const linkService = container.resolve(utils_1.ContainerRegistrationKeys.LINK);
    await service.deleteSplitOrderPayments(compensation.ids);
    await linkService.dismiss(compensation.links);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXNwbGl0LW9yZGVyLXBheW1lbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9zcGxpdC1vcmRlci1wYXltZW50L3N0ZXBzL2NyZWF0ZS1zcGxpdC1vcmRlci1wYXltZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxxREFBOEU7QUFDOUUscUVBQTRFO0FBTTVFLHVFQUdzQztBQUV6QixRQUFBLDRCQUE0QixHQUFHLElBQUEsMEJBQVUsRUFDcEQsNkJBQTZCLEVBQzdCLEtBQUssRUFBRSxLQUFvQyxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUM1RCxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUMvQixnREFBMEIsQ0FDM0IsQ0FBQTtJQUNELE1BQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsSUFBSSxDQUFDLENBQUE7SUFFckUsTUFBTSxRQUFRLEdBQTJCLEVBQUUsQ0FBQTtJQUMzQyxNQUFNLEtBQUssR0FBcUIsRUFBRSxDQUFBO0lBRWxDLEtBQUssTUFBTSxPQUFPLElBQUksS0FBSyxFQUFFLENBQUM7UUFDNUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtRQUVsRSxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQ1QsQ0FBQyxlQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2YsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO2FBQzNCO1lBQ0QsQ0FBQyxnREFBMEIsQ0FBQyxFQUFFO2dCQUM1QixzQkFBc0IsRUFBRSxNQUFNLENBQUMsRUFBRTthQUNsQztTQUNGLENBQUMsQ0FBQTtRQUVGLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDdkIsQ0FBQztJQUVELE1BQU0sV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUUvQixPQUFPLElBQUksNEJBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7QUFDOUUsQ0FBQyxFQUNELEtBQUssRUFDSCxZQUF3RCxFQUN4RCxFQUFFLFNBQVMsRUFBRSxFQUNiLEVBQUU7SUFDRixNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUMvQixnREFBMEIsQ0FDM0IsQ0FBQTtJQUNELE1BQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDckUsTUFBTSxPQUFPLENBQUMsd0JBQXdCLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3hELE1BQU0sV0FBVyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDL0MsQ0FBQyxDQUNGLENBQUEifQ==