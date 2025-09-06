"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = productRequestCreatedHandler;
const utils_1 = require("@medusajs/framework/utils");
const configuration_1 = require("@mercurjs/configuration");
const framework_1 = require("@mercurjs/framework");
const framework_2 = require("@mercurjs/framework");
const requests_1 = require("@mercurjs/requests");
const workflows_1 = require("../workflows/requests/workflows");
async function productRequestCreatedHandler({ event, container }) {
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
    event: framework_2.ProductRequestUpdatedEvent.CREATED,
    context: {
        subscriberId: 'product-request-created'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1yZXF1ZXN0LWNyZWF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc3Vic2NyaWJlcnMvcHJvZHVjdC1yZXF1ZXN0LWNyZWF0ZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBV0EsK0NBOEJDO0FBeENELHFEQUFxRTtBQUVyRSwyREFBOEQ7QUFFOUQsbURBQTJEO0FBQzNELG1EQUFnRTtBQUNoRSxpREFBMkU7QUFFM0UsK0RBQThFO0FBRS9ELEtBQUssVUFBVSw0QkFBNEIsQ0FBQyxFQUN6RCxLQUFLLEVBQ0wsU0FBUyxFQUNzQjtJQUMvQixNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQTtJQUN6QixNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUF3QiwwQkFBZSxDQUFDLENBQUE7SUFDekUsTUFBTSxhQUFhLEdBQ2pCLFNBQVMsQ0FBQyxPQUFPLENBQTZCLG9DQUFvQixDQUFDLENBQUE7SUFDckUsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxpQ0FBeUIsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUVsRSxNQUFNLE9BQU8sR0FBRyxNQUFNLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUE7SUFFakQsSUFDRSxPQUFPLENBQUMsTUFBTSxLQUFLLE9BQU87UUFDMUIsQ0FBQyxDQUFDLE1BQU0sYUFBYSxDQUFDLGFBQWEsQ0FDakMsaUNBQXFCLENBQUMsd0JBQXdCLENBQy9DLENBQUMsRUFDRixDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLGtDQUFrQyxDQUFDLENBQUE7UUFDNUQsTUFBTSx3Q0FBNEIsQ0FBQyxHQUFHLENBQUM7WUFDckMsU0FBUztZQUNULEtBQUssRUFBRTtnQkFDTCxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7Z0JBQ2xCLEVBQUUsRUFBRSxPQUFPLENBQUMsRUFBRTtnQkFDZCxXQUFXLEVBQUUsUUFBUTtnQkFDckIsYUFBYSxFQUFFLGVBQWU7Z0JBQzlCLE1BQU0sRUFBRSxVQUFVO2FBQ25CO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztBQUNILENBQUM7QUFFWSxRQUFBLE1BQU0sR0FBcUI7SUFDdEMsS0FBSyxFQUFFLHNDQUEwQixDQUFDLE9BQU87SUFDekMsT0FBTyxFQUFFO1FBQ1AsWUFBWSxFQUFFLHlCQUF5QjtLQUN4QztDQUNGLENBQUEifQ==