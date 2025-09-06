"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requests_1 = require("@mercurjs/requests");
const workflows_1 = require("../product/workflows");
const workflows_2 = require("../requests/workflows");
workflows_2.updateRequestWorkflow.hooks.requestUpdated(async ({ id }, { container }) => {
    const service = container.resolve(requests_1.REQUESTS_MODULE);
    const request = await service.retrieveRequest(id);
    if (['product', 'product_update'].includes(request.type) &&
        request.status === 'rejected') {
        await workflows_1.updateProductStatusWorkflow.run({
            container,
            input: {
                id: request.data.product_id,
                status: 'rejected'
            }
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC11cGRhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9ob29rcy9yZXF1ZXN0LXVwZGF0ZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBMkU7QUFFM0Usb0RBQWtFO0FBQ2xFLHFEQUE2RDtBQUU3RCxpQ0FBcUIsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUN6RSxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUF3QiwwQkFBZSxDQUFDLENBQUE7SUFFekUsTUFBTSxPQUFPLEdBQUcsTUFBTSxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBRWpELElBQ0UsQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUNwRCxPQUFPLENBQUMsTUFBTSxLQUFLLFVBQVUsRUFDN0IsQ0FBQztRQUNELE1BQU0sdUNBQTJCLENBQUMsR0FBRyxDQUFDO1lBQ3BDLFNBQVM7WUFDVCxLQUFLLEVBQUU7Z0JBQ0wsRUFBRSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVTtnQkFDM0IsTUFBTSxFQUFFLFVBQVU7YUFDbkI7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0FBQ0gsQ0FBQyxDQUFDLENBQUEifQ==