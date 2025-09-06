"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMemberStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const seller_1 = require("@mercurjs/seller");
exports.updateMemberStep = (0, workflows_sdk_1.createStep)('update-member', async (input, { container }) => {
    const service = container.resolve(seller_1.SELLER_MODULE);
    const previousData = await service.retrieveMember(input.id);
    const updatedMember = await service.updateMembers(input);
    return new workflows_sdk_1.StepResponse(updatedMember, previousData);
}, async (previousData, { container }) => {
    const service = container.resolve(seller_1.SELLER_MODULE);
    await service.updateMembers(previousData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLW1lbWJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvbWVtYmVyL3N0ZXBzL3VwZGF0ZS1tZW1iZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUVBQTRFO0FBRzVFLDZDQUFxRTtBQUV4RCxRQUFBLGdCQUFnQixHQUFHLElBQUEsMEJBQVUsRUFDeEMsZUFBZSxFQUNmLEtBQUssRUFBRSxLQUFzQixFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUM5QyxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFzQixzQkFBYSxDQUFDLENBQUE7SUFFckUsTUFBTSxZQUFZLEdBQUcsTUFBTSxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUUzRCxNQUFNLGFBQWEsR0FBYyxNQUFNLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFbkUsT0FBTyxJQUFJLDRCQUFZLENBQUMsYUFBYSxFQUFFLFlBQStCLENBQUMsQ0FBQTtBQUN6RSxDQUFDLEVBQ0QsS0FBSyxFQUFFLFlBQTZCLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO0lBQ3JELE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQXNCLHNCQUFhLENBQUMsQ0FBQTtJQUVyRSxNQUFNLE9BQU8sQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUE7QUFDM0MsQ0FBQyxDQUNGLENBQUEifQ==