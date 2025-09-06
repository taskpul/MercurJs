"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVendorPromotionWorkflow = void 0;
const utils_1 = require("@medusajs/framework/utils");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const seller_1 = require("@mercurjs/seller");
const steps_1 = require("../steps");
const verify_vendor_target_promotion_rules_1 = require("../steps/verify-vendor-target-promotion-rules");
exports.createVendorPromotionWorkflow = (0, workflows_sdk_1.createWorkflow)('create-vendor-promotion', function (input) {
    (0, steps_1.verifyVendorCampaignStep)(input);
    (0, steps_1.verifyVendorPromotionStep)(input);
    (0, verify_vendor_target_promotion_rules_1.verifyVendorTargetPromotionRulesStep)((0, workflows_sdk_1.transform)(input, (input) => ({
        rules: input.promotion.application_method.target_rules,
        seller_id: input.seller_id
    })));
    const promotions = core_flows_1.createPromotionsWorkflow.runAsStep({
        input: {
            promotionsData: [input.promotion]
        }
    });
    const links = (0, workflows_sdk_1.transform)({ input, promotions }, ({ input, promotions }) => {
        const promo = promotions[0];
        const link = [
            {
                [seller_1.SELLER_MODULE]: {
                    seller_id: input.seller_id
                },
                [utils_1.Modules.PROMOTION]: {
                    promotion_id: promo.id
                }
            }
        ];
        if (promo.campaign) {
            link.push({
                [seller_1.SELLER_MODULE]: {
                    seller_id: input.seller_id
                },
                [utils_1.Modules.PROMOTION]: {
                    campaign_id: promo.campaign.id
                }
            });
        }
        return link;
    });
    (0, core_flows_1.createRemoteLinkStep)(links);
    return new workflows_sdk_1.WorkflowResponse(promotions);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXZlbmRvci1wcm9tb3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL3Byb21vdGlvbnMvd29ya2Zsb3dzL2NyZWF0ZS12ZW5kb3ItcHJvbW90aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHFEQUFtRDtBQUNuRCw0REFHb0M7QUFDcEMsMkRBSWdDO0FBRWhDLDZDQUFnRDtBQUVoRCxvQ0FBOEU7QUFDOUUsd0dBQW9HO0FBRXZGLFFBQUEsNkJBQTZCLEdBQUcsSUFBQSw4QkFBYyxFQUN6RCx5QkFBeUIsRUFDekIsVUFBVSxLQUEyRDtJQUNuRSxJQUFBLGdDQUF3QixFQUFDLEtBQUssQ0FBQyxDQUFBO0lBQy9CLElBQUEsaUNBQXlCLEVBQUMsS0FBSyxDQUFDLENBQUE7SUFDaEMsSUFBQSwyRUFBb0MsRUFDbEMsSUFBQSx5QkFBUyxFQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMzQixLQUFLLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZO1FBQ3RELFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUztLQUMzQixDQUFDLENBQUMsQ0FDSixDQUFBO0lBRUQsTUFBTSxVQUFVLEdBQUcscUNBQXdCLENBQUMsU0FBUyxDQUFDO1FBQ3BELEtBQUssRUFBRTtZQUNMLGNBQWMsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7U0FDbEM7S0FDRixDQUFDLENBQUE7SUFFRixNQUFNLEtBQUssR0FBRyxJQUFBLHlCQUFTLEVBQUMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFO1FBQ3ZFLE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUMzQixNQUFNLElBQUksR0FBcUI7WUFDN0I7Z0JBQ0UsQ0FBQyxzQkFBYSxDQUFDLEVBQUU7b0JBQ2YsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTO2lCQUMzQjtnQkFDRCxDQUFDLGVBQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtvQkFDbkIsWUFBWSxFQUFFLEtBQUssQ0FBQyxFQUFFO2lCQUN2QjthQUNGO1NBQ0YsQ0FBQTtRQUVELElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ1IsQ0FBQyxzQkFBYSxDQUFDLEVBQUU7b0JBQ2YsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTO2lCQUMzQjtnQkFDRCxDQUFDLGVBQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtvQkFDbkIsV0FBVyxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtpQkFDL0I7YUFDRixDQUFDLENBQUE7UUFDSixDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDLENBQUMsQ0FBQTtJQUVGLElBQUEsaUNBQW9CLEVBQUMsS0FBSyxDQUFDLENBQUE7SUFDM0IsT0FBTyxJQUFJLGdDQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFBO0FBQ3pDLENBQUMsQ0FDRixDQUFBIn0=