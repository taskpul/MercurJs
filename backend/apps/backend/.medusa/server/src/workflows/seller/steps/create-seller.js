"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSellerStep = void 0;
const utils_1 = require("@medusajs/framework/utils");
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const seller_1 = require("@mercurjs/seller");
exports.createSellerStep = (0, workflows_sdk_1.createStep)('create-seller', async (input, { container }) => {
    const service = container.resolve(seller_1.SELLER_MODULE);
    const seller = await service.createSellers({
        ...input,
        handle: (0, utils_1.toHandle)(input.name)
    });
    return new workflows_sdk_1.StepResponse(seller, seller.id);
}, async (id, { container }) => {
    if (!id) {
        return;
    }
    const service = container.resolve(seller_1.SELLER_MODULE);
    await service.deleteSellers([id]);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXNlbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3Mvc2VsbGVyL3N0ZXBzL2NyZWF0ZS1zZWxsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscURBQW9EO0FBQ3BELHFFQUE0RTtBQUc1RSw2Q0FBcUU7QUFFeEQsUUFBQSxnQkFBZ0IsR0FBRyxJQUFBLDBCQUFVLEVBQ3hDLGVBQWUsRUFDZixLQUFLLEVBQUUsS0FBc0IsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDOUMsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBc0Isc0JBQWEsQ0FBQyxDQUFBO0lBRXJFLE1BQU0sTUFBTSxHQUFjLE1BQU0sT0FBTyxDQUFDLGFBQWEsQ0FBQztRQUNwRCxHQUFHLEtBQUs7UUFDUixNQUFNLEVBQUUsSUFBQSxnQkFBUSxFQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7S0FDN0IsQ0FBQyxDQUFBO0lBRUYsT0FBTyxJQUFJLDRCQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUM1QyxDQUFDLEVBQ0QsS0FBSyxFQUFFLEVBQVUsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDbEMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ1IsT0FBTTtJQUNSLENBQUM7SUFFRCxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFzQixzQkFBYSxDQUFDLENBQUE7SUFFckUsTUFBTSxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUNuQyxDQUFDLENBQ0YsQ0FBQSJ9