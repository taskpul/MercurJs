"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = reviewChangedHandler;
const utils_1 = require("@medusajs/framework/utils");
const algolia_1 = require("@mercurjs/algolia");
const framework_1 = require("@mercurjs/framework");
const reviews_1 = require("@mercurjs/reviews");
const product_review_1 = __importDefault(require("../links/product-review"));
const seller_review_1 = __importDefault(require("../links/seller-review"));
async function reviewChangedHandler({ event, container }) {
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const algolia = container.resolve(algolia_1.ALGOLIA_MODULE);
    const { review } = event.data;
    if (review.reference === 'product') {
        const { data: [relation] } = await query.graph({
            entity: product_review_1.default.entryPoint,
            fields: ['product_id'],
            filters: {
                review_id: review.id
            }
        });
        const average_rating = await (0, reviews_1.getAvgRating)(container, review.reference, relation.product_id);
        await algolia.partialUpdate(framework_1.IndexType.PRODUCT, {
            id: relation.product_id,
            average_rating: Number(average_rating)
        });
        await algolia.upsert(framework_1.IndexType.REVIEW, framework_1.AlgoliaReviewValidator.parse({
            ...review,
            reference_id: relation.product_id
        }));
    }
    if (review.reference === 'seller') {
        const { data: [relation] } = await query.graph({
            entity: seller_review_1.default.entryPoint,
            fields: ['seller_id'],
            filters: {
                review_id: review.id
            }
        });
        await algolia.upsert(framework_1.IndexType.REVIEW, framework_1.AlgoliaReviewValidator.parse({
            ...review,
            reference_id: relation.seller_id
        }));
    }
}
exports.config = {
    event: framework_1.AlgoliaEvents.REVIEW_CHANGED,
    context: {
        subscriberId: 'algolia-review-changed-handler'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxnb2xpYS1yZXZpZXctY2hhbmdlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdWJzY3JpYmVycy9hbGdvbGlhLXJldmlldy1jaGFuZ2VkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQWVBLHVDQTJEQztBQXpFRCxxREFBcUU7QUFFckUsK0NBQXdFO0FBRXhFLG1EQUk0QjtBQUM1QiwrQ0FBZ0Q7QUFFaEQsNkVBQW1EO0FBQ25ELDJFQUFpRDtBQUVsQyxLQUFLLFVBQVUsb0JBQW9CLENBQUMsRUFDakQsS0FBSyxFQUNMLFNBQVMsRUFDNkI7SUFDdEMsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxpQ0FBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNoRSxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUF1Qix3QkFBYyxDQUFDLENBQUE7SUFFdkUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUE7SUFFN0IsSUFBSSxNQUFNLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRSxDQUFDO1FBQ25DLE1BQU0sRUFDSixJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFDakIsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDcEIsTUFBTSxFQUFFLHdCQUFhLENBQUMsVUFBVTtZQUNoQyxNQUFNLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDdEIsT0FBTyxFQUFFO2dCQUNQLFNBQVMsRUFBRSxNQUFNLENBQUMsRUFBRTthQUNyQjtTQUNGLENBQUMsQ0FBQTtRQUVGLE1BQU0sY0FBYyxHQUFHLE1BQU0sSUFBQSxzQkFBWSxFQUN2QyxTQUFTLEVBQ1QsTUFBTSxDQUFDLFNBQVMsRUFDaEIsUUFBUSxDQUFDLFVBQVUsQ0FDcEIsQ0FBQTtRQUVELE1BQU0sT0FBTyxDQUFDLGFBQWEsQ0FBQyxxQkFBUyxDQUFDLE9BQU8sRUFBRTtZQUM3QyxFQUFFLEVBQUUsUUFBUSxDQUFDLFVBQVU7WUFDdkIsY0FBYyxFQUFFLE1BQU0sQ0FBQyxjQUFjLENBQUM7U0FDdkMsQ0FBQyxDQUFBO1FBRUYsTUFBTSxPQUFPLENBQUMsTUFBTSxDQUNsQixxQkFBUyxDQUFDLE1BQU0sRUFDaEIsa0NBQXNCLENBQUMsS0FBSyxDQUFDO1lBQzNCLEdBQUcsTUFBTTtZQUNULFlBQVksRUFBRSxRQUFRLENBQUMsVUFBVTtTQUNsQyxDQUFDLENBQ0gsQ0FBQTtJQUNILENBQUM7SUFFRCxJQUFJLE1BQU0sQ0FBQyxTQUFTLEtBQUssUUFBUSxFQUFFLENBQUM7UUFDbEMsTUFBTSxFQUNKLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUNqQixHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztZQUNwQixNQUFNLEVBQUUsdUJBQVksQ0FBQyxVQUFVO1lBQy9CLE1BQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUNyQixPQUFPLEVBQUU7Z0JBQ1AsU0FBUyxFQUFFLE1BQU0sQ0FBQyxFQUFFO2FBQ3JCO1NBQ0YsQ0FBQyxDQUFBO1FBRUYsTUFBTSxPQUFPLENBQUMsTUFBTSxDQUNsQixxQkFBUyxDQUFDLE1BQU0sRUFDaEIsa0NBQXNCLENBQUMsS0FBSyxDQUFDO1lBQzNCLEdBQUcsTUFBTTtZQUNULFlBQVksRUFBRSxRQUFRLENBQUMsU0FBUztTQUNqQyxDQUFDLENBQ0gsQ0FBQTtJQUNILENBQUM7QUFDSCxDQUFDO0FBRVksUUFBQSxNQUFNLEdBQXFCO0lBQ3RDLEtBQUssRUFBRSx5QkFBYSxDQUFDLGNBQWM7SUFDbkMsT0FBTyxFQUFFO1FBQ1AsWUFBWSxFQUFFLGdDQUFnQztLQUMvQztDQUNGLENBQUEifQ==