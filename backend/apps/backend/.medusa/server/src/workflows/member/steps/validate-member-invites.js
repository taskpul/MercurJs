"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMemberInviteStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const seller_1 = require("@mercurjs/seller");
exports.validateMemberInviteStep = (0, workflows_sdk_1.createStep)('validate-member-invite', async (input, { container }) => {
    const service = container.resolve(seller_1.SELLER_MODULE);
    const invite = await service.validateInviteToken(input.token);
    return new workflows_sdk_1.StepResponse(invite);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUtbWVtYmVyLWludml0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL21lbWJlci9zdGVwcy92YWxpZGF0ZS1tZW1iZXItaW52aXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxRUFBNEU7QUFHNUUsNkNBQXFFO0FBRXhELFFBQUEsd0JBQXdCLEdBQUcsSUFBQSwwQkFBVSxFQUNoRCx3QkFBd0IsRUFDeEIsS0FBSyxFQUFFLEtBQTRCLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO0lBQ3BELE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQXNCLHNCQUFhLENBQUMsQ0FBQTtJQUVyRSxNQUFNLE1BQU0sR0FBRyxNQUFNLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFN0QsT0FBTyxJQUFJLDRCQUFZLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDakMsQ0FBQyxDQUNGLENBQUEifQ==