"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPayoutAccountForSellerWorkflow = void 0;
const core_flows_1 = require("@medusajs/medusa/core-flows");
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const payout_1 = require("@mercurjs/payout");
const seller_1 = require("@mercurjs/seller");
const steps_1 = require("../steps");
exports.createPayoutAccountForSellerWorkflow = (0, workflows_sdk_1.createWorkflow)({
    name: 'create-payout-account-for-seller',
    idempotent: true
}, function (input) {
    (0, steps_1.validateNoExistingPayoutAccountForSellerStep)(input.seller_id);
    const payoutAccount = (0, steps_1.createPayoutAccountStep)({ context: input.context });
    (0, core_flows_1.createRemoteLinkStep)([
        {
            [seller_1.SELLER_MODULE]: {
                seller_id: input.seller_id
            },
            [payout_1.PAYOUT_MODULE]: {
                payout_account_id: payoutAccount.id
            }
        }
    ]);
    return new workflows_sdk_1.WorkflowResponse(payoutAccount);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXBheW91dC1hY2NvdW50LWZvci1zZWxsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL3NlbGxlci93b3JrZmxvd3MvY3JlYXRlLXBheW91dC1hY2NvdW50LWZvci1zZWxsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNERBQWtFO0FBQ2xFLDJEQUEwRTtBQUcxRSw2Q0FBZ0Q7QUFDaEQsNkNBQWdEO0FBRWhELG9DQUdpQjtBQU9KLFFBQUEsb0NBQW9DLEdBQUcsSUFBQSw4QkFBYyxFQUNoRTtJQUNFLElBQUksRUFBRSxrQ0FBa0M7SUFDeEMsVUFBVSxFQUFFLElBQUk7Q0FDakIsRUFDRCxVQUFVLEtBQXdDO0lBQ2hELElBQUEsb0RBQTRDLEVBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBRTdELE1BQU0sYUFBYSxHQUFHLElBQUEsK0JBQXVCLEVBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUE7SUFFekUsSUFBQSxpQ0FBb0IsRUFBQztRQUNuQjtZQUNFLENBQUMsc0JBQWEsQ0FBQyxFQUFFO2dCQUNmLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUzthQUMzQjtZQUNELENBQUMsc0JBQWEsQ0FBQyxFQUFFO2dCQUNmLGlCQUFpQixFQUFFLGFBQWEsQ0FBQyxFQUFFO2FBQ3BDO1NBQ0Y7S0FDRixDQUFDLENBQUE7SUFFRixPQUFPLElBQUksZ0NBQWdCLENBQUMsYUFBYSxDQUFDLENBQUE7QUFDNUMsQ0FBQyxDQUNGLENBQUEifQ==