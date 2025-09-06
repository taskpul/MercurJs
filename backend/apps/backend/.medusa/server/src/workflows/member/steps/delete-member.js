"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMemberStep = void 0;
const utils_1 = require("@medusajs/framework/utils");
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const framework_1 = require("@mercurjs/framework");
const seller_1 = require("@mercurjs/seller");
exports.deleteMemberStep = (0, workflows_sdk_1.createStep)('delete-member', async (id, { container }) => {
    const service = container.resolve(seller_1.SELLER_MODULE);
    const member = await service.retrieveMember(id);
    if (member.role === framework_1.MemberRole.OWNER) {
        throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, 'Owner member cannot be deleted');
    }
    await service.softDeleteMembers(id);
    return new workflows_sdk_1.StepResponse(id);
}, async (memberId, { container }) => {
    const service = container.resolve(seller_1.SELLER_MODULE);
    await service.restoreMembers(memberId);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLW1lbWJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvbWVtYmVyL3N0ZXBzL2RlbGV0ZS1tZW1iZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscURBQXVEO0FBQ3ZELHFFQUE0RTtBQUU1RSxtREFBZ0Q7QUFDaEQsNkNBQXFFO0FBRXhELFFBQUEsZ0JBQWdCLEdBQUcsSUFBQSwwQkFBVSxFQUN4QyxlQUFlLEVBQ2YsS0FBSyxFQUFFLEVBQVUsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDbEMsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBc0Isc0JBQWEsQ0FBQyxDQUFBO0lBRXJFLE1BQU0sTUFBTSxHQUFHLE1BQU0sT0FBTyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUUvQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssc0JBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQyxNQUFNLElBQUksbUJBQVcsQ0FDbkIsbUJBQVcsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUM5QixnQ0FBZ0MsQ0FDakMsQ0FBQTtJQUNILENBQUM7SUFFRCxNQUFNLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUVuQyxPQUFPLElBQUksNEJBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUM3QixDQUFDLEVBQ0QsS0FBSyxFQUFFLFFBQWdCLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO0lBQ3hDLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQXNCLHNCQUFhLENBQUMsQ0FBQTtJQUVyRSxNQUFNLE9BQU8sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDeEMsQ0FBQyxDQUNGLENBQUEifQ==