"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMemberInviteStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const seller_1 = require("@mercurjs/seller");
exports.createMemberInviteStep = (0, workflows_sdk_1.createStep)('create-member-invite', async (input, { container }) => {
    const service = container.resolve(seller_1.SELLER_MODULE);
    const [memberInvite] = await service.createMemberInvites(input);
    return new workflows_sdk_1.StepResponse(memberInvite, memberInvite.id);
}, async (memberInviteId, { container }) => {
    const service = container.resolve(seller_1.SELLER_MODULE);
    await service.deleteMemberInvites([memberInviteId]);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLW1lbWJlci1pbnZpdGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9tZW1iZXIvc3RlcHMvY3JlYXRlLW1lbWJlci1pbnZpdGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQUE0RTtBQUc1RSw2Q0FBcUU7QUFFeEQsUUFBQSxzQkFBc0IsR0FBRyxJQUFBLDBCQUFVLEVBQzlDLHNCQUFzQixFQUN0QixLQUFLLEVBQUUsS0FBNEIsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDcEQsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBc0Isc0JBQWEsQ0FBQyxDQUFBO0lBRXJFLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUUvRCxPQUFPLElBQUksNEJBQVksQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBQ3hELENBQUMsRUFDRCxLQUFLLEVBQUUsY0FBc0IsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDOUMsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBc0Isc0JBQWEsQ0FBQyxDQUFBO0lBRXJFLE1BQU0sT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQTtBQUNyRCxDQUFDLENBQ0YsQ0FBQSJ9