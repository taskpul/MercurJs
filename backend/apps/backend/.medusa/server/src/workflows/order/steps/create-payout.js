"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPayoutStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const payout_1 = require("@mercurjs/payout");
exports.createPayoutStep = (0, workflows_sdk_1.createStep)('create-payout', async (input, { container }) => {
    const service = container.resolve(payout_1.PAYOUT_MODULE);
    let payout = null;
    let err = false;
    try {
        payout = await service.createPayout(input);
    }
    catch {
        err = true;
    }
    return new workflows_sdk_1.StepResponse({
        payout,
        err
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXBheW91dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3Mvb3JkZXIvc3RlcHMvY3JlYXRlLXBheW91dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxRUFBNEU7QUFHNUUsNkNBQWdEO0FBR25DLFFBQUEsZ0JBQWdCLEdBQUcsSUFBQSwwQkFBVSxFQUN4QyxlQUFlLEVBQ2YsS0FBSyxFQUFFLEtBQXNCLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO0lBQzlDLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQXNCLHNCQUFhLENBQUMsQ0FBQTtJQUVyRSxJQUFJLE1BQU0sR0FBcUIsSUFBSSxDQUFBO0lBQ25DLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQTtJQUVmLElBQUksQ0FBQztRQUNILE1BQU0sR0FBRyxNQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDNUMsQ0FBQztJQUFDLE1BQU0sQ0FBQztRQUNQLEdBQUcsR0FBRyxJQUFJLENBQUE7SUFDWixDQUFDO0lBRUQsT0FBTyxJQUFJLDRCQUFZLENBQUM7UUFDdEIsTUFBTTtRQUNOLEdBQUc7S0FDSixDQUFDLENBQUE7QUFDSixDQUFDLENBQ0YsQ0FBQSJ9