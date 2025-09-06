"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importSellerProductsWorkflow = void 0;
const core_flows_1 = require("@medusajs/medusa/core-flows");
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const framework_1 = require("@mercurjs/framework");
const requests_1 = require("@mercurjs/requests");
const seller_1 = require("@mercurjs/seller");
const steps_1 = require("../../common/steps");
const steps_2 = require("../../requests/steps");
const steps_3 = require("../steps");
exports.importSellerProductsWorkflow = (0, workflows_sdk_1.createWorkflow)('import-seller-products', function (input) {
    const products = (0, core_flows_1.parseProductCsvStep)(input.file_content);
    const batchCreate = (0, steps_3.validateProductsToImportStep)(products);
    const created = core_flows_1.createProductsWorkflow.runAsStep({
        input: {
            products: batchCreate,
            additional_data: { seller_id: input.seller_id }
        }
    });
    const requestsPayload = (0, workflows_sdk_1.transform)({ created, input }, ({ created, input }) => {
        return created.map((p) => ({
            data: {
                ...p,
                product_id: p.id
            },
            submitter_id: input.submitter_id,
            type: 'product',
            status: 'pending'
        }));
    });
    const requests = (0, steps_2.createRequestStep)(requestsPayload);
    const link = (0, workflows_sdk_1.transform)({ requests, input }, ({ requests, input }) => {
        return requests.map(({ id }) => ({
            [seller_1.SELLER_MODULE]: {
                seller_id: input.seller_id
            },
            [requests_1.REQUESTS_MODULE]: {
                request_id: id
            }
        }));
    });
    const events = (0, workflows_sdk_1.transform)(requests, (requests) => {
        return requests.map(({ id }) => ({
            name: framework_1.ProductRequestUpdatedEvent.CREATED,
            data: { id }
        }));
    });
    (0, core_flows_1.createRemoteLinkStep)(link);
    (0, steps_1.emitMultipleEventsStep)(events);
    return new workflows_sdk_1.WorkflowResponse(created);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LXNlbGxlci1wcm9kdWN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3Mvc2VsbGVyL3dvcmtmbG93cy9pbXBvcnQtc2VsbGVyLXByb2R1Y3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDREQUlvQztBQUNwQywyREFJZ0M7QUFFaEMsbURBQStFO0FBQy9FLGlEQUFvRDtBQUNwRCw2Q0FBZ0Q7QUFFaEQsOENBQTJEO0FBQzNELGdEQUF3RDtBQUN4RCxvQ0FBdUQ7QUFFMUMsUUFBQSw0QkFBNEIsR0FBRyxJQUFBLDhCQUFjLEVBQ3hELHdCQUF3QixFQUN4QixVQUFVLEtBSVQ7SUFDQyxNQUFNLFFBQVEsR0FBRyxJQUFBLGdDQUFtQixFQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUN4RCxNQUFNLFdBQVcsR0FBRyxJQUFBLG9DQUE0QixFQUFDLFFBQVEsQ0FBQyxDQUFBO0lBRTFELE1BQU0sT0FBTyxHQUFHLG1DQUFzQixDQUFDLFNBQVMsQ0FBQztRQUMvQyxLQUFLLEVBQUU7WUFDTCxRQUFRLEVBQUUsV0FBVztZQUNyQixlQUFlLEVBQUUsRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVMsRUFBRTtTQUNoRDtLQUNGLENBQUMsQ0FBQTtJQUVGLE1BQU0sZUFBZSxHQUFHLElBQUEseUJBQVMsRUFDL0IsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQ2xCLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRTtRQUNyQixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDekIsSUFBSSxFQUFFO2dCQUNKLEdBQUcsQ0FBQztnQkFDSixVQUFVLEVBQUUsQ0FBQyxDQUFDLEVBQUU7YUFDakI7WUFDRCxZQUFZLEVBQUUsS0FBSyxDQUFDLFlBQVk7WUFDaEMsSUFBSSxFQUFFLFNBQVM7WUFDZixNQUFNLEVBQUUsU0FBMEI7U0FDbkMsQ0FBQyxDQUFDLENBQUE7SUFDTCxDQUFDLENBQ0YsQ0FBQTtJQUVELE1BQU0sUUFBUSxHQUFHLElBQUEseUJBQWlCLEVBQUMsZUFBZSxDQUFDLENBQUE7SUFFbkQsTUFBTSxJQUFJLEdBQUcsSUFBQSx5QkFBUyxFQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRTtRQUNsRSxPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQy9CLENBQUMsc0JBQWEsQ0FBQyxFQUFFO2dCQUNmLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUzthQUMzQjtZQUNELENBQUMsMEJBQWUsQ0FBQyxFQUFFO2dCQUNqQixVQUFVLEVBQUUsRUFBRTthQUNmO1NBQ0YsQ0FBQyxDQUFDLENBQUE7SUFDTCxDQUFDLENBQUMsQ0FBQTtJQUVGLE1BQU0sTUFBTSxHQUFHLElBQUEseUJBQVMsRUFBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRTtRQUM5QyxPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQy9CLElBQUksRUFBRSxzQ0FBMEIsQ0FBQyxPQUFPO1lBQ3hDLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRTtTQUNiLENBQUMsQ0FBQyxDQUFBO0lBQ0wsQ0FBQyxDQUFDLENBQUE7SUFFRixJQUFBLGlDQUFvQixFQUFDLElBQUksQ0FBQyxDQUFBO0lBQzFCLElBQUEsOEJBQXNCLEVBQUMsTUFBTSxDQUFDLENBQUE7SUFFOUIsT0FBTyxJQUFJLGdDQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQ3RDLENBQUMsQ0FDRixDQUFBIn0=