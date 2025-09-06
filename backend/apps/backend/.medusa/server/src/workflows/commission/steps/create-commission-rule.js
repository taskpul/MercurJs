"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommissionRuleStep = void 0;
const utils_1 = require("@medusajs/framework/utils");
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const commission_1 = require("@mercurjs/commission");
exports.createCommissionRuleStep = (0, workflows_sdk_1.createStep)('create-commission-rule', async (input, { container }) => {
    const pricingService = container.resolve(utils_1.Modules.PRICING);
    const service = container.resolve(commission_1.COMMISSION_MODULE);
    const price_set_id = input.rate.price_set
        ? (await pricingService.createPriceSets({
            prices: input.rate.price_set
        })).id
        : null;
    const min_price_set_id = input.rate.min_price_set
        ? (await pricingService.createPriceSets({
            prices: input.rate.min_price_set
        })).id
        : null;
    const max_price_set_id = input.rate.max_price_set
        ? (await pricingService.createPriceSets({
            prices: input.rate.max_price_set
        })).id
        : null;
    const commission_rate = await service.createCommissionRates({
        ...input.rate,
        max_price_set_id,
        min_price_set_id,
        price_set_id
    });
    const commissionRule = await service.createCommissionRules({
        ...input,
        rate: commission_rate.id
    });
    return new workflows_sdk_1.StepResponse(commissionRule, commissionRule.id);
}, async (commissionRuleId, { container }) => {
    const service = container.resolve(commission_1.COMMISSION_MODULE);
    await service.deleteCommissionRules([commissionRuleId]);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWNvbW1pc3Npb24tcnVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvY29tbWlzc2lvbi9zdGVwcy9jcmVhdGUtY29tbWlzc2lvbi1ydWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFEQUFtRDtBQUNuRCxxRUFBNEU7QUFFNUUscURBQXdEO0FBSTNDLFFBQUEsd0JBQXdCLEdBQUcsSUFBQSwwQkFBVSxFQUNoRCx3QkFBd0IsRUFDeEIsS0FBSyxFQUFFLEtBQThCLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO0lBQ3RELE1BQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsZUFBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3pELE1BQU0sT0FBTyxHQUNYLFNBQVMsQ0FBQyxPQUFPLENBQTBCLDhCQUFpQixDQUFDLENBQUE7SUFFL0QsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTO1FBQ3ZDLENBQUMsQ0FBQyxDQUNFLE1BQU0sY0FBYyxDQUFDLGVBQWUsQ0FBQztZQUNuQyxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTO1NBQzdCLENBQUMsQ0FDSCxDQUFDLEVBQUU7UUFDTixDQUFDLENBQUMsSUFBSSxDQUFBO0lBRVIsTUFBTSxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWE7UUFDL0MsQ0FBQyxDQUFDLENBQ0UsTUFBTSxjQUFjLENBQUMsZUFBZSxDQUFDO1lBQ25DLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWE7U0FDakMsQ0FBQyxDQUNILENBQUMsRUFBRTtRQUNOLENBQUMsQ0FBQyxJQUFJLENBQUE7SUFFUixNQUFNLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYTtRQUMvQyxDQUFDLENBQUMsQ0FDRSxNQUFNLGNBQWMsQ0FBQyxlQUFlLENBQUM7WUFDbkMsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYTtTQUNqQyxDQUFDLENBQ0gsQ0FBQyxFQUFFO1FBQ04sQ0FBQyxDQUFDLElBQUksQ0FBQTtJQUVSLE1BQU0sZUFBZSxHQUFHLE1BQU0sT0FBTyxDQUFDLHFCQUFxQixDQUFDO1FBQzFELEdBQUcsS0FBSyxDQUFDLElBQUk7UUFDYixnQkFBZ0I7UUFDaEIsZ0JBQWdCO1FBQ2hCLFlBQVk7S0FDYixDQUFDLENBQUE7SUFFRixNQUFNLGNBQWMsR0FDbEIsTUFBTSxPQUFPLENBQUMscUJBQXFCLENBQUM7UUFDbEMsR0FBRyxLQUFLO1FBQ1IsSUFBSSxFQUFFLGVBQWUsQ0FBQyxFQUFFO0tBQ3pCLENBQUMsQ0FBQTtJQUVKLE9BQU8sSUFBSSw0QkFBWSxDQUFDLGNBQWMsRUFBRSxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUE7QUFDNUQsQ0FBQyxFQUNELEtBQUssRUFBRSxnQkFBd0IsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDaEQsTUFBTSxPQUFPLEdBQ1gsU0FBUyxDQUFDLE9BQU8sQ0FBMEIsOEJBQWlCLENBQUMsQ0FBQTtJQUUvRCxNQUFNLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQTtBQUN6RCxDQUFDLENBQ0YsQ0FBQSJ9