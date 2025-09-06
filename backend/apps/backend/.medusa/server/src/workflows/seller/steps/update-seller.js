"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSellerStep = void 0;
const utils_1 = require("@medusajs/framework/utils");
const utils_2 = require("@medusajs/framework/utils");
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const framework_1 = require("@mercurjs/framework");
const seller_1 = require("@mercurjs/seller");
exports.updateSellerStep = (0, workflows_sdk_1.createStep)('update-seller', async (input, { container }) => {
    const service = container.resolve(seller_1.SELLER_MODULE);
    const eventBus = container.resolve(utils_2.Modules.EVENT_BUS);
    const [previousData] = await service.listSellers({
        id: input.id
    });
    const newHandle = input.name ? (0, utils_1.toHandle)(input.name) : undefined;
    const updatedSellers = await service.updateSellers({
        ...input,
        ...(newHandle ? { handle: newHandle } : {})
    });
    if (input.store_status) {
        await eventBus.emit({
            name: framework_1.SellerEvents.STORE_STATUS_CHANGED,
            data: {
                id: input.id,
                store_status: input.store_status
            }
        });
    }
    return new workflows_sdk_1.StepResponse(updatedSellers, previousData);
}, async (previousData, { container }) => {
    const service = container.resolve(seller_1.SELLER_MODULE);
    await service.updateSellers(previousData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXNlbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3Mvc2VsbGVyL3N0ZXBzL3VwZGF0ZS1zZWxsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscURBQW9EO0FBQ3BELHFEQUFtRDtBQUNuRCxxRUFBNEU7QUFFNUUsbURBQThFO0FBQzlFLDZDQUFxRTtBQUV4RCxRQUFBLGdCQUFnQixHQUFHLElBQUEsMEJBQVUsRUFDeEMsZUFBZSxFQUNmLEtBQUssRUFBRSxLQUFzQixFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUM5QyxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFzQixzQkFBYSxDQUFDLENBQUE7SUFDckUsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxlQUFPLENBQUMsU0FBUyxDQUFDLENBQUE7SUFFckQsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLFdBQVcsQ0FBQztRQUMvQyxFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUU7S0FDYixDQUFDLENBQUE7SUFFRixNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFBLGdCQUFRLEVBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUE7SUFFL0QsTUFBTSxjQUFjLEdBQWMsTUFBTSxPQUFPLENBQUMsYUFBYSxDQUFDO1FBQzVELEdBQUcsS0FBSztRQUNSLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7S0FDNUMsQ0FBQyxDQUFBO0lBRUYsSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdkIsTUFBTSxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ2xCLElBQUksRUFBRSx3QkFBWSxDQUFDLG9CQUFvQjtZQUN2QyxJQUFJLEVBQUU7Z0JBQ0osRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUNaLFlBQVksRUFBRSxLQUFLLENBQUMsWUFBWTthQUNqQztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxPQUFPLElBQUksNEJBQVksQ0FBQyxjQUFjLEVBQUUsWUFBK0IsQ0FBQyxDQUFBO0FBQzFFLENBQUMsRUFDRCxLQUFLLEVBQUUsWUFBNkIsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDckQsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBc0Isc0JBQWEsQ0FBQyxDQUFBO0lBRXJFLE1BQU0sT0FBTyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQTtBQUMzQyxDQUFDLENBQ0YsQ0FBQSJ9