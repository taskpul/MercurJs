"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRequestStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const requests_1 = require("@mercurjs/requests");
exports.createRequestStep = (0, workflows_sdk_1.createStep)('create-request', async (input, { container }) => {
    const service = container.resolve(requests_1.REQUESTS_MODULE);
    const toCreate = Array.isArray(input) ? input : [input];
    const requests = await service.createRequests(toCreate);
    return new workflows_sdk_1.StepResponse(requests);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXJlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL3JlcXVlc3RzL3N0ZXBzL2NyZWF0ZS1yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQUE0RTtBQUc1RSxpREFBMkU7QUFFOUQsUUFBQSxpQkFBaUIsR0FBRyxJQUFBLDBCQUFVLEVBQ3pDLGdCQUFnQixFQUNoQixLQUFLLEVBQUUsS0FBNEMsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDcEUsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBd0IsMEJBQWUsQ0FBQyxDQUFBO0lBRXpFLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUV2RCxNQUFNLFFBQVEsR0FBRyxNQUFNLE9BQU8sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUE7SUFFdkQsT0FBTyxJQUFJLDRCQUFZLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDbkMsQ0FBQyxDQUNGLENBQUEifQ==