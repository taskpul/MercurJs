"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWishlistEntryStep = void 0;
const utils_1 = require("@medusajs/framework/utils");
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const wishlist_1 = require("@mercurjs/wishlist");
const wishlist_2 = require("@mercurjs/wishlist");
exports.createWishlistEntryStep = (0, workflows_sdk_1.createStep)('create-wishlist', async (input, { container }) => {
    const service = container.resolve(wishlist_1.WISHLIST_MODULE);
    const link = container.resolve(utils_1.ContainerRegistrationKeys.LINK);
    let wishlist = await (0, wishlist_2.getWishlistFromCustomerId)(container, input.customer_id);
    if (!wishlist) {
        wishlist = await service.createWishlists(input);
        link.create([
            {
                [utils_1.Modules.CUSTOMER]: {
                    customer_id: input.customer_id
                },
                [wishlist_1.WISHLIST_MODULE]: {
                    wishlist_id: wishlist.id
                }
            }
        ]);
    }
    await link.create([
        {
            [wishlist_1.WISHLIST_MODULE]: {
                wishlist_id: wishlist.id
            },
            [utils_1.Modules.PRODUCT]: {
                product_id: input.reference_id
            }
        }
    ]);
    return new workflows_sdk_1.StepResponse(wishlist);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXdpc2hsaXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy93aXNobGlzdC9zdGVwcy9jcmVhdGUtd2lzaGxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscURBQThFO0FBQzlFLHFFQUE0RTtBQUc1RSxpREFBb0Q7QUFFcEQsaURBQThEO0FBRWpELFFBQUEsdUJBQXVCLEdBQUcsSUFBQSwwQkFBVSxFQUMvQyxpQkFBaUIsRUFDakIsS0FBSyxFQUFFLEtBQXdCLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO0lBQ2hELE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQXdCLDBCQUFlLENBQUMsQ0FBQTtJQUN6RSxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLElBQUksQ0FBQyxDQUFBO0lBRTlELElBQUksUUFBUSxHQUFHLE1BQU0sSUFBQSxvQ0FBeUIsRUFBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQzVFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNkLFFBQVEsR0FBRyxNQUFNLE9BQU8sQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNWO2dCQUNFLENBQUMsZUFBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUNsQixXQUFXLEVBQUUsS0FBSyxDQUFDLFdBQVc7aUJBQy9CO2dCQUNELENBQUMsMEJBQWUsQ0FBQyxFQUFFO29CQUNqQixXQUFXLEVBQUUsUUFBUSxDQUFDLEVBQUU7aUJBQ3pCO2FBQ0Y7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ2hCO1lBQ0UsQ0FBQywwQkFBZSxDQUFDLEVBQUU7Z0JBQ2pCLFdBQVcsRUFBRSxRQUFRLENBQUMsRUFBRTthQUN6QjtZQUNELENBQUMsZUFBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNqQixVQUFVLEVBQUUsS0FBSyxDQUFDLFlBQVk7YUFDL0I7U0FDRjtLQUNGLENBQUMsQ0FBQTtJQUNGLE9BQU8sSUFBSSw0QkFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQ25DLENBQUMsQ0FDRixDQUFBIn0=