"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestsMiddlewares = void 0;
const framework_1 = require("@medusajs/framework");
const apply_request_status_filter_1 = require("../../../shared/infra/http/middlewares/apply-request-status-filter");
const apply_request_type_filter_1 = require("../../../shared/infra/http/middlewares/apply-request-type-filter");
const query_config_1 = require("./query-config");
const validators_1 = require("./validators");
exports.requestsMiddlewares = [
    {
        method: ['GET'],
        matcher: '/admin/requests',
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetRequestsParams, query_config_1.adminRequestsConfig.list),
            (0, apply_request_status_filter_1.applyRequestsStatusFilter)(),
            (0, apply_request_type_filter_1.applyRequestsTypeFilter)()
        ]
    },
    {
        method: ['POST'],
        matcher: '/admin/requests/:id',
        middlewares: [(0, framework_1.validateAndTransformBody)(validators_1.AdminReviewRequest)]
    },
    {
        method: ['GET'],
        matcher: '/admin/requests/:id',
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetRequestsParams, query_config_1.adminRequestsConfig.retrieve)
        ]
    }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3JlcXVlc3RzL21pZGRsZXdhcmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1EQUc0QjtBQUc1QixvSEFBOEc7QUFDOUcsZ0hBQTBHO0FBQzFHLGlEQUFvRDtBQUNwRCw2Q0FBeUU7QUFFNUQsUUFBQSxtQkFBbUIsR0FBc0I7SUFDcEQ7UUFDRSxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFDZixPQUFPLEVBQUUsaUJBQWlCO1FBQzFCLFdBQVcsRUFBRTtZQUNYLElBQUEscUNBQXlCLEVBQ3ZCLG1DQUFzQixFQUN0QixrQ0FBbUIsQ0FBQyxJQUFJLENBQ3pCO1lBQ0QsSUFBQSx1REFBeUIsR0FBRTtZQUMzQixJQUFBLG1EQUF1QixHQUFFO1NBQzFCO0tBQ0Y7SUFDRDtRQUNFLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUNoQixPQUFPLEVBQUUscUJBQXFCO1FBQzlCLFdBQVcsRUFBRSxDQUFDLElBQUEsb0NBQXdCLEVBQUMsK0JBQWtCLENBQUMsQ0FBQztLQUM1RDtJQUNEO1FBQ0UsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDO1FBQ2YsT0FBTyxFQUFFLHFCQUFxQjtRQUM5QixXQUFXLEVBQUU7WUFDWCxJQUFBLHFDQUF5QixFQUN2QixtQ0FBc0IsRUFDdEIsa0NBQW1CLENBQUMsUUFBUSxDQUM3QjtTQUNGO0tBQ0Y7Q0FDRixDQUFBIn0=