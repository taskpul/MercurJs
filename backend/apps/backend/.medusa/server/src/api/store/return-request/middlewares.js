"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeOrderReturnRequestsMiddlewares = void 0;
const framework_1 = require("@medusajs/framework");
const check_customer_ownership_1 = require("../../../shared/infra/http/middlewares/check-customer-ownership");
const query_config_1 = require("./query-config");
const validators_1 = require("./validators");
exports.storeOrderReturnRequestsMiddlewares = [
    {
        method: ['GET'],
        matcher: '/store/return-request',
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreGetOrderReturnRequestParams, query_config_1.storeReturnOrderRequestQueryConfig.list)
        ]
    },
    {
        method: ['POST'],
        matcher: '/store/return-request',
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.StoreCreateReturnRequest),
            (0, check_customer_ownership_1.checkCustomerResourceOwnershipByResourceId)({
                entryPoint: 'order',
                resourceId: (req) => {
                    return req.validatedBody.order_id;
                }
            })
        ]
    },
    {
        method: ['GET'],
        matcher: '/store/return-request/:id',
        middlewares: [
            (0, check_customer_ownership_1.checkCustomerResourceOwnershipByResourceId)({
                entryPoint: 'order_return_request'
            }),
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreGetOrderReturnRequestParams, query_config_1.storeReturnOrderRequestQueryConfig.retrieve)
        ]
    }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL3JldHVybi1yZXF1ZXN0L21pZGRsZXdhcmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1EQUs0QjtBQUU1Qiw4R0FBNEg7QUFDNUgsaURBQW1FO0FBQ25FLDZDQUlxQjtBQUVSLFFBQUEsbUNBQW1DLEdBQXNCO0lBQ3BFO1FBQ0UsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDO1FBQ2YsT0FBTyxFQUFFLHVCQUF1QjtRQUNoQyxXQUFXLEVBQUU7WUFDWCxJQUFBLHFDQUF5QixFQUN2Qiw2Q0FBZ0MsRUFDaEMsaURBQWtDLENBQUMsSUFBSSxDQUN4QztTQUNGO0tBQ0Y7SUFDRDtRQUNFLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUNoQixPQUFPLEVBQUUsdUJBQXVCO1FBQ2hDLFdBQVcsRUFBRTtZQUNYLElBQUEsb0NBQXdCLEVBQUMscUNBQXdCLENBQUM7WUFDbEQsSUFBQSxxRUFBMEMsRUFBQztnQkFDekMsVUFBVSxFQUFFLE9BQU87Z0JBQ25CLFVBQVUsRUFBRSxDQUNWLEdBQTZELEVBQzdELEVBQUU7b0JBQ0YsT0FBTyxHQUFHLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQTtnQkFDbkMsQ0FBQzthQUNGLENBQUM7U0FDSDtLQUNGO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFDZixPQUFPLEVBQUUsMkJBQTJCO1FBQ3BDLFdBQVcsRUFBRTtZQUNYLElBQUEscUVBQTBDLEVBQUM7Z0JBQ3pDLFVBQVUsRUFBRSxzQkFBc0I7YUFDbkMsQ0FBQztZQUNGLElBQUEscUNBQXlCLEVBQ3ZCLDZDQUFnQyxFQUNoQyxpREFBa0MsQ0FBQyxRQUFRLENBQzVDO1NBQ0Y7S0FDRjtDQUNGLENBQUEifQ==