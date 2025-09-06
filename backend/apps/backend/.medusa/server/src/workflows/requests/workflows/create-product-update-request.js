"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductUpdateRequestWorkflow = void 0;
const utils_1 = require("@medusajs/framework/utils");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const framework_1 = require("@mercurjs/framework");
const requests_1 = require("@mercurjs/requests");
const seller_1 = require("@mercurjs/seller");
const steps_1 = require("../../common/steps");
const steps_2 = require("../../product/steps");
const steps_3 = require("../steps");
exports.createProductUpdateRequestWorkflow = (0, workflows_sdk_1.createWorkflow)('create-product-update-request', function (input) {
    (0, steps_2.updateProductStatusStep)((0, workflows_sdk_1.transform)({ input }, ({ input }) => ({
        id: input.data.data.product_id,
        status: utils_1.ProductStatus.PROPOSED
    })));
    const requestPayload = (0, workflows_sdk_1.transform)({ input }, ({ input }) => ({
        ...input.data,
        data: {
            ...input.data.data,
            product_id: input.data.data.product_id
        },
        type: 'product_update',
        status: 'pending'
    }));
    const request = (0, steps_3.createRequestStep)(requestPayload);
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
            data: {
                ...input.data,
                sellerId: input.seller_id
            }
        },
        {
            name: framework_1.ProductUpdateRequestUpdatedEvent.CREATED,
            data: { id: request[0].id }
        }
    ]);
    return new workflows_sdk_1.WorkflowResponse(request);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXByb2R1Y3QtdXBkYXRlLXJlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL3JlcXVlc3RzL3dvcmtmbG93cy9jcmVhdGUtcHJvZHVjdC11cGRhdGUtcmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxREFBeUQ7QUFDekQsNERBQWtFO0FBQ2xFLDJEQUlnQztBQUVoQyxtREFLNEI7QUFDNUIsaURBQW9EO0FBQ3BELDZDQUFnRDtBQUVoRCw4Q0FBMkQ7QUFDM0QsK0NBQTZEO0FBQzdELG9DQUE0QztBQUUvQixRQUFBLGtDQUFrQyxHQUFHLElBQUEsOEJBQWMsRUFDOUQsK0JBQStCLEVBQy9CLFVBQVUsS0FJVDtJQUNDLElBQUEsK0JBQXVCLEVBQ3JCLElBQUEseUJBQVMsRUFBQyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNuQyxFQUFFLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVTtRQUM5QixNQUFNLEVBQUUscUJBQWEsQ0FBQyxRQUFRO0tBQy9CLENBQUMsQ0FBQyxDQUNKLENBQUE7SUFFRCxNQUFNLGNBQWMsR0FBRyxJQUFBLHlCQUFTLEVBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDMUQsR0FBRyxLQUFLLENBQUMsSUFBSTtRQUNiLElBQUksRUFBRTtZQUNKLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJO1lBQ2xCLFVBQVUsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVO1NBQ3ZDO1FBQ0QsSUFBSSxFQUFFLGdCQUFnQjtRQUN0QixNQUFNLEVBQUUsU0FBMEI7S0FDbkMsQ0FBQyxDQUFDLENBQUE7SUFFSCxNQUFNLE9BQU8sR0FBRyxJQUFBLHlCQUFpQixFQUFDLGNBQWMsQ0FBQyxDQUFBO0lBRWpELE1BQU0sSUFBSSxHQUFHLElBQUEseUJBQVMsRUFBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUU7UUFDaEUsT0FBTztZQUNMO2dCQUNFLENBQUMsc0JBQWEsQ0FBQyxFQUFFO29CQUNmLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUztpQkFDM0I7Z0JBQ0QsQ0FBQywwQkFBZSxDQUFDLEVBQUU7b0JBQ2pCLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtpQkFDMUI7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDLENBQUMsQ0FBQTtJQUVGLElBQUEsaUNBQW9CLEVBQUMsSUFBSSxDQUFDLENBQUE7SUFDMUIsSUFBQSw4QkFBc0IsRUFBQztRQUNyQjtZQUNFLElBQUksRUFBRSwwQkFBYyxDQUFDLE9BQU87WUFDNUIsSUFBSSxFQUFFO2dCQUNKLEdBQUcsS0FBSyxDQUFDLElBQUk7Z0JBQ2IsUUFBUSxFQUFFLEtBQUssQ0FBQyxTQUFTO2FBQzFCO1NBQ0Y7UUFDRDtZQUNFLElBQUksRUFBRSw0Q0FBZ0MsQ0FBQyxPQUFPO1lBQzlDLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1NBQzVCO0tBQ0YsQ0FBQyxDQUFBO0lBQ0YsT0FBTyxJQUFJLGdDQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQ3RDLENBQUMsQ0FDRixDQUFBIn0=