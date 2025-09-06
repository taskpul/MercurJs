"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorReturnRequestsMiddlewares = void 0;
const framework_1 = require("@medusajs/framework");
const seller_return_request_1 = __importDefault(require("../../../links/seller-return-request"));
const middlewares_1 = require("../../../shared/infra/http/middlewares");
const query_config_1 = require("./query-config");
const validators_1 = require("./validators");
exports.vendorReturnRequestsMiddlewares = [
    {
        method: ['GET'],
        matcher: '/vendor/return-request',
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.VendorGetOrderReturnRequestParams, query_config_1.vendorReturnOrderRequestQueryConfig.list),
            (0, middlewares_1.filterBySellerId)()
        ]
    },
    {
        method: ['GET'],
        matcher: '/vendor/return-request/:id',
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.VendorGetOrderReturnRequestParams, query_config_1.vendorReturnOrderRequestQueryConfig.retrieve),
            (0, middlewares_1.checkResourceOwnershipByResourceId)({
                entryPoint: seller_return_request_1.default.entryPoint,
                filterField: 'order_return_request_id'
            })
        ]
    },
    {
        method: ['POST'],
        matcher: '/vendor/return-request/:id',
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.VendorGetOrderReturnRequestParams, query_config_1.vendorReturnOrderRequestQueryConfig.retrieve),
            (0, framework_1.validateAndTransformBody)(validators_1.VendorUpdateOrderReturnRequest),
            (0, middlewares_1.checkResourceOwnershipByResourceId)({
                entryPoint: seller_return_request_1.default.entryPoint,
                filterField: 'order_return_request_id'
            })
        ]
    }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3ZlbmRvci9yZXR1cm4tcmVxdWVzdC9taWRkbGV3YXJlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxtREFJNEI7QUFFNUIsaUdBQXNFO0FBQ3RFLHdFQUcrQztBQUMvQyxpREFBb0U7QUFDcEUsNkNBR3FCO0FBRVIsUUFBQSwrQkFBK0IsR0FBc0I7SUFDaEU7UUFDRSxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFDZixPQUFPLEVBQUUsd0JBQXdCO1FBQ2pDLFdBQVcsRUFBRTtZQUNYLElBQUEscUNBQXlCLEVBQ3ZCLDhDQUFpQyxFQUNqQyxrREFBbUMsQ0FBQyxJQUFJLENBQ3pDO1lBQ0QsSUFBQSw4QkFBZ0IsR0FBRTtTQUNuQjtLQUNGO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFDZixPQUFPLEVBQUUsNEJBQTRCO1FBQ3JDLFdBQVcsRUFBRTtZQUNYLElBQUEscUNBQXlCLEVBQ3ZCLDhDQUFpQyxFQUNqQyxrREFBbUMsQ0FBQyxRQUFRLENBQzdDO1lBQ0QsSUFBQSxnREFBa0MsRUFBQztnQkFDakMsVUFBVSxFQUFFLCtCQUFtQixDQUFDLFVBQVU7Z0JBQzFDLFdBQVcsRUFBRSx5QkFBeUI7YUFDdkMsQ0FBQztTQUNIO0tBQ0Y7SUFDRDtRQUNFLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUNoQixPQUFPLEVBQUUsNEJBQTRCO1FBQ3JDLFdBQVcsRUFBRTtZQUNYLElBQUEscUNBQXlCLEVBQ3ZCLDhDQUFpQyxFQUNqQyxrREFBbUMsQ0FBQyxRQUFRLENBQzdDO1lBQ0QsSUFBQSxvQ0FBd0IsRUFBQywyQ0FBOEIsQ0FBQztZQUN4RCxJQUFBLGdEQUFrQyxFQUFDO2dCQUNqQyxVQUFVLEVBQUUsK0JBQW1CLENBQUMsVUFBVTtnQkFDMUMsV0FBVyxFQUFFLHlCQUF5QjthQUN2QyxDQUFDO1NBQ0g7S0FDRjtDQUNGLENBQUEifQ==