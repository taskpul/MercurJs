"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorMiddlewares = void 0;
const framework_1 = require("@medusajs/framework");
const middlewares_1 = require("../../shared/infra/http/middlewares");
const utils_1 = require("../../shared/infra/http/utils");
const middlewares_2 = require("./attributes/middlewares");
const middlewares_3 = require("./campaigns/middlewares");
const middlewares_4 = require("./commission/middlewares");
const cors_1 = require("./cors");
const middlewares_5 = require("./customer-groups/middlewares");
const middlewares_6 = require("./customers/middlewares");
const middlewares_7 = require("./fulfillment-providers/middlewares");
const middlewares_8 = require("./fulfillment-sets/middlewares");
const middlewares_9 = require("./inventory-items/middlewares");
const middlewares_10 = require("./invites/middlewares");
const middlewares_11 = require("./me/middlewares");
const middlewares_12 = require("./members/middlewares");
const middlewares_13 = require("./notifications/middlewares");
const middlewares_14 = require("./orders/middlewares");
const middlewares_15 = require("./payout-account/middlewares");
const middlewares_16 = require("./payouts/middlewares");
const middlewares_17 = require("./price-lists/middlewares");
const middlewares_18 = require("./price-preferences/middlewares");
const middlewares_19 = require("./product-categories/middlewares");
const middlewares_20 = require("./product-collections/middlewares");
const middlewares_21 = require("./product-tags/middlewares");
const middlewares_22 = require("./product-types/middlewares");
const middlewares_23 = require("./products/middlewares");
const middlewares_24 = require("./promotions/middlewares");
const middlewares_25 = require("./regions/middlewares");
const middlewares_26 = require("./requests/middlewares");
const middlewares_27 = require("./reservations/middlewares");
const middlewares_28 = require("./return-request/middlewares");
const middlewares_29 = require("./returns/middlewares");
const middlewares_30 = require("./sales-channels/middlewares");
const middlewares_31 = require("./sellers/middlewares");
const middlewares_32 = require("./shipping-options/middlewares");
const middlewares_33 = require("./shipping-profiles/middlewares");
const middlewares_34 = require("./statistics/middlewares");
const middlewares_35 = require("./stock-locations/middlewares");
const middlewares_36 = require("./stores/middlewares");
const middlewares_37 = require("./uploads/middlewares");
exports.vendorMiddlewares = [
    {
        matcher: '/vendor*',
        middlewares: [cors_1.vendorCors]
    },
    /**
     * @desc Here we are authenticating the seller routes
     * except for the route for creating a seller
     * and the route for accepting a member invite
     */
    {
        matcher: '/vendor/sellers',
        method: ['POST'],
        middlewares: [
            (0, framework_1.authenticate)('seller', ['bearer', 'session'], {
                allowUnregistered: true
            })
        ]
    },
    {
        matcher: '/vendor/invites/accept',
        method: ['POST'],
        middlewares: [
            (0, framework_1.authenticate)('seller', ['bearer', 'session'], {
                allowUnregistered: true
            })
        ]
    },
    {
        matcher: '/vendor/*',
        middlewares: [
            (0, utils_1.unlessBaseUrl)(/^\/vendor\/(sellers|invites\/accept)$/, (0, middlewares_1.checkSellerApproved)(['bearer', 'session'])),
            (0, utils_1.unlessBaseUrl)(/^\/vendor\/(sellers|invites\/accept)$/, (0, framework_1.authenticate)('seller', ['bearer', 'session'], {
                allowUnregistered: false
            })),
            (0, utils_1.unlessBaseUrl)(/^\/vendor\/(sellers|orders|fulfillment|invites\/accept)/, middlewares_1.storeActiveGuard)
        ]
    },
    ...middlewares_11.vendorMeMiddlewares,
    ...middlewares_31.vendorSellersMiddlewares,
    ...middlewares_12.vendorMembersMiddlewares,
    ...middlewares_23.vendorProductsMiddlewares,
    ...middlewares_10.vendorInvitesMiddlewares,
    ...middlewares_8.vendorFulfillmentSetsMiddlewares,
    ...middlewares_35.vendorStockLocationsMiddlewares,
    ...middlewares_32.vendorShippingOptionsMiddlewares,
    ...middlewares_15.vendorPayoutAccountMiddlewares,
    ...middlewares_9.vendorInventoryItemsMiddlewares,
    ...middlewares_16.vendorPayoutMiddlewares,
    ...middlewares_14.vendorOrderMiddlewares,
    ...middlewares_28.vendorReturnRequestsMiddlewares,
    ...middlewares_9.vendorInventoryItemsMiddlewares,
    ...middlewares_26.vendorRequestsMiddlewares,
    ...middlewares_30.vendorSalesChannelMiddlewares,
    ...middlewares_6.vendorCustomersMiddlewares,
    ...middlewares_5.vendorCustomerGroupsMiddlewares,
    ...middlewares_36.vendorStoresMiddlewares,
    ...middlewares_21.vendorProductTagsMiddlewares,
    ...middlewares_22.vendorProductTypesMiddlewares,
    ...middlewares_19.vendorProductCategoriesMiddlewares,
    ...middlewares_20.vendorProductCollectionsMiddlewares,
    ...middlewares_37.vendorUploadMiddlewares,
    ...middlewares_24.vendorPromotionsMiddlewares,
    ...middlewares_27.vendorReservationsMiddlewares,
    ...middlewares_17.vendorPriceListsMiddlewares,
    ...middlewares_24.vendorPromotionsMiddlewares,
    ...middlewares_3.vendorCampaignsMiddlewares,
    ...middlewares_34.vendorStatisticsMiddlewares,
    ...middlewares_7.vendorFulfillmentProvidersMiddlewares,
    ...middlewares_29.vendorReturnsMiddlewares,
    ...middlewares_33.vendorShippingProfilesMiddlewares,
    ...middlewares_25.vendorRegionsMiddlewares,
    ...middlewares_13.vendorNotificationMiddlewares,
    ...middlewares_4.vendorCommissionMiddlewares,
    ...middlewares_2.vendorAttributeMiddlewares,
    ...middlewares_18.vendorPricePreferencesRoutesMiddlewares
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3ZlbmRvci9taWRkbGV3YXJlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtREFBbUU7QUFFbkUscUVBRzRDO0FBQzVDLHlEQUE2RDtBQUM3RCwwREFBcUU7QUFDckUseURBQW9FO0FBQ3BFLDBEQUFzRTtBQUN0RSxpQ0FBbUM7QUFDbkMsK0RBQStFO0FBQy9FLHlEQUFvRTtBQUNwRSxxRUFBMkY7QUFDM0YsZ0VBQWlGO0FBQ2pGLCtEQUErRTtBQUMvRSx3REFBZ0U7QUFDaEUsbURBQXNEO0FBQ3RELHdEQUFnRTtBQUNoRSw4REFBMkU7QUFDM0UsdURBQTZEO0FBQzdELCtEQUE2RTtBQUM3RSx3REFBK0Q7QUFDL0QsNERBQXVFO0FBQ3ZFLGtFQUF5RjtBQUN6RixtRUFBcUY7QUFDckYsb0VBQXVGO0FBQ3ZGLDZEQUF5RTtBQUN6RSw4REFBMkU7QUFDM0UseURBQWtFO0FBQ2xFLDJEQUFzRTtBQUN0RSx3REFBZ0U7QUFDaEUseURBQWtFO0FBQ2xFLDZEQUEwRTtBQUMxRSwrREFBOEU7QUFDOUUsd0RBQWdFO0FBQ2hFLCtEQUE0RTtBQUM1RSx3REFBZ0U7QUFDaEUsaUVBQWlGO0FBQ2pGLGtFQUFtRjtBQUNuRiwyREFBc0U7QUFDdEUsZ0VBQStFO0FBQy9FLHVEQUE4RDtBQUM5RCx3REFBK0Q7QUFFbEQsUUFBQSxpQkFBaUIsR0FBc0I7SUFDbEQ7UUFDRSxPQUFPLEVBQUUsVUFBVTtRQUNuQixXQUFXLEVBQUUsQ0FBQyxpQkFBVSxDQUFDO0tBQzFCO0lBQ0Q7Ozs7T0FJRztJQUNIO1FBQ0UsT0FBTyxFQUFFLGlCQUFpQjtRQUMxQixNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDaEIsV0FBVyxFQUFFO1lBQ1gsSUFBQSx3QkFBWSxFQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsRUFBRTtnQkFDNUMsaUJBQWlCLEVBQUUsSUFBSTthQUN4QixDQUFDO1NBQ0g7S0FDRjtJQUNEO1FBQ0UsT0FBTyxFQUFFLHdCQUF3QjtRQUNqQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDaEIsV0FBVyxFQUFFO1lBQ1gsSUFBQSx3QkFBWSxFQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsRUFBRTtnQkFDNUMsaUJBQWlCLEVBQUUsSUFBSTthQUN4QixDQUFDO1NBQ0g7S0FDRjtJQUNEO1FBQ0UsT0FBTyxFQUFFLFdBQVc7UUFDcEIsV0FBVyxFQUFFO1lBQ1gsSUFBQSxxQkFBYSxFQUNYLHVDQUF1QyxFQUN2QyxJQUFBLGlDQUFtQixFQUFDLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQzNDO1lBQ0QsSUFBQSxxQkFBYSxFQUNYLHVDQUF1QyxFQUN2QyxJQUFBLHdCQUFZLEVBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxFQUFFO2dCQUM1QyxpQkFBaUIsRUFBRSxLQUFLO2FBQ3pCLENBQUMsQ0FDSDtZQUNELElBQUEscUJBQWEsRUFDWCx5REFBeUQsRUFDekQsOEJBQWdCLENBQ2pCO1NBQ0Y7S0FDRjtJQUNELEdBQUcsa0NBQW1CO0lBQ3RCLEdBQUcsdUNBQXdCO0lBQzNCLEdBQUcsdUNBQXdCO0lBQzNCLEdBQUcsd0NBQXlCO0lBQzVCLEdBQUcsdUNBQXdCO0lBQzNCLEdBQUcsOENBQWdDO0lBQ25DLEdBQUcsOENBQStCO0lBQ2xDLEdBQUcsK0NBQWdDO0lBQ25DLEdBQUcsNkNBQThCO0lBQ2pDLEdBQUcsNkNBQStCO0lBQ2xDLEdBQUcsc0NBQXVCO0lBQzFCLEdBQUcscUNBQXNCO0lBQ3pCLEdBQUcsOENBQStCO0lBQ2xDLEdBQUcsNkNBQStCO0lBQ2xDLEdBQUcsd0NBQXlCO0lBQzVCLEdBQUcsNENBQTZCO0lBQ2hDLEdBQUcsd0NBQTBCO0lBQzdCLEdBQUcsNkNBQStCO0lBQ2xDLEdBQUcsc0NBQXVCO0lBQzFCLEdBQUcsMkNBQTRCO0lBQy9CLEdBQUcsNENBQTZCO0lBQ2hDLEdBQUcsaURBQWtDO0lBQ3JDLEdBQUcsa0RBQW1DO0lBQ3RDLEdBQUcsc0NBQXVCO0lBQzFCLEdBQUcsMENBQTJCO0lBQzlCLEdBQUcsNENBQTZCO0lBQ2hDLEdBQUcsMENBQTJCO0lBQzlCLEdBQUcsMENBQTJCO0lBQzlCLEdBQUcsd0NBQTBCO0lBQzdCLEdBQUcsMENBQTJCO0lBQzlCLEdBQUcsbURBQXFDO0lBQ3hDLEdBQUcsdUNBQXdCO0lBQzNCLEdBQUcsZ0RBQWlDO0lBQ3BDLEdBQUcsdUNBQXdCO0lBQzNCLEdBQUcsNENBQTZCO0lBQ2hDLEdBQUcseUNBQTJCO0lBQzlCLEdBQUcsd0NBQTBCO0lBQzdCLEdBQUcsc0RBQXVDO0NBQzNDLENBQUEifQ==