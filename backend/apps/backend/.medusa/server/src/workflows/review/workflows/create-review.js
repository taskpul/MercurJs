"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReviewWorkflow = void 0;
const utils_1 = require("@medusajs/framework/utils");
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const framework_1 = require("@mercurjs/framework");
const reviews_1 = require("@mercurjs/reviews");
const seller_1 = require("@mercurjs/seller");
const steps_1 = require("../steps");
exports.createReviewWorkflow = (0, workflows_sdk_1.createWorkflow)({
    name: 'create-review'
}, function (input) {
    (0, steps_1.validateReviewStep)(input);
    const review = (0, steps_1.createReviewStep)(input);
    const link = (0, workflows_sdk_1.transform)({ input, review }, ({ input, review }) => {
        return input.reference === 'product'
            ? [
                {
                    [utils_1.Modules.PRODUCT]: {
                        product_id: input.reference_id
                    },
                    [reviews_1.REVIEW_MODULE]: {
                        review_id: review.id
                    }
                }
            ]
            : [
                {
                    [seller_1.SELLER_MODULE]: {
                        seller_id: input.reference_id
                    },
                    [reviews_1.REVIEW_MODULE]: {
                        review_id: review.id
                    }
                }
            ];
    });
    (0, core_flows_1.createRemoteLinkStep)(link);
    (0, core_flows_1.emitEventStep)({
        eventName: framework_1.AlgoliaEvents.REVIEW_CHANGED,
        data: { review }
    });
    return new workflows_sdk_1.WorkflowResponse(review);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXJldmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvcmV2aWV3L3dvcmtmbG93cy9jcmVhdGUtcmV2aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFEQUFtRDtBQUNuRCxxRUFJMEM7QUFDMUMsNERBR29DO0FBRXBDLG1EQUFvRTtBQUNwRSwrQ0FBaUQ7QUFDakQsNkNBQWdEO0FBRWhELG9DQUErRDtBQUVsRCxRQUFBLG9CQUFvQixHQUFHLElBQUEsOEJBQWMsRUFDaEQ7SUFDRSxJQUFJLEVBQUUsZUFBZTtDQUN0QixFQUNELFVBQVUsS0FBc0I7SUFDOUIsSUFBQSwwQkFBa0IsRUFBQyxLQUFLLENBQUMsQ0FBQTtJQUN6QixNQUFNLE1BQU0sR0FBRyxJQUFBLHdCQUFnQixFQUFDLEtBQUssQ0FBQyxDQUFBO0lBRXRDLE1BQU0sSUFBSSxHQUFHLElBQUEseUJBQVMsRUFBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFDOUQsT0FBTyxLQUFLLENBQUMsU0FBUyxLQUFLLFNBQVM7WUFDbEMsQ0FBQyxDQUFDO2dCQUNFO29CQUNFLENBQUMsZUFBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO3dCQUNqQixVQUFVLEVBQUUsS0FBSyxDQUFDLFlBQVk7cUJBQy9CO29CQUNELENBQUMsdUJBQWEsQ0FBQyxFQUFFO3dCQUNmLFNBQVMsRUFBRSxNQUFNLENBQUMsRUFBRTtxQkFDckI7aUJBQ0Y7YUFDRjtZQUNILENBQUMsQ0FBQztnQkFDRTtvQkFDRSxDQUFDLHNCQUFhLENBQUMsRUFBRTt3QkFDZixTQUFTLEVBQUUsS0FBSyxDQUFDLFlBQVk7cUJBQzlCO29CQUNELENBQUMsdUJBQWEsQ0FBQyxFQUFFO3dCQUNmLFNBQVMsRUFBRSxNQUFNLENBQUMsRUFBRTtxQkFDckI7aUJBQ0Y7YUFDRixDQUFBO0lBQ1AsQ0FBQyxDQUFDLENBQUE7SUFFRixJQUFBLGlDQUFvQixFQUFDLElBQUksQ0FBQyxDQUFBO0lBQzFCLElBQUEsMEJBQWEsRUFBQztRQUNaLFNBQVMsRUFBRSx5QkFBYSxDQUFDLGNBQWM7UUFDdkMsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFO0tBQ2pCLENBQUMsQ0FBQTtJQUNGLE9BQU8sSUFBSSxnQ0FBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUNyQyxDQUFDLENBQ0YsQ0FBQSJ9