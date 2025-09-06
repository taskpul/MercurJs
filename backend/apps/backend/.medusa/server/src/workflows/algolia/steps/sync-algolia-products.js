"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncAlgoliaProductsStep = void 0;
const utils_1 = require("@medusajs/framework/utils");
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const algolia_1 = require("@mercurjs/algolia");
const framework_1 = require("@mercurjs/framework");
const CHUNK_SIZE = 100;
exports.syncAlgoliaProductsStep = (0, workflows_sdk_1.createStep)('sync-algolia-products', async (_, { container }) => {
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const algolia = container.resolve(algolia_1.ALGOLIA_MODULE);
    const { data: productsToDelete } = await query.graph({
        entity: 'product',
        filters: {
            $or: [
                {
                    deleted_at: {
                        $ne: null
                    }
                },
                {
                    status: {
                        $ne: 'published'
                    }
                }
            ]
        },
        fields: ['id']
    });
    await algolia.batchDelete(framework_1.IndexType.PRODUCT, productsToDelete.map((p) => p.id));
    const { data: publishedProducts } = await query.graph({
        entity: 'product',
        filters: {
            status: 'published'
        },
        fields: ['id']
    });
    const productsToInsert = publishedProducts.map((p) => p.id);
    const productChunks = [];
    for (let i = 0; i < productsToInsert.length; i += CHUNK_SIZE) {
        productChunks.push(productsToInsert.slice(i, i + CHUNK_SIZE));
    }
    const eventBus = container.resolve(utils_1.Modules.EVENT_BUS);
    for (const chunk of productChunks) {
        await eventBus.emit({
            name: framework_1.AlgoliaEvents.PRODUCTS_CHANGED,
            data: {
                ids: chunk
            }
        });
    }
    return new workflows_sdk_1.StepResponse();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luYy1hbGdvbGlhLXByb2R1Y3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9hbGdvbGlhL3N0ZXBzL3N5bmMtYWxnb2xpYS1wcm9kdWN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxREFBOEU7QUFDOUUscUVBQTRFO0FBRTVFLCtDQUF3RTtBQUN4RSxtREFBOEQ7QUFFOUQsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFBO0FBRVQsUUFBQSx1QkFBdUIsR0FBRyxJQUFBLDBCQUFVLEVBQy9DLHVCQUF1QixFQUN2QixLQUFLLEVBQUUsQ0FBTyxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUMvQixNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2hFLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQXVCLHdCQUFjLENBQUMsQ0FBQTtJQUV2RSxNQUFNLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ25ELE1BQU0sRUFBRSxTQUFTO1FBQ2pCLE9BQU8sRUFBRTtZQUNQLEdBQUcsRUFBRTtnQkFDSDtvQkFDRSxVQUFVLEVBQUU7d0JBQ1YsR0FBRyxFQUFFLElBQUk7cUJBQ1Y7aUJBQ0Y7Z0JBQ0Q7b0JBQ0UsTUFBTSxFQUFFO3dCQUNOLEdBQUcsRUFBRSxXQUFXO3FCQUNqQjtpQkFDRjthQUNGO1NBQ0Y7UUFDRCxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7S0FDZixDQUFDLENBQUE7SUFFRixNQUFNLE9BQU8sQ0FBQyxXQUFXLENBQ3ZCLHFCQUFTLENBQUMsT0FBTyxFQUNqQixnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FDbEMsQ0FBQTtJQUVELE1BQU0sRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDcEQsTUFBTSxFQUFFLFNBQVM7UUFDakIsT0FBTyxFQUFFO1lBQ1AsTUFBTSxFQUFFLFdBQVc7U0FDcEI7UUFDRCxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7S0FDZixDQUFDLENBQUE7SUFFRixNQUFNLGdCQUFnQixHQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQzNELE1BQU0sYUFBYSxHQUFlLEVBQUUsQ0FBQTtJQUNwQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUM3RCxhQUFhLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUE7SUFDL0QsQ0FBQztJQUVELE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsZUFBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3JELEtBQUssTUFBTSxLQUFLLElBQUksYUFBYSxFQUFFLENBQUM7UUFDbEMsTUFBTSxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ2xCLElBQUksRUFBRSx5QkFBYSxDQUFDLGdCQUFnQjtZQUNwQyxJQUFJLEVBQUU7Z0JBQ0osR0FBRyxFQUFFLEtBQUs7YUFDWDtTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxPQUFPLElBQUksNEJBQVksRUFBRSxDQUFBO0FBQzNCLENBQUMsQ0FDRixDQUFBIn0=