"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReviewStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const reviews_1 = require("@mercurjs/reviews");
exports.updateReviewStep = (0, workflows_sdk_1.createStep)('update-review', async (input, { container }) => {
    const service = container.resolve(reviews_1.REVIEW_MODULE);
    const review = await service.updateReviews(input);
    return new workflows_sdk_1.StepResponse(review);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXJldmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvcmV2aWV3L3N0ZXBzL3VwZGF0ZS1yZXZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUVBQTRFO0FBRzVFLCtDQUFzRTtBQUV6RCxRQUFBLGdCQUFnQixHQUFHLElBQUEsMEJBQVUsRUFDeEMsZUFBZSxFQUNmLEtBQUssRUFBRSxLQUFzQixFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUM5QyxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFzQix1QkFBYSxDQUFDLENBQUE7SUFFckUsTUFBTSxNQUFNLEdBQUcsTUFBTSxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRWpELE9BQU8sSUFBSSw0QkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FDRixDQUFBIn0=