"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUpdateOrderReturnRequest = exports.AdminGetOrderReturnRequestParams = void 0;
const zod_1 = require("zod");
const validators_1 = require("@medusajs/medusa/api/utils/validators");
exports.AdminGetOrderReturnRequestParams = (0, validators_1.createFindParams)({
    offset: 0,
    limit: 50
}).extend({
    status: zod_1.z
        .enum(['pending', 'refunded', 'withdrawn', 'escalated', 'canceled'])
        .optional()
});
exports.AdminUpdateOrderReturnRequest = zod_1.z
    .object({
    admin_reviewer_note: zod_1.z.string(),
    status: zod_1.z.enum(['refunded', 'canceled'])
})
    .strict();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcGkvYWRtaW4vcmV0dXJuLXJlcXVlc3QvdmFsaWRhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2QkFBdUI7QUFFdkIsc0VBQXdFO0FBSzNELFFBQUEsZ0NBQWdDLEdBQUcsSUFBQSw2QkFBZ0IsRUFBQztJQUMvRCxNQUFNLEVBQUUsQ0FBQztJQUNULEtBQUssRUFBRSxFQUFFO0NBQ1YsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUNSLE1BQU0sRUFBRSxPQUFDO1NBQ04sSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQ25FLFFBQVEsRUFBRTtDQUNkLENBQUMsQ0FBQTtBQXNCVyxRQUFBLDZCQUE2QixHQUFHLE9BQUM7S0FDM0MsTUFBTSxDQUFDO0lBQ04sbUJBQW1CLEVBQUUsT0FBQyxDQUFDLE1BQU0sRUFBRTtJQUMvQixNQUFNLEVBQUUsT0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztDQUN6QyxDQUFDO0tBQ0QsTUFBTSxFQUFFLENBQUEifQ==