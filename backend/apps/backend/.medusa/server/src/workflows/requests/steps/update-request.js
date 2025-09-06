"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRequestStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const requests_1 = require("@mercurjs/requests");
exports.updateRequestStep = (0, workflows_sdk_1.createStep)('update-request', async (input, { container }) => {
    const service = container.resolve(requests_1.REQUESTS_MODULE);
    const request = await service.updateRequests(input);
    return new workflows_sdk_1.StepResponse(request[0], request[0].id);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXJlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL3JlcXVlc3RzL3N0ZXBzL3VwZGF0ZS1yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQUE0RTtBQUc1RSxpREFBMkU7QUFFOUQsUUFBQSxpQkFBaUIsR0FBRyxJQUFBLDBCQUFVLEVBQ3pDLGdCQUFnQixFQUNoQixLQUFLLEVBQUUsS0FBdUIsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDL0MsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBd0IsMEJBQWUsQ0FBQyxDQUFBO0lBRXpFLE1BQU0sT0FBTyxHQUFHLE1BQU0sT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUVuRCxPQUFPLElBQUksNEJBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBQ3BELENBQUMsQ0FDRixDQUFBIn0=