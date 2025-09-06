"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = syncExistingProductsWithAlgolia;
const algolia_1 = require("@mercurjs/algolia");
const algolia_2 = require("@mercurjs/algolia");
const framework_1 = require("@mercurjs/framework");
const utils_1 = require("../subscribers/utils");
async function syncExistingProductsWithAlgolia({ container }) {
    const algolia = container.resolve(algolia_1.ALGOLIA_MODULE);
    await algolia.updateSettings(framework_1.IndexType.PRODUCT, algolia_2.defaultProductSettings);
    await algolia.updateSettings(framework_1.IndexType.REVIEW, algolia_2.defaultReviewSettings);
    const productsToInsert = await (0, utils_1.findAndTransformAlgoliaProducts)(container);
    const productResult = await algolia.batchUpsert(framework_1.IndexType.PRODUCT, productsToInsert);
    const reviewsToInsert = await (0, utils_1.findAndTransformAlgoliaReviews)(container);
    const reviewResult = await algolia.batchUpsert(framework_1.IndexType.REVIEW, reviewsToInsert);
    console.log(`Inserted ${productResult.objectIDs.length} products and ${reviewResult.objectIDs.length} reviews!`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luYy1hbGdvbGlhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NjcmlwdHMvc3luYy1hbGdvbGlhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBZUEsa0RBdUJDO0FBcENELCtDQUFrRDtBQUNsRCwrQ0FJMEI7QUFDMUIsbURBQStDO0FBRS9DLGdEQUc2QjtBQUVkLEtBQUssVUFBVSwrQkFBK0IsQ0FBQyxFQUM1RCxTQUFTLEVBQ0E7SUFDVCxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUF1Qix3QkFBYyxDQUFDLENBQUE7SUFFdkUsTUFBTSxPQUFPLENBQUMsY0FBYyxDQUFDLHFCQUFTLENBQUMsT0FBTyxFQUFFLGdDQUFzQixDQUFDLENBQUE7SUFDdkUsTUFBTSxPQUFPLENBQUMsY0FBYyxDQUFDLHFCQUFTLENBQUMsTUFBTSxFQUFFLCtCQUFxQixDQUFDLENBQUE7SUFFckUsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLElBQUEsdUNBQStCLEVBQUMsU0FBUyxDQUFDLENBQUE7SUFDekUsTUFBTSxhQUFhLEdBQUcsTUFBTSxPQUFPLENBQUMsV0FBVyxDQUM3QyxxQkFBUyxDQUFDLE9BQU8sRUFDakIsZ0JBQWdCLENBQ2pCLENBQUE7SUFFRCxNQUFNLGVBQWUsR0FBRyxNQUFNLElBQUEsc0NBQThCLEVBQUMsU0FBUyxDQUFDLENBQUE7SUFDdkUsTUFBTSxZQUFZLEdBQUcsTUFBTSxPQUFPLENBQUMsV0FBVyxDQUM1QyxxQkFBUyxDQUFDLE1BQU0sRUFDaEIsZUFBZSxDQUNoQixDQUFBO0lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FDVCxZQUFZLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxpQkFBaUIsWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLFdBQVcsQ0FDcEcsQ0FBQTtBQUNILENBQUMifQ==