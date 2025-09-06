"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeMiddlewares = void 0;
const framework_1 = require("@medusajs/framework");
const middlewares_1 = require("./carts/middlewares");
const middlewares_2 = require("./order-set/middlewares");
const middlewares_3 = require("./return-request/middlewares");
const middlewares_4 = require("./returns/middlewares");
const middlewares_5 = require("./reviews/middlewares");
const middlewares_6 = require("./seller/middlewares");
const middlewares_7 = require("./shipping-options/middlewares");
const middlewares_8 = require("./wishlist/middlewares");
exports.storeMiddlewares = [
    {
        matcher: '/store/reviews/*',
        middlewares: [(0, framework_1.authenticate)('customer', ['bearer', 'session'])]
    },
    {
        matcher: '/store/return-request/*',
        middlewares: [(0, framework_1.authenticate)('customer', ['bearer', 'session'])]
    },
    ...middlewares_1.storeCartsMiddlewares,
    ...middlewares_3.storeOrderReturnRequestsMiddlewares,
    ...middlewares_2.storeOrderSetMiddlewares,
    ...middlewares_5.storeReviewMiddlewares,
    ...middlewares_6.storeSellerMiddlewares,
    ...middlewares_7.storeShippingOptionRoutesMiddlewares,
    ...middlewares_8.storeWishlistMiddlewares,
    ...middlewares_4.storeReturnsMiddlewares
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL21pZGRsZXdhcmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1EQUFtRTtBQUVuRSxxREFBMkQ7QUFDM0QseURBQWtFO0FBQ2xFLDhEQUFrRjtBQUNsRix1REFBK0Q7QUFDL0QsdURBQThEO0FBQzlELHNEQUE2RDtBQUM3RCxnRUFBcUY7QUFDckYsd0RBQWlFO0FBRXBELFFBQUEsZ0JBQWdCLEdBQXNCO0lBQ2pEO1FBQ0UsT0FBTyxFQUFFLGtCQUFrQjtRQUMzQixXQUFXLEVBQUUsQ0FBQyxJQUFBLHdCQUFZLEVBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7S0FDL0Q7SUFDRDtRQUNFLE9BQU8sRUFBRSx5QkFBeUI7UUFDbEMsV0FBVyxFQUFFLENBQUMsSUFBQSx3QkFBWSxFQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0tBQy9EO0lBQ0QsR0FBRyxtQ0FBcUI7SUFDeEIsR0FBRyxpREFBbUM7SUFDdEMsR0FBRyxzQ0FBd0I7SUFDM0IsR0FBRyxvQ0FBc0I7SUFDekIsR0FBRyxvQ0FBc0I7SUFDekIsR0FBRyxrREFBb0M7SUFDdkMsR0FBRyxzQ0FBd0I7SUFDM0IsR0FBRyxxQ0FBdUI7Q0FDM0IsQ0FBQSJ9