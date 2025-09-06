"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorSellersMiddlewares = void 0;
const framework_1 = require("@medusajs/framework");
const seller_review_1 = __importDefault(require("../../../links/seller-review"));
const middlewares_1 = require("../../../shared/infra/http/middlewares");
const query_config_1 = require("./query-config");
const validators_1 = require("./validators");
exports.vendorSellersMiddlewares = [
    {
        method: ['POST'],
        matcher: '/vendor/sellers',
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.VendorCreateSeller),
            (0, framework_1.validateAndTransformQuery)(validators_1.VendorGetSellerParams, query_config_1.vendorSellerQueryConfig.retrieve)
        ]
    },
    {
        method: ['GET'],
        matcher: '/vendor/sellers/me',
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.VendorGetSellerParams, query_config_1.vendorSellerQueryConfig.list)
        ]
    },
    {
        method: ['POST'],
        matcher: '/vendor/sellers/me',
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.VendorUpdateSeller),
            (0, framework_1.validateAndTransformQuery)(validators_1.VendorGetSellerParams, query_config_1.vendorSellerQueryConfig.retrieve)
        ]
    },
    {
        method: ['GET', 'POST'],
        matcher: '/vendor/sellers/me/onboarding',
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.VendorGetOnboardingParams, query_config_1.vendorOnboardingQueryConfig.retrieve)
        ]
    },
    {
        method: ['GET'],
        matcher: '/vendor/sellers/me/reviews',
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.VendorGetReviewsParams, query_config_1.vendorReviewQueryConfig.list),
            (0, middlewares_1.filterBySellerId)()
        ]
    },
    {
        method: ['GET'],
        matcher: '/vendor/sellers/me/reviews/:id',
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.VendorGetReviewsParams, query_config_1.vendorReviewQueryConfig.retrieve),
            (0, middlewares_1.checkResourceOwnershipByResourceId)({
                entryPoint: seller_review_1.default.entryPoint,
                filterField: 'review_id'
            })
        ]
    },
    {
        method: ['POST'],
        matcher: '/vendor/sellers/me/reviews/:id',
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.VendorGetReviewsParams, query_config_1.vendorReviewQueryConfig.retrieve),
            (0, framework_1.validateAndTransformBody)(validators_1.VendorUpdateReview),
            (0, middlewares_1.checkResourceOwnershipByResourceId)({
                entryPoint: seller_review_1.default.entryPoint,
                filterField: 'review_id'
            })
        ]
    }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3ZlbmRvci9zZWxsZXJzL21pZGRsZXdhcmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG1EQUc0QjtBQUc1QixpRkFBdUQ7QUFDdkQsd0VBRytDO0FBQy9DLGlEQUl1QjtBQUN2Qiw2Q0FPcUI7QUFFUixRQUFBLHdCQUF3QixHQUFzQjtJQUN6RDtRQUNFLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUNoQixPQUFPLEVBQUUsaUJBQWlCO1FBQzFCLFdBQVcsRUFBRTtZQUNYLElBQUEsb0NBQXdCLEVBQUMsK0JBQWtCLENBQUM7WUFDNUMsSUFBQSxxQ0FBeUIsRUFDdkIsa0NBQXFCLEVBQ3JCLHNDQUF1QixDQUFDLFFBQVEsQ0FDakM7U0FDRjtLQUNGO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFDZixPQUFPLEVBQUUsb0JBQW9CO1FBQzdCLFdBQVcsRUFBRTtZQUNYLElBQUEscUNBQXlCLEVBQ3ZCLGtDQUFxQixFQUNyQixzQ0FBdUIsQ0FBQyxJQUFJLENBQzdCO1NBQ0Y7S0FDRjtJQUNEO1FBQ0UsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDO1FBQ2hCLE9BQU8sRUFBRSxvQkFBb0I7UUFDN0IsV0FBVyxFQUFFO1lBQ1gsSUFBQSxvQ0FBd0IsRUFBQywrQkFBa0IsQ0FBQztZQUM1QyxJQUFBLHFDQUF5QixFQUN2QixrQ0FBcUIsRUFDckIsc0NBQXVCLENBQUMsUUFBUSxDQUNqQztTQUNGO0tBQ0Y7SUFDRDtRQUNFLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7UUFDdkIsT0FBTyxFQUFFLCtCQUErQjtRQUN4QyxXQUFXLEVBQUU7WUFDWCxJQUFBLHFDQUF5QixFQUN2QixzQ0FBeUIsRUFDekIsMENBQTJCLENBQUMsUUFBUSxDQUNyQztTQUNGO0tBQ0Y7SUFDRDtRQUNFLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQztRQUNmLE9BQU8sRUFBRSw0QkFBNEI7UUFDckMsV0FBVyxFQUFFO1lBQ1gsSUFBQSxxQ0FBeUIsRUFDdkIsbUNBQXNCLEVBQ3RCLHNDQUF1QixDQUFDLElBQUksQ0FDN0I7WUFDRCxJQUFBLDhCQUFnQixHQUFFO1NBQ25CO0tBQ0Y7SUFDRDtRQUNFLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQztRQUNmLE9BQU8sRUFBRSxnQ0FBZ0M7UUFDekMsV0FBVyxFQUFFO1lBQ1gsSUFBQSxxQ0FBeUIsRUFDdkIsbUNBQXNCLEVBQ3RCLHNDQUF1QixDQUFDLFFBQVEsQ0FDakM7WUFDRCxJQUFBLGdEQUFrQyxFQUFDO2dCQUNqQyxVQUFVLEVBQUUsdUJBQVksQ0FBQyxVQUFVO2dCQUNuQyxXQUFXLEVBQUUsV0FBVzthQUN6QixDQUFDO1NBQ0g7S0FDRjtJQUNEO1FBQ0UsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDO1FBQ2hCLE9BQU8sRUFBRSxnQ0FBZ0M7UUFDekMsV0FBVyxFQUFFO1lBQ1gsSUFBQSxxQ0FBeUIsRUFDdkIsbUNBQXNCLEVBQ3RCLHNDQUF1QixDQUFDLFFBQVEsQ0FDakM7WUFDRCxJQUFBLG9DQUF3QixFQUFDLCtCQUFrQixDQUFDO1lBQzVDLElBQUEsZ0RBQWtDLEVBQUM7Z0JBQ2pDLFVBQVUsRUFBRSx1QkFBWSxDQUFDLFVBQVU7Z0JBQ25DLFdBQVcsRUFBRSxXQUFXO2FBQ3pCLENBQUM7U0FDSDtLQUNGO0NBQ0YsQ0FBQSJ9