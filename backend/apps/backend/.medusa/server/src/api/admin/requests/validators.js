"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminReviewRequest = exports.AdminGetRequestsParams = void 0;
const zod_1 = require("zod");
const validators_1 = require("@medusajs/medusa/api/utils/validators");
exports.AdminGetRequestsParams = (0, validators_1.createFindParams)({
    offset: 0,
    limit: 50
}).extend({
    type: zod_1.z
        .enum([
        'product_collection',
        'product_category',
        'product',
        'seller',
        'review_remove',
        'product_type',
        'product_tag',
        'product_update'
    ])
        .optional(),
    status: zod_1.z.enum(['accepted', 'rejected', 'pending']).optional()
});
exports.AdminReviewRequest = zod_1.z.object({
    status: zod_1.z.enum(['accepted', 'rejected']),
    reviewer_note: zod_1.z.string()
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcGkvYWRtaW4vcmVxdWVzdHMvdmFsaWRhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2QkFBdUI7QUFFdkIsc0VBQXdFO0FBRzNELFFBQUEsc0JBQXNCLEdBQUcsSUFBQSw2QkFBZ0IsRUFBQztJQUNyRCxNQUFNLEVBQUUsQ0FBQztJQUNULEtBQUssRUFBRSxFQUFFO0NBQ1YsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUNSLElBQUksRUFBRSxPQUFDO1NBQ0osSUFBSSxDQUFDO1FBQ0osb0JBQW9CO1FBQ3BCLGtCQUFrQjtRQUNsQixTQUFTO1FBQ1QsUUFBUTtRQUNSLGVBQWU7UUFDZixjQUFjO1FBQ2QsYUFBYTtRQUNiLGdCQUFnQjtLQUNqQixDQUFDO1NBQ0QsUUFBUSxFQUFFO0lBQ2IsTUFBTSxFQUFFLE9BQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO0NBQy9ELENBQUMsQ0FBQTtBQWtCVyxRQUFBLGtCQUFrQixHQUFHLE9BQUMsQ0FBQyxNQUFNLENBQUM7SUFDekMsTUFBTSxFQUFFLE9BQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDeEMsYUFBYSxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUU7Q0FDMUIsQ0FBQyxDQUFBIn0=