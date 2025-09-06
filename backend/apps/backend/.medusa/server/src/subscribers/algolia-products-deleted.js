"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = productsDeletedHandler;
const algolia_1 = require("@mercurjs/algolia");
const framework_1 = require("@mercurjs/framework");
async function productsDeletedHandler({ event, container }) {
    const algolia = container.resolve(algolia_1.ALGOLIA_MODULE);
    await algolia.batchDelete(framework_1.IndexType.PRODUCT, event.data.ids);
}
exports.config = {
    event: framework_1.AlgoliaEvents.PRODUCTS_DELETED,
    context: {
        subscriberId: 'algolia-products-deleted-handler'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxnb2xpYS1wcm9kdWN0cy1kZWxldGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3N1YnNjcmliZXJzL2FsZ29saWEtcHJvZHVjdHMtZGVsZXRlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFLQSx5Q0FPQztBQVZELCtDQUF3RTtBQUN4RSxtREFBOEQ7QUFFL0MsS0FBSyxVQUFVLHNCQUFzQixDQUFDLEVBQ25ELEtBQUssRUFDTCxTQUFTLEVBQ3lCO0lBQ2xDLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQXVCLHdCQUFjLENBQUMsQ0FBQTtJQUV2RSxNQUFNLE9BQU8sQ0FBQyxXQUFXLENBQUMscUJBQVMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUM5RCxDQUFDO0FBRVksUUFBQSxNQUFNLEdBQXFCO0lBQ3RDLEtBQUssRUFBRSx5QkFBYSxDQUFDLGdCQUFnQjtJQUNyQyxPQUFPLEVBQUU7UUFDUCxZQUFZLEVBQUUsa0NBQWtDO0tBQ2pEO0NBQ0YsQ0FBQSJ9