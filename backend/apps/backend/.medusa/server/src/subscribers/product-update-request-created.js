"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = productUpdateRequestCreatedHandler;
const utils_1 = require("@medusajs/framework/utils");
const configuration_1 = require("@mercurjs/configuration");
const framework_1 = require("@mercurjs/framework");
const framework_2 = require("@mercurjs/framework");
const requests_1 = require("@mercurjs/requests");
const workflows_1 = require("../workflows/requests/workflows");
async function productUpdateRequestCreatedHandler({ event, container }) {
    const { id } = event.data;
    const service = container.resolve(requests_1.REQUESTS_MODULE);
    const configuration = container.resolve(configuration_1.CONFIGURATION_MODULE);
    const logger = container.resolve(utils_1.ContainerRegistrationKeys.LOGGER);
    const request = await service.retrieveRequest(id);
    if (request.status !== 'draft' &&
        !(await configuration.isRuleEnabled(framework_1.ConfigurationRuleType.REQUIRE_PRODUCT_APPROVAL))) {
        logger.info(`${request.id}: Request automatically accepted`);
        await workflows_1.acceptProductRequestWorkflow.run({
            container,
            input: {
                data: request.data,
                id: request.id,
                reviewer_id: 'system',
                reviewer_note: 'auto accepted',
                status: 'accepted'
            }
        });
    }
}
exports.config = {
    event: framework_2.ProductUpdateRequestUpdatedEvent.CREATED,
    context: {
        subscriberId: 'product-update-request-created'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC11cGRhdGUtcmVxdWVzdC1jcmVhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3N1YnNjcmliZXJzL3Byb2R1Y3QtdXBkYXRlLXJlcXVlc3QtY3JlYXRlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFXQSxxREE4QkM7QUF4Q0QscURBQXFFO0FBRXJFLDJEQUE4RDtBQUU5RCxtREFBMkQ7QUFDM0QsbURBQXNFO0FBQ3RFLGlEQUEyRTtBQUUzRSwrREFBOEU7QUFFL0QsS0FBSyxVQUFVLGtDQUFrQyxDQUFDLEVBQy9ELEtBQUssRUFDTCxTQUFTLEVBQ3NCO0lBQy9CLE1BQU0sRUFBRSxFQUFFLEVBQUUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFBO0lBQ3pCLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQXdCLDBCQUFlLENBQUMsQ0FBQTtJQUN6RSxNQUFNLGFBQWEsR0FDakIsU0FBUyxDQUFDLE9BQU8sQ0FBNkIsb0NBQW9CLENBQUMsQ0FBQTtJQUNyRSxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBRWxFLE1BQU0sT0FBTyxHQUFHLE1BQU0sT0FBTyxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUVqRCxJQUNFLE9BQU8sQ0FBQyxNQUFNLEtBQUssT0FBTztRQUMxQixDQUFDLENBQUMsTUFBTSxhQUFhLENBQUMsYUFBYSxDQUNqQyxpQ0FBcUIsQ0FBQyx3QkFBd0IsQ0FDL0MsQ0FBQyxFQUNGLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsa0NBQWtDLENBQUMsQ0FBQTtRQUM1RCxNQUFNLHdDQUE0QixDQUFDLEdBQUcsQ0FBQztZQUNyQyxTQUFTO1lBQ1QsS0FBSyxFQUFFO2dCQUNMLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtnQkFDbEIsRUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFFO2dCQUNkLFdBQVcsRUFBRSxRQUFRO2dCQUNyQixhQUFhLEVBQUUsZUFBZTtnQkFDOUIsTUFBTSxFQUFFLFVBQVU7YUFDbkI7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0FBQ0gsQ0FBQztBQUVZLFFBQUEsTUFBTSxHQUFxQjtJQUN0QyxLQUFLLEVBQUUsNENBQWdDLENBQUMsT0FBTztJQUMvQyxPQUFPLEVBQUU7UUFDUCxZQUFZLEVBQUUsZ0NBQWdDO0tBQy9DO0NBQ0YsQ0FBQSJ9