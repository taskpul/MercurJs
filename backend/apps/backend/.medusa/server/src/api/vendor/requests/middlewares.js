"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorRequestsMiddlewares = void 0;
const framework_1 = require("@medusajs/framework");
const seller_request_1 = __importDefault(require("../../../links/seller-request"));
const middlewares_1 = require("../../../shared/infra/http/middlewares");
const apply_request_status_filter_1 = require("../../../shared/infra/http/middlewares/apply-request-status-filter");
const apply_request_type_filter_1 = require("../../../shared/infra/http/middlewares/apply-request-type-filter");
const query_config_1 = require("./query-config");
const validators_1 = require("./validators");
exports.vendorRequestsMiddlewares = [
    {
        method: ['GET'],
        matcher: '/vendor/requests',
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.VendorGetRequestsParams, query_config_1.vendorRequestsConfig.list),
            (0, middlewares_1.filterBySellerId)(),
            (0, apply_request_status_filter_1.applyRequestsStatusFilter)(),
            (0, apply_request_type_filter_1.applyRequestsTypeFilter)()
        ]
    },
    {
        method: ['GET'],
        matcher: '/vendor/requests/:id',
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.VendorGetRequestsParams, query_config_1.vendorRequestsConfig.retrieve),
            (0, middlewares_1.checkResourceOwnershipByResourceId)({
                entryPoint: seller_request_1.default.entryPoint,
                filterField: 'request_id'
            })
        ]
    },
    {
        method: ['POST'],
        matcher: '/vendor/requests/:id',
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.VendorUpdateRequestData),
            (0, framework_1.validateAndTransformQuery)(validators_1.VendorGetRequestsParams, query_config_1.vendorRequestsConfig.retrieve),
            (0, middlewares_1.checkResourceOwnershipByResourceId)({
                entryPoint: seller_request_1.default.entryPoint,
                filterField: 'request_id'
            })
        ]
    },
    {
        method: ['POST'],
        matcher: '/vendor/requests',
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.VendorCreateRequest),
            (0, framework_1.validateAndTransformQuery)(validators_1.VendorGetRequestsParams, query_config_1.vendorRequestsConfig.retrieve)
        ]
    }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3ZlbmRvci9yZXF1ZXN0cy9taWRkbGV3YXJlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxtREFJNEI7QUFFNUIsbUZBQXlEO0FBQ3pELHdFQUcrQztBQUMvQyxvSEFBOEc7QUFDOUcsZ0hBQTBHO0FBQzFHLGlEQUFxRDtBQUNyRCw2Q0FJcUI7QUFFUixRQUFBLHlCQUF5QixHQUFzQjtJQUMxRDtRQUNFLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQztRQUNmLE9BQU8sRUFBRSxrQkFBa0I7UUFDM0IsV0FBVyxFQUFFO1lBQ1gsSUFBQSxxQ0FBeUIsRUFDdkIsb0NBQXVCLEVBQ3ZCLG1DQUFvQixDQUFDLElBQUksQ0FDMUI7WUFDRCxJQUFBLDhCQUFnQixHQUFFO1lBQ2xCLElBQUEsdURBQXlCLEdBQUU7WUFDM0IsSUFBQSxtREFBdUIsR0FBRTtTQUMxQjtLQUNGO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFDZixPQUFPLEVBQUUsc0JBQXNCO1FBQy9CLFdBQVcsRUFBRTtZQUNYLElBQUEscUNBQXlCLEVBQ3ZCLG9DQUF1QixFQUN2QixtQ0FBb0IsQ0FBQyxRQUFRLENBQzlCO1lBQ0QsSUFBQSxnREFBa0MsRUFBQztnQkFDakMsVUFBVSxFQUFFLHdCQUFhLENBQUMsVUFBVTtnQkFDcEMsV0FBVyxFQUFFLFlBQVk7YUFDMUIsQ0FBQztTQUNIO0tBQ0Y7SUFDRDtRQUNFLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUNoQixPQUFPLEVBQUUsc0JBQXNCO1FBQy9CLFdBQVcsRUFBRTtZQUNYLElBQUEsb0NBQXdCLEVBQUMsb0NBQXVCLENBQUM7WUFDakQsSUFBQSxxQ0FBeUIsRUFDdkIsb0NBQXVCLEVBQ3ZCLG1DQUFvQixDQUFDLFFBQVEsQ0FDOUI7WUFDRCxJQUFBLGdEQUFrQyxFQUFDO2dCQUNqQyxVQUFVLEVBQUUsd0JBQWEsQ0FBQyxVQUFVO2dCQUNwQyxXQUFXLEVBQUUsWUFBWTthQUMxQixDQUFDO1NBQ0g7S0FDRjtJQUNEO1FBQ0UsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDO1FBQ2hCLE9BQU8sRUFBRSxrQkFBa0I7UUFDM0IsV0FBVyxFQUFFO1lBQ1gsSUFBQSxvQ0FBd0IsRUFBQyxnQ0FBbUIsQ0FBQztZQUM3QyxJQUFBLHFDQUF5QixFQUN2QixvQ0FBdUIsRUFDdkIsbUNBQW9CLENBQUMsUUFBUSxDQUM5QjtTQUNGO0tBQ0Y7Q0FDRixDQUFBIn0=