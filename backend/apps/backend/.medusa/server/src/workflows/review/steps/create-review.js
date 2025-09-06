"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReviewStep = void 0;
const utils_1 = require("@medusajs/framework/utils");
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const reviews_1 = require("@mercurjs/reviews");
exports.createReviewStep = (0, workflows_sdk_1.createStep)('create-review', async (input, { container }) => {
    const service = container.resolve(reviews_1.REVIEW_MODULE);
    const link = container.resolve(utils_1.ContainerRegistrationKeys.LINK);
    const review = await service.createReviews(input);
    await link.create([
        {
            [utils_1.Modules.CUSTOMER]: {
                customer_id: input.customer_id
            },
            [reviews_1.REVIEW_MODULE]: {
                review_id: review.id
            }
        },
        {
            [utils_1.Modules.ORDER]: {
                order_id: input.order_id
            },
            [reviews_1.REVIEW_MODULE]: {
                review_id: review.id
            }
        }
    ]);
    return new workflows_sdk_1.StepResponse(review);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXJldmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvcmV2aWV3L3N0ZXBzL2NyZWF0ZS1yZXZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscURBQThFO0FBQzlFLHFFQUE0RTtBQUc1RSwrQ0FBc0U7QUFFekQsUUFBQSxnQkFBZ0IsR0FBRyxJQUFBLDBCQUFVLEVBQ3hDLGVBQWUsRUFDZixLQUFLLEVBQUUsS0FBc0IsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDOUMsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBc0IsdUJBQWEsQ0FBQyxDQUFBO0lBQ3JFLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsSUFBSSxDQUFDLENBQUE7SUFFOUQsTUFBTSxNQUFNLEdBQUcsTUFBTSxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRWpELE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNoQjtZQUNFLENBQUMsZUFBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNsQixXQUFXLEVBQUUsS0FBSyxDQUFDLFdBQVc7YUFDL0I7WUFDRCxDQUFDLHVCQUFhLENBQUMsRUFBRTtnQkFDZixTQUFTLEVBQUUsTUFBTSxDQUFDLEVBQUU7YUFDckI7U0FDRjtRQUNEO1lBQ0UsQ0FBQyxlQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2YsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO2FBQ3pCO1lBQ0QsQ0FBQyx1QkFBYSxDQUFDLEVBQUU7Z0JBQ2YsU0FBUyxFQUFFLE1BQU0sQ0FBQyxFQUFFO2FBQ3JCO1NBQ0Y7S0FDRixDQUFDLENBQUE7SUFDRixPQUFPLElBQUksNEJBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQ0YsQ0FBQSJ9