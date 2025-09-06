"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMemberStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const seller_1 = require("@mercurjs/seller");
exports.createMemberStep = (0, workflows_sdk_1.createStep)('create-member', async (input, { container }) => {
    const service = container.resolve(seller_1.SELLER_MODULE);
    const member = await service.createMembers(input);
    return new workflows_sdk_1.StepResponse(member, member.id);
}, async (memberId, { container }) => {
    const service = container.resolve(seller_1.SELLER_MODULE);
    await service.deleteMembers([memberId]);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLW1lbWJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvbWVtYmVyL3N0ZXBzL2NyZWF0ZS1tZW1iZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUVBQTRFO0FBRzVFLDZDQUFnRDtBQUduQyxRQUFBLGdCQUFnQixHQUFHLElBQUEsMEJBQVUsRUFDeEMsZUFBZSxFQUNmLEtBQUssRUFBRSxLQUFzQixFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUM5QyxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFzQixzQkFBYSxDQUFDLENBQUE7SUFFckUsTUFBTSxNQUFNLEdBQWMsTUFBTSxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRTVELE9BQU8sSUFBSSw0QkFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUE7QUFDNUMsQ0FBQyxFQUNELEtBQUssRUFBRSxRQUFnQixFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUN4QyxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFzQixzQkFBYSxDQUFDLENBQUE7SUFFckUsTUFBTSxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQTtBQUN6QyxDQUFDLENBQ0YsQ0FBQSJ9