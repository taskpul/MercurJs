"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPayoutReversalStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const payout_1 = require("@mercurjs/payout");
exports.createPayoutReversalStep = (0, workflows_sdk_1.createStep)('create-payout-reversal', async (input, { container }) => {
    const service = container.resolve(payout_1.PAYOUT_MODULE);
    if (input.payout_id === null) {
        return new workflows_sdk_1.StepResponse();
    }
    let payoutReversal = null;
    let err = false;
    try {
        //@ts-expect-error We check if payout_id is not null above
        payoutReversal = await service.createPayoutReversal(input);
    }
    catch {
        err = true;
    }
    return new workflows_sdk_1.StepResponse({
        payoutReversal,
        err
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXBheW91dC1yZXZlcnNhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvcGF5b3V0L3N0ZXBzL2NyZWF0ZS1wYXlvdXQtcmV2ZXJzYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EscUVBQTRFO0FBRzVFLDZDQUFnRDtBQVNuQyxRQUFBLHdCQUF3QixHQUFHLElBQUEsMEJBQVUsRUFDaEQsd0JBQXdCLEVBQ3hCLEtBQUssRUFBRSxLQUFvQyxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUM1RCxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFzQixzQkFBYSxDQUFDLENBQUE7SUFFckUsSUFBSSxLQUFLLENBQUMsU0FBUyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQzdCLE9BQU8sSUFBSSw0QkFBWSxFQUFFLENBQUE7SUFDM0IsQ0FBQztJQUVELElBQUksY0FBYyxHQUFxQixJQUFJLENBQUE7SUFDM0MsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFBO0lBRWYsSUFBSSxDQUFDO1FBQ0gsMERBQTBEO1FBQzFELGNBQWMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUM1RCxDQUFDO0lBQUMsTUFBTSxDQUFDO1FBQ1AsR0FBRyxHQUFHLElBQUksQ0FBQTtJQUNaLENBQUM7SUFFRCxPQUFPLElBQUksNEJBQVksQ0FBQztRQUN0QixjQUFjO1FBQ2QsR0FBRztLQUNKLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FDRixDQUFBIn0=