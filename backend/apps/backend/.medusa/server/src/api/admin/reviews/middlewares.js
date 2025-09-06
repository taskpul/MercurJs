"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewsMiddlewares = void 0;
const framework_1 = require("@medusajs/framework");
const apply_reference_filter_1 = require("../../../shared/infra/http/middlewares/apply-reference-filter");
const query_config_1 = require("./query-config");
const validators_1 = require("./validators");
exports.reviewsMiddlewares = [
    {
        method: ['GET'],
        matcher: '/admin/reviews',
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetReviewsParams, query_config_1.adminReviewsConfig.list),
            (0, apply_reference_filter_1.applyReferenceFilter)()
        ]
    },
    {
        method: ['GET'],
        matcher: '/admin/reviews/:id',
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetReviewsParams, query_config_1.adminReviewsConfig.retrieve)
        ]
    }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3Jldmlld3MvbWlkZGxld2FyZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbURBQStEO0FBRy9ELDBHQUFvRztBQUNwRyxpREFBbUQ7QUFDbkQsNkNBQW9EO0FBRXZDLFFBQUEsa0JBQWtCLEdBQXNCO0lBQ25EO1FBQ0UsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDO1FBQ2YsT0FBTyxFQUFFLGdCQUFnQjtRQUN6QixXQUFXLEVBQUU7WUFDWCxJQUFBLHFDQUF5QixFQUFDLGtDQUFxQixFQUFFLGlDQUFrQixDQUFDLElBQUksQ0FBQztZQUN6RSxJQUFBLDZDQUFvQixHQUFFO1NBQ3ZCO0tBQ0Y7SUFDRDtRQUNFLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQztRQUNmLE9BQU8sRUFBRSxvQkFBb0I7UUFDN0IsV0FBVyxFQUFFO1lBQ1gsSUFBQSxxQ0FBeUIsRUFDdkIsa0NBQXFCLEVBQ3JCLGlDQUFrQixDQUFDLFFBQVEsQ0FDNUI7U0FDRjtLQUNGO0NBQ0YsQ0FBQSJ9