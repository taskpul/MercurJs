"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRequestDataStep = void 0;
const utils_1 = require("@medusajs/framework/utils");
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const requests_1 = require("@mercurjs/requests");
exports.updateRequestDataStep = (0, workflows_sdk_1.createStep)('update-request-data', async (input, { container }) => {
    const service = container.resolve(requests_1.REQUESTS_MODULE);
    const existingRequest = await service.retrieveRequest(input.id);
    if (!['pending', 'draft'].includes(existingRequest.status)) {
        throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, 'Request is already reviewed!');
    }
    if (existingRequest.type !== input.type) {
        throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, 'Invalid request type!');
    }
    const request = await service.updateRequests({
        id: input.id,
        data: {
            ...existingRequest.data,
            ...input.data
        }
    });
    return new workflows_sdk_1.StepResponse(request, request.id);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXJlcXVlc3QtZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvcmVxdWVzdHMvc3RlcHMvdXBkYXRlLXJlcXVlc3QtZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxREFBdUQ7QUFDdkQscUVBQTRFO0FBRzVFLGlEQUEyRTtBQUU5RCxRQUFBLHFCQUFxQixHQUFHLElBQUEsMEJBQVUsRUFDN0MscUJBQXFCLEVBQ3JCLEtBQUssRUFBRSxLQUEyQixFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUNuRCxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUF3QiwwQkFBZSxDQUFDLENBQUE7SUFFekUsTUFBTSxlQUFlLEdBQUcsTUFBTSxPQUFPLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUUvRCxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQzNELE1BQU0sSUFBSSxtQkFBVyxDQUNuQixtQkFBVyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQzlCLDhCQUE4QixDQUMvQixDQUFBO0lBQ0gsQ0FBQztJQUVELElBQUksZUFBZSxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDeEMsTUFBTSxJQUFJLG1CQUFXLENBQ25CLG1CQUFXLENBQUMsS0FBSyxDQUFDLFlBQVksRUFDOUIsdUJBQXVCLENBQ3hCLENBQUE7SUFDSCxDQUFDO0lBRUQsTUFBTSxPQUFPLEdBQUcsTUFBTSxPQUFPLENBQUMsY0FBYyxDQUFDO1FBQzNDLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRTtRQUNaLElBQUksRUFBRTtZQUNKLEdBQUcsZUFBZSxDQUFDLElBQUk7WUFDdkIsR0FBRyxLQUFLLENBQUMsSUFBSTtTQUNkO0tBQ0YsQ0FBQyxDQUFBO0lBRUYsT0FBTyxJQUFJLDRCQUFZLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUM5QyxDQUFDLENBQ0YsQ0FBQSJ9