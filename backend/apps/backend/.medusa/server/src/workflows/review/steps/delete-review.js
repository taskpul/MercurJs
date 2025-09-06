"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReviewStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const reviews_1 = require("@mercurjs/reviews");
exports.deleteReviewStep = (0, workflows_sdk_1.createStep)('delete-review', async (id, { container }) => {
    const service = container.resolve(reviews_1.REVIEW_MODULE);
    await service.softDeleteReviews(id);
    return new workflows_sdk_1.StepResponse(id);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLXJldmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvcmV2aWV3L3N0ZXBzL2RlbGV0ZS1yZXZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUVBQTRFO0FBRTVFLCtDQUFzRTtBQUV6RCxRQUFBLGdCQUFnQixHQUFHLElBQUEsMEJBQVUsRUFDeEMsZUFBZSxFQUNmLEtBQUssRUFBRSxFQUFVLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO0lBQ2xDLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQXNCLHVCQUFhLENBQUMsQ0FBQTtJQUVyRSxNQUFNLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUVuQyxPQUFPLElBQUksNEJBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUM3QixDQUFDLENBQ0YsQ0FBQSJ9