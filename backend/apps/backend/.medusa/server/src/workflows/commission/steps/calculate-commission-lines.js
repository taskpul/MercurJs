"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCommissionLinesStep = void 0;
const utils_1 = require("@medusajs/framework/utils");
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const commission_1 = require("@mercurjs/commission");
async function calculateFlatCommission(rate, currency, container) {
    const priceService = container.resolve(utils_1.Modules.PRICING);
    const priceSet = await priceService.retrievePriceSet(rate.price_set_id, {
        relations: ['prices']
    });
    const price = priceSet.prices?.find((p) => p.currency_code === currency);
    return price?.amount || utils_1.MathBN.convert(0);
}
async function calculatePercentageCommission(rate, item, currency, container) {
    const total = utils_1.MathBN.convert(item.total);
    const taxValue = utils_1.MathBN.convert(item.tax_total);
    const calculationBase = rate.include_tax ? total : total.minus(taxValue);
    const commissionValue = utils_1.MathBN.mult(calculationBase, utils_1.MathBN.div(rate.percentage_rate, 100));
    const priceService = container.resolve(utils_1.Modules.PRICING);
    const minPriceSet = rate.min_price_set_id
        ? await priceService.retrievePriceSet(rate.min_price_set_id, {
            relations: ['prices']
        })
        : undefined;
    const maxPriceSet = rate.max_price_set_id
        ? await priceService.retrievePriceSet(rate.max_price_set_id, {
            relations: ['prices']
        })
        : undefined;
    const minValue = minPriceSet?.prices?.find((p) => p.currency_code === currency)
        ?.amount || utils_1.MathBN.convert(0);
    const maxValue = maxPriceSet?.prices?.find((p) => p.currency_code === currency)
        ?.amount || utils_1.MathBN.convert(Number.POSITIVE_INFINITY);
    return utils_1.MathBN.max(minValue, utils_1.MathBN.min(maxValue, commissionValue));
}
async function calculateCommissionValue(rate, item, currency, container) {
    if (rate.type === 'flat') {
        return calculateFlatCommission(rate, currency, container);
    }
    if (rate.type === 'percentage') {
        return calculatePercentageCommission(rate, item, currency, container);
    }
    return utils_1.MathBN.convert(0);
}
exports.calculateCommissionLinesStep = (0, workflows_sdk_1.createStep)('calculate-commission-lines', async ({ order_id, seller_id }, { container }) => {
    const orderService = container.resolve(utils_1.Modules.ORDER);
    const order = await orderService.retrieveOrder(order_id, {
        relations: ['items'],
        // At least one of the computed totals fields should be requested in select,
        // in order for decorateTotals to be called
        select: ['*', 'item_total']
    });
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const commissionService = container.resolve(commission_1.COMMISSION_MODULE);
    const commissionLines = [];
    for (const item of order.items) {
        const { data: [product] } = await query.graph({
            entity: 'product',
            fields: ['categories.id'],
            filters: {
                id: item.product_id
            }
        });
        const commissionRule = await commissionService.selectCommissionForProductLine({
            product_category_id: product.categories[0]?.id || '',
            product_type_id: item.product_type_id || '',
            seller_id: seller_id
        });
        if (commissionRule) {
            commissionLines.push({
                item_line_id: item.id,
                value: await calculateCommissionValue(commissionRule.rate, item, order.currency_code, container),
                currency_code: order.currency_code,
                rule_id: commissionRule.id
            });
        }
    }
    return new workflows_sdk_1.StepResponse(commissionLines);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRlLWNvbW1pc3Npb24tbGluZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL2NvbW1pc3Npb24vc3RlcHMvY2FsY3VsYXRlLWNvbW1pc3Npb24tbGluZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEscURBSWtDO0FBQ2xDLHFFQUE0RTtBQUU1RSxxREFBd0Q7QUFTeEQsS0FBSyxVQUFVLHVCQUF1QixDQUNwQyxJQUF1QixFQUN2QixRQUFnQixFQUNoQixTQUEwQjtJQUUxQixNQUFNLFlBQVksR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGVBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUN2RCxNQUFNLFFBQVEsR0FBRyxNQUFNLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsWUFBYSxFQUFFO1FBQ3ZFLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQztLQUN0QixDQUFDLENBQUE7SUFFRixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLElBQUksQ0FDakMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLEtBQUssUUFBUSxDQUN4QixDQUFBO0lBRWIsT0FBTyxLQUFLLEVBQUUsTUFBTSxJQUFJLGNBQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDM0MsQ0FBQztBQUVELEtBQUssVUFBVSw2QkFBNkIsQ0FDMUMsSUFBdUIsRUFDdkIsSUFBc0IsRUFDdEIsUUFBZ0IsRUFDaEIsU0FBMEI7SUFFMUIsTUFBTSxLQUFLLEdBQUcsY0FBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDeEMsTUFBTSxRQUFRLEdBQUcsY0FBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDL0MsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFD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