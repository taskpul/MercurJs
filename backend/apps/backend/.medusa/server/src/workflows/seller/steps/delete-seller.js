"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSellerStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const seller_1 = require("@mercurjs/seller");
exports.deleteSellerStep = (0, workflows_sdk_1.createStep)('delete-seller', async (id, { container }) => {
    const service = container.resolve(seller_1.SELLER_MODULE);
    await service.softDeleteSellers(id);
    return new workflows_sdk_1.StepResponse(id);
}, async (id, { container }) => {
    const service = container.resolve(seller_1.SELLER_MODULE);
    await service.restoreSellers(id);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLXNlbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3Mvc2VsbGVyL3N0ZXBzL2RlbGV0ZS1zZWxsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUVBQTRFO0FBRTVFLDZDQUFxRTtBQUV4RCxRQUFBLGdCQUFnQixHQUFHLElBQUEsMEJBQVUsRUFDeEMsZUFBZSxFQUNmLEtBQUssRUFBRSxFQUFVLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO0lBQ2xDLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQXNCLHNCQUFhLENBQUMsQ0FBQTtJQUVyRSxNQUFNLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUVuQyxPQUFPLElBQUksNEJBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUM3QixDQUFDLEVBQ0QsS0FBSyxFQUFFLEVBQVUsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDbEMsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBc0Isc0JBQWEsQ0FBQyxDQUFBO0lBRXJFLE1BQU0sT0FBTyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUNsQyxDQUFDLENBQ0YsQ0FBQSJ9