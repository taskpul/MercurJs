"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnRequestsMiddlewares = void 0;
const framework_1 = require("@medusajs/framework");
const apply_request_status_filter_1 = require("../../../shared/infra/http/middlewares/apply-request-status-filter");
const query_config_1 = require("./query-config");
const validators_1 = require("./validators");
exports.returnRequestsMiddlewares = [
    {
        method: ['GET'],
        matcher: '/admin/return-request',
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrderReturnRequestParams, query_config_1.adminReturnOrderRequestQueryConfig.list),
            (0, apply_request_status_filter_1.applyRequestsStatusFilter)()
        ]
    },
    {
        method: ['GET'],
        matcher: '/admin/return-request/:id',
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrderReturnRequestParams, query_config_1.adminReturnOrderRequestQueryConfig.retrieve)
        ]
    },
    {
        method: ['POST'],
        matcher: '/admin/return-request/:id',
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrderReturnRequestParams, query_config_1.adminReturnOrderRequestQueryConfig.retrieve),
            (0, framework_1.validateAndTransformBody)(validators_1.AdminUpdateOrderReturnRequest)
        ]
    }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3JldHVybi1yZXF1ZXN0L21pZGRsZXdhcmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1EQUk0QjtBQUU1QixvSEFBOEc7QUFDOUcsaURBQW1FO0FBQ25FLDZDQUdxQjtBQUVSLFFBQUEseUJBQXlCLEdBQXNCO0lBQzFEO1FBQ0UsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDO1FBQ2YsT0FBTyxFQUFFLHVCQUF1QjtRQUNoQyxXQUFXLEVBQUU7WUFDWCxJQUFBLHFDQUF5QixFQUN2Qiw2Q0FBZ0MsRUFDaEMsaURBQWtDLENBQUMsSUFBSSxDQUN4QztZQUNELElBQUEsdURBQXlCLEdBQUU7U0FDNUI7S0FDRjtJQUNEO1FBQ0UsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDO1FBQ2YsT0FBTyxFQUFFLDJCQUEyQjtRQUNwQyxXQUFXLEVBQUU7WUFDWCxJQUFBLHFDQUF5QixFQUN2Qiw2Q0FBZ0MsRUFDaEMsaURBQWtDLENBQUMsUUFBUSxDQUM1QztTQUNGO0tBQ0Y7SUFDRDtRQUNFLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUNoQixPQUFPLEVBQUUsMkJBQTJCO1FBQ3BDLFdBQVcsRUFBRTtZQUNYLElBQUEscUNBQXlCLEVBQ3ZCLDZDQUFnQyxFQUNoQyxpREFBa0MsQ0FBQyxRQUFRLENBQzVDO1lBQ0QsSUFBQSxvQ0FBd0IsRUFBQywwQ0FBNkIsQ0FBQztTQUN4RDtLQUNGO0NBQ0YsQ0FBQSJ9