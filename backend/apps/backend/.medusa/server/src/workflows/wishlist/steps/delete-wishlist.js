"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWishlistEntryStep = void 0;
const utils_1 = require("@medusajs/framework/utils");
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const wishlist_1 = require("@mercurjs/wishlist");
exports.deleteWishlistEntryStep = (0, workflows_sdk_1.createStep)('delete-wishlist', async (input, { container }) => {
    const { id, reference_id } = input;
    const link = container.resolve(utils_1.ContainerRegistrationKeys.LINK);
    await link.dismiss([
        {
            [wishlist_1.WISHLIST_MODULE]: {
                wishlist_id: id
            },
            [utils_1.Modules.PRODUCT]: {
                product_id: reference_id
            }
        }
    ]);
    return new workflows_sdk_1.StepResponse({ id, reference_id });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLXdpc2hsaXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy93aXNobGlzdC9zdGVwcy9kZWxldGUtd2lzaGxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscURBQThFO0FBQzlFLHFFQUE0RTtBQUc1RSxpREFBb0Q7QUFFdkMsUUFBQSx1QkFBdUIsR0FBRyxJQUFBLDBCQUFVLEVBQy9DLGlCQUFpQixFQUNqQixLQUFLLEVBQUUsS0FBd0IsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDaEQsTUFBTSxFQUFFLEVBQUUsRUFBRSxZQUFZLEVBQUUsR0FBRyxLQUFLLENBQUE7SUFDbEMsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxpQ0FBeUIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUU5RCxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDakI7WUFDRSxDQUFDLDBCQUFlLENBQUMsRUFBRTtnQkFDakIsV0FBVyxFQUFFLEVBQUU7YUFDaEI7WUFDRCxDQUFDLGVBQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDakIsVUFBVSxFQUFFLFlBQVk7YUFDekI7U0FDRjtLQUNGLENBQUMsQ0FBQTtJQUVGLE9BQU8sSUFBSSw0QkFBWSxDQUFDLEVBQUUsRUFBRSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUE7QUFDL0MsQ0FBQyxDQUNGLENBQUEifQ==