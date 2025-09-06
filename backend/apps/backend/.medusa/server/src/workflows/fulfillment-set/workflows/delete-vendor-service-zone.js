"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVendorServiceZonesWorkflow = void 0;
const utils_1 = require("@medusajs/framework/utils");
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const framework_1 = require("@mercurjs/framework");
const seller_1 = require("@mercurjs/seller");
const steps_1 = require("../../common/steps");
exports.deleteVendorServiceZonesWorkflow = (0, workflows_sdk_1.createWorkflow)('delete-vendor-service-zones', function ({ ids, seller_id }) {
    core_flows_1.deleteServiceZonesWorkflow.runAsStep({
        input: {
            ids
        }
    });
    const links = (0, workflows_sdk_1.transform)({ ids, seller_id }, ({ ids, seller_id }) => {
        return ids.map((zone) => ({
            [seller_1.SELLER_MODULE]: {
                seller_id
            },
            [utils_1.Modules.FULFILLMENT]: {
                service_zone_id: zone
            }
        }));
    });
    const events = (0, workflows_sdk_1.transform)(ids, (ids) => ids.map((id) => ({
        name: framework_1.IntermediateEvents.SERVICE_ZONE_CHANGED,
        data: { id }
    })));
    (0, core_flows_1.dismissRemoteLinkStep)(links);
    (0, steps_1.emitMultipleEventsStep)(events);
    return new workflows_sdk_1.WorkflowResponse(ids);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLXZlbmRvci1zZXJ2aWNlLXpvbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL2Z1bGZpbGxtZW50LXNldC93b3JrZmxvd3MvZGVsZXRlLXZlbmRvci1zZXJ2aWNlLXpvbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscURBQW1EO0FBQ25ELHFFQUkwQztBQUMxQyw0REFHb0M7QUFFcEMsbURBQXdEO0FBQ3hELDZDQUFnRDtBQUVoRCw4Q0FBMkQ7QUFJOUMsUUFBQSxnQ0FBZ0MsR0FBRyxJQUFBLDhCQUFjLEVBQzVELDZCQUE2QixFQUM3QixVQUFVLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBZ0I7SUFDeEMsdUNBQTBCLENBQUMsU0FBUyxDQUFDO1FBQ25DLEtBQUssRUFBRTtZQUNMLEdBQUc7U0FDSjtLQUNGLENBQUMsQ0FBQTtJQUVGLE1BQU0sS0FBSyxHQUFHLElBQUEseUJBQVMsRUFBQyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7UUFDakUsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3hCLENBQUMsc0JBQWEsQ0FBQyxFQUFFO2dCQUNmLFNBQVM7YUFDVjtZQUNELENBQUMsZUFBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFO2dCQUNyQixlQUFlLEVBQUUsSUFBSTthQUN0QjtTQUNGLENBQUMsQ0FBQyxDQUFBO0lBQ0wsQ0FBQyxDQUFDLENBQUE7SUFFRixNQUFNLE1BQU0sR0FBRyxJQUFBLHlCQUFTLEVBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FDcEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNmLElBQUksRUFBRSw4QkFBa0IsQ0FBQyxvQkFBb0I7UUFDN0MsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFO0tBQ2IsQ0FBQyxDQUFDLENBQ0osQ0FBQTtJQUVELElBQUEsa0NBQXFCLEVBQUMsS0FBSyxDQUFDLENBQUE7SUFDNUIsSUFBQSw4QkFBc0IsRUFBQyxNQUFNLENBQUMsQ0FBQTtJQUM5QixPQUFPLElBQUksZ0NBQWdCLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDbEMsQ0FBQyxDQUNGLENBQUEifQ==