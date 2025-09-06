"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = productUpdatedHandler;
const utils_1 = require("@medusajs/framework/utils");
const requests_1 = require("@mercurjs/requests");
const workflows_1 = require("../workflows/requests/workflows");
async function productUpdatedHandler({ event, container }) {
    const requestService = container.resolve(requests_1.REQUESTS_MODULE);
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: [product] } = await query.graph({
        entity: 'product',
        fields: ['status'],
        filters: {
            id: event.data.id
        }
    });
    const foundRequests = await requestService.listRequests({
        data: {
            product_id: event.data.id
        }
    });
    if (!foundRequests || foundRequests.length === 0) {
        return;
    }
    for (const foundRequest of foundRequests) {
        if (foundRequest.status === 'pending' &&
            ['published', 'rejected'].includes(product.status)) {
            await workflows_1.updateRequestWorkflow.run({
                container,
                input: {
                    id: foundRequest.id,
                    reviewer_id: 'system',
                    reviewer_note: 'auto',
                    status: product.status === 'published' ? 'accepted' : 'rejected'
                }
            });
        }
        if (product.status === 'proposed') {
            await workflows_1.updateRequestWorkflow.run({
                container,
                input: {
                    id: foundRequest.id,
                    status: 'pending'
                }
            });
        }
    }
}
exports.config = {
    event: 'product.updated',
    context: {
        subscriberId: 'product-updated-handler'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC11cGRhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3N1YnNjcmliZXJzL3Byb2R1Y3QtdXBkYXRlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFPQSx3Q0FzREM7QUE1REQscURBQXFFO0FBRXJFLGlEQUEyRTtBQUUzRSwrREFBdUU7QUFFeEQsS0FBSyxVQUFVLHFCQUFxQixDQUFDLEVBQ2xELEtBQUssRUFDTCxTQUFTLEVBQ3NCO0lBQy9CLE1BQU0sY0FBYyxHQUNsQixTQUFTLENBQUMsT0FBTyxDQUF3QiwwQkFBZSxDQUFDLENBQUE7SUFFM0QsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxpQ0FBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNoRSxNQUFNLEVBQ0osSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQ2hCLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ3BCLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUNsQixPQUFPLEVBQUU7WUFDUCxFQUFFLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO1NBQ2xCO0tBQ0YsQ0FBQyxDQUFBO0lBRUYsTUFBTSxhQUFhLEdBQUcsTUFBTSxjQUFjLENBQUMsWUFBWSxDQUFDO1FBQ3RELElBQUksRUFBRTtZQUNKLFVBQVUsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7U0FDMUI7S0FDRixDQUFDLENBQUE7SUFFRixJQUFJLENBQUMsYUFBYSxJQUFJLGFBQWEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDakQsT0FBTTtJQUNSLENBQUM7SUFFRCxLQUFLLE1BQU0sWUFBWSxJQUFJLGFBQWEsRUFBRSxDQUFDO1FBQ3pDLElBQ0UsWUFBWSxDQUFDLE1BQU0sS0FBSyxTQUFTO1lBQ2pDLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQ2xELENBQUM7WUFDRCxNQUFNLGlDQUFxQixDQUFDLEdBQUcsQ0FBQztnQkFDOUIsU0FBUztnQkFDVCxLQUFLLEVBQUU7b0JBQ0wsRUFBRSxFQUFFLFlBQVksQ0FBQyxFQUFFO29CQUNuQixXQUFXLEVBQUUsUUFBUTtvQkFDckIsYUFBYSxFQUFFLE1BQU07b0JBQ3JCLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVO2lCQUNqRTthQUNGLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFFRCxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssVUFBVSxFQUFFLENBQUM7WUFDbEMsTUFBTSxpQ0FBcUIsQ0FBQyxHQUFHLENBQUM7Z0JBQzlCLFNBQVM7Z0JBQ1QsS0FBSyxFQUFFO29CQUNMLEVBQUUsRUFBRSxZQUFZLENBQUMsRUFBRTtvQkFDbkIsTUFBTSxFQUFFLFNBQVM7aUJBQ2xCO2FBQ0YsQ0FBQyxDQUFBO1FBQ0osQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDO0FBRVksUUFBQSxNQUFNLEdBQXFCO0lBQ3RDLEtBQUssRUFBRSxpQkFBaUI7SUFDeEIsT0FBTyxFQUFFO1FBQ1AsWUFBWSxFQUFFLHlCQUF5QjtLQUN4QztDQUNGLENBQUEifQ==