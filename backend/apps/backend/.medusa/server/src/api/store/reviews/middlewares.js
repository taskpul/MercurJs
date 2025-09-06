"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeReviewMiddlewares = void 0;
const framework_1 = require("@medusajs/framework");
const customer_review_1 = __importDefault(require("../../../links/customer-review"));
const check_customer_ownership_1 = require("../../../shared/infra/http/middlewares/check-customer-ownership");
const query_config_1 = require("./query-config");
const validators_1 = require("./validators");
exports.storeReviewMiddlewares = [
    {
        method: ['GET'],
        matcher: '/store/reviews',
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreGetReviewsParams, query_config_1.storeReviewQueryConfig.list)
        ]
    },
    {
        method: ['POST'],
        matcher: '/store/reviews',
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreGetReviewsParams, query_config_1.storeReviewQueryConfig.retrieve),
            (0, framework_1.validateAndTransformBody)(validators_1.StoreCreateReview)
        ]
    },
    {
        method: ['GET'],
        matcher: '/store/reviews/:id',
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreGetReviewsParams, query_config_1.storeReviewQueryConfig.retrieve),
            (0, check_customer_ownership_1.checkCustomerResourceOwnershipByResourceId)({
                entryPoint: customer_review_1.default.entryPoint
            })
        ]
    },
    {
        method: ['DELETE'],
        matcher: '/store/reviews/:id',
        middlewares: [
            (0, check_customer_ownership_1.checkCustomerResourceOwnershipByResourceId)({
                entryPoint: customer_review_1.default.entryPoint
            })
        ]
    },
    {
        method: ['POST'],
        matcher: '/store/reviews/:id',
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreGetReviewsParams, query_config_1.storeReviewQueryConfig.retrieve),
            (0, framework_1.validateAndTransformBody)(validators_1.StoreUpdateReview),
            (0, check_customer_ownership_1.checkCustomerResourceOwnershipByResourceId)({
                entryPoint: customer_review_1.default.entryPoint
            })
        ]
    }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL3Jldmlld3MvbWlkZGxld2FyZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsbURBRzRCO0FBRzVCLHFGQUEyRDtBQUMzRCw4R0FBNEg7QUFDNUgsaURBQXVEO0FBQ3ZELDZDQUlxQjtBQUVSLFFBQUEsc0JBQXNCLEdBQXNCO0lBQ3ZEO1FBQ0UsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDO1FBQ2YsT0FBTyxFQUFFLGdCQUFnQjtRQUN6QixXQUFXLEVBQUU7WUFDWCxJQUFBLHFDQUF5QixFQUN2QixrQ0FBcUIsRUFDckIscUNBQXNCLENBQUMsSUFBSSxDQUM1QjtTQUNGO0tBQ0Y7SUFDRDtRQUNFLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUNoQixPQUFPLEVBQUUsZ0JBQWdCO1FBQ3pCLFdBQVcsRUFBRTtZQUNYLElBQUEscUNBQXlCLEVBQ3ZCLGtDQUFxQixFQUNyQixxQ0FBc0IsQ0FBQyxRQUFRLENBQ2hDO1lBQ0QsSUFBQSxvQ0FBd0IsRUFBQyw4QkFBaUIsQ0FBQztTQUM1QztLQUNGO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFDZixPQUFPLEVBQUUsb0JBQW9CO1FBQzdCLFdBQVcsRUFBRTtZQUNYLElBQUEscUNBQXlCLEVBQ3ZCLGtDQUFxQixFQUNyQixxQ0FBc0IsQ0FBQyxRQUFRLENBQ2hDO1lBQ0QsSUFBQSxxRUFBMEMsRUFBQztnQkFDekMsVUFBVSxFQUFFLHlCQUFjLENBQUMsVUFBVTthQUN0QyxDQUFDO1NBQ0g7S0FDRjtJQUNEO1FBQ0UsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ2xCLE9BQU8sRUFBRSxvQkFBb0I7UUFDN0IsV0FBVyxFQUFFO1lBQ1gsSUFBQSxxRUFBMEMsRUFBQztnQkFDekMsVUFBVSxFQUFFLHlCQUFjLENBQUMsVUFBVTthQUN0QyxDQUFDO1NBQ0g7S0FDRjtJQUNEO1FBQ0UsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDO1FBQ2hCLE9BQU8sRUFBRSxvQkFBb0I7UUFDN0IsV0FBVyxFQUFFO1lBQ1gsSUFBQSxxQ0FBeUIsRUFDdkIsa0NBQXFCLEVBQ3JCLHFDQUFzQixDQUFDLFFBQVEsQ0FDaEM7WUFDRCxJQUFBLG9DQUF3QixFQUFDLDhCQUFpQixDQUFDO1lBQzNDLElBQUEscUVBQTBDLEVBQUM7Z0JBQ3pDLFVBQVUsRUFBRSx5QkFBYyxDQUFDLFVBQVU7YUFDdEMsQ0FBQztTQUNIO0tBQ0Y7Q0FDRixDQUFBIn0=