"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForDuplicateStep = void 0;
const utils_1 = require("@medusajs/framework/utils");
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const commission_1 = require("@mercurjs/commission");
exports.checkForDuplicateStep = (0, workflows_sdk_1.createStep)('check-for-rule-duplicate', async (input, { container }) => {
    const service = container.resolve(commission_1.COMMISSION_MODULE);
    const commissionRule = await service.listCommissionRules({
        reference: input.reference,
        reference_id: input.reference_id,
        deleted_at: null
    });
    if (commissionRule.length > 0) {
        throw new utils_1.MedusaError(utils_1.MedusaError.Types.CONFLICT, 'Rule already exists!');
    }
    return new workflows_sdk_1.StepResponse(true);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2stZm9yLWR1cGxpY2F0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvY29tbWlzc2lvbi9zdGVwcy9jaGVjay1mb3ItZHVwbGljYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFEQUF1RDtBQUN2RCxxRUFBNEU7QUFFNUUscURBQXdEO0FBSTNDLFFBQUEscUJBQXFCLEdBQUcsSUFBQSwwQkFBVSxFQUM3QywwQkFBMEIsRUFDMUIsS0FBSyxFQUFFLEtBQThCLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO0lBQ3RELE1BQU0sT0FBTyxHQUNYLFNBQVMsQ0FBQyxPQUFPLENBQTBCLDhCQUFpQixDQUFDLENBQUE7SUFFL0QsTUFBTSxjQUFjLEdBQ2xCLE1BQU0sT0FBTyxDQUFDLG1CQUFtQixDQUFDO1FBQ2hDLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUztRQUMxQixZQUFZLEVBQUUsS0FBSyxDQUFDLFlBQVk7UUFDaEMsVUFBVSxFQUFFLElBQUk7S0FDakIsQ0FBQyxDQUFBO0lBRUosSUFBSSxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQzlCLE1BQU0sSUFBSSxtQkFBVyxDQUFDLG1CQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxzQkFBc0IsQ0FBQyxDQUFBO0lBQzNFLENBQUM7SUFFRCxPQUFPLElBQUksNEJBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUMvQixDQUFDLENBQ0YsQ0FBQSJ9