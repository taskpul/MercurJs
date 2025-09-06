"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = productsChangedHandler;
const algolia_1 = require("@mercurjs/algolia");
const framework_1 = require("@mercurjs/framework");
const utils_1 = require("../subscribers/utils");
async function productsChangedHandler({ event, container }) {
    const algolia = container.resolve(algolia_1.ALGOLIA_MODULE);
    const { published, other } = await (0, utils_1.filterProductsByStatus)(container, event.data.ids);
    const productsToInsert = published.length
        ? await (0, utils_1.findAndTransformAlgoliaProducts)(container, published)
        : [];
    await algolia.batch(framework_1.IndexType.PRODUCT, productsToInsert, other);
}
exports.config = {
    event: framework_1.AlgoliaEvents.PRODUCTS_CHANGED,
    context: {
        subscriberId: 'algolia-products-changed-handler'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxnb2xpYS1wcm9kdWN0cy1jaGFuZ2VkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3N1YnNjcmliZXJzL2FsZ29saWEtcHJvZHVjdHMtY2hhbmdlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFVQSx5Q0FnQkM7QUF4QkQsK0NBQXdFO0FBQ3hFLG1EQUE4RDtBQUU5RCxnREFHNkI7QUFFZCxLQUFLLFVBQVUsc0JBQXNCLENBQUMsRUFDbkQsS0FBSyxFQUNMLFNBQVMsRUFDeUI7SUFDbEMsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBdUIsd0JBQWMsQ0FBQyxDQUFBO0lBRXZFLE1BQU0sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEdBQUcsTUFBTSxJQUFBLDhCQUFzQixFQUN2RCxTQUFTLEVBQ1QsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQ2YsQ0FBQTtJQUVELE1BQU0sZ0JBQWdCLEdBQUcsU0FBUyxDQUFDLE1BQU07UUFDdkMsQ0FBQyxDQUFDLE1BQU0sSUFBQSx1Q0FBK0IsRUFBQyxTQUFTLEVBQUUsU0FBUyxDQUFDO1FBQzdELENBQUMsQ0FBQyxFQUFFLENBQUE7SUFFTixNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMscUJBQVMsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLENBQUE7QUFDakUsQ0FBQztBQUVZLFFBQUEsTUFBTSxHQUFxQjtJQUN0QyxLQUFLLEVBQUUseUJBQWEsQ0FBQyxnQkFBZ0I7SUFDckMsT0FBTyxFQUFFO1FBQ1AsWUFBWSxFQUFFLGtDQUFrQztLQUNqRDtDQUNGLENBQUEifQ==