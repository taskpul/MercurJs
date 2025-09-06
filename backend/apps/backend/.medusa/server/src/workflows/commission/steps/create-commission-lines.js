"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommissionLinesStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const commission_1 = require("@mercurjs/commission");
exports.createCommissionLinesStep = (0, workflows_sdk_1.createStep)('create-commission-lines', async (input, { container }) => {
    const service = container.resolve(commission_1.COMMISSION_MODULE);
    // @ts-expect-error BigNumber incompatible interface
    const result = await service.createCommissionLines(input);
    return new workflows_sdk_1.StepResponse(result);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWNvbW1pc3Npb24tbGluZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL2NvbW1pc3Npb24vc3RlcHMvY3JlYXRlLWNvbW1pc3Npb24tbGluZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUVBQTRFO0FBRTVFLHFEQUF3RDtBQUkzQyxRQUFBLHlCQUF5QixHQUFHLElBQUEsMEJBQVUsRUFDakQseUJBQXlCLEVBQ3pCLEtBQUssRUFBRSxLQUFnQyxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUN4RCxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUMvQiw4QkFBaUIsQ0FDUyxDQUFBO0lBRTVCLG9EQUFvRDtJQUNwRCxNQUFNLE1BQU0sR0FBRyxNQUFNLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUV6RCxPQUFPLElBQUksNEJBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQ0YsQ0FBQSJ9