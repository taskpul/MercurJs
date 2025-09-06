"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductRequestWorkflow = void 0;
const core_flows_1 = require("@medusajs/medusa/core-flows");
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const framework_1 = require("@mercurjs/framework");
const requests_1 = require("@mercurjs/requests");
const seller_1 = require("@mercurjs/seller");
const steps_1 = require("../../common/steps");
const steps_2 = require("../steps");
exports.createProductRequestWorkflow = (0, workflows_sdk_1.createWorkflow)('create-product-request', function (input) {
    const productPayload = (0, workflows_sdk_1.transform)(input, (input) => ({
        ...input.data.data,
        status: input.data.data.status === 'draft' ? 'draft' : 'proposed'
    }));
    const product = core_flows_1.createProductsWorkflow.runAsStep({
        input: {
            products: [productPayload],
            additional_data: (0, workflows_sdk_1.transform)(input, (input) => ({
                ...input.additional_data,
                seller_id: input.seller_id
            }))
        }
    });
    const requestPayload = (0, workflows_sdk_1.transform)({ input, productPayload, product }, ({ input, productPayload, product }) => ({
        ...input.data,
        data: {
            ...productPayload,
            product_id: product[0].id
        },
        status: productPayload.status === 'draft'
            ? 'draft'
            : 'pending'
    }));
    const request = (0, steps_2.createRequestStep)(requestPayload);
    const link = (0, workflows_sdk_1.transform)({ request, input }, ({ request, input }) => {
        return [
            {
                [seller_1.SELLER_MODULE]: {
                    seller_id: input.seller_id
                },
                [requests_1.REQUESTS_MODULE]: {
                    request_id: request[0].id
                }
            }
        ];
    });
    (0, core_flows_1.createRemoteLinkStep)(link);
    (0, steps_1.emitMultipleEventsStep)([
        {
            name: framework_1.RequestUpdated.CREATED,
            data: { ...input.data, sellerId: input.seller_id }
        },
        {
            name: framework_1.ProductRequestUpdatedEvent.CREATED,
            data: { id: request[0].id }
        }
    ]);
    const productRequestCreatedHook = (0, workflows_sdk_1.createHook)('productRequestCreated', {
        requestId: request[0].id,
        sellerId: input.seller_id
    });
    return new workflows_sdk_1.WorkflowResponse(request, {
        hooks: [productRequestCreatedHook]
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXByb2R1Y3QtcmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvcmVxdWVzdHMvd29ya2Zsb3dzL2NyZWF0ZS1wcm9kdWN0LXJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNERBR29DO0FBQ3BDLDJEQUtnQztBQUVoQyxtREFLNEI7QUFDNUIsaURBQW9EO0FBQ3BELDZDQUFnRDtBQUVoRCw4Q0FBMkQ7QUFDM0Qsb0NBQTRDO0FBRS9CLFFBQUEsNEJBQTRCLEdBQUcsSUFBQSw4QkFBYyxFQUN4RCx3QkFBd0IsRUFDeEIsVUFBVSxLQUlUO0lBQ0MsTUFBTSxjQUFjLEdBQUcsSUFBQSx5QkFBUyxFQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNsRCxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSTtRQUNsQixNQUFNLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxVQUFVO0tBQ2xFLENBQUMsQ0FBQyxDQUFBO0lBRUgsTUFBTSxPQUFPLEdBQUcsbUNBQXNCLENBQUMsU0FBUyxDQUFDO1FBQy9DLEtBQUssRUFBRTtZQUNMLFFBQVEsRUFBRSxDQUFDLGNBQWMsQ0FBQztZQUMxQixlQUFlLEVBQUUsSUFBQSx5QkFBUyxFQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDNUMsR0FBRyxLQUFLLENBQUMsZUFBZTtnQkFDeEIsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTO2FBQzNCLENBQUMsQ0FBQztTQUNKO0tBQ0YsQ0FBQyxDQUFBO0lBRUYsTUFBTSxjQUFjLEdBQUcsSUFBQSx5QkFBUyxFQUM5QixFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLEVBQ2xDLENBQUMsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZDLEdBQUcsS0FBSyxDQUFDLElBQUk7UUFDYixJQUFJLEVBQUU7WUFDSixHQUFHLGNBQWM7WUFDakIsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1NBQzFCO1FBQ0QsTUFBTSxFQUNKLGNBQWMsQ0FBQyxNQUFNLEtBQUssT0FBTztZQUMvQixDQUFDLENBQUUsT0FBeUI7WUFDNUIsQ0FBQyxDQUFFLFNBQTJCO0tBQ25DLENBQUMsQ0FDSCxDQUFBO0lBRUQsTUFBTSxPQUFPLEdBQUcsSUFBQSx5QkFBaUIsRUFBQyxjQUFjLENBQUMsQ0FBQTtJQUVqRCxNQUFNLElBQUksR0FBRyxJQUFBLHlCQUFTLEVBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFO1FBQ2hFLE9BQU87WUFDTDtnQkFDRSxDQUFDLHNCQUFhLENBQUMsRUFBRTtvQkFDZixTQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVM7aUJBQzNCO2dCQUNELENBQUMsMEJBQWUsQ0FBQyxFQUFFO29CQUNqQixVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7aUJBQzFCO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQyxDQUFDLENBQUE7SUFFRixJQUFBLGlDQUFvQixFQUFDLElBQUksQ0FBQyxDQUFBO0lBRTFCLElBQUEsOEJBQXNCLEVBQUM7UUFDckI7WUFDRSxJQUFJLEVBQUUsMEJBQWMsQ0FBQyxPQUFPO1lBQzVCLElBQUksRUFBRSxFQUFFLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLFNBQVMsRUFBRTtTQUNuRDtRQUNEO1lBQ0UsSUFBSSxFQUFFLHNDQUEwQixDQUFDLE9BQU87WUFDeEMsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7U0FDNUI7S0FDRixDQUFDLENBQUE7SUFFRixNQUFNLHlCQUF5QixHQUFHLElBQUEsMEJBQVUsRUFBQyx1QkFBdUIsRUFBRTtRQUNwRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDeEIsUUFBUSxFQUFFLEtBQUssQ0FBQyxTQUFTO0tBQzFCLENBQUMsQ0FBQTtJQUNGLE9BQU8sSUFBSSxnQ0FBZ0IsQ0FBQyxPQUFPLEVBQUU7UUFDbkMsS0FBSyxFQUFFLENBQUMseUJBQXlCLENBQUM7S0FDbkMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUNGLENBQUEifQ==