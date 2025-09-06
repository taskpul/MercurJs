"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVendorServiceZonesWorkflow = void 0;
const utils_1 = require("@medusajs/framework/utils");
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const framework_1 = require("@mercurjs/framework");
const seller_1 = require("@mercurjs/seller");
const steps_1 = require("../../common/steps");
exports.createVendorServiceZonesWorkflow = (0, workflows_sdk_1.createWorkflow)('create-vendor-service-zones', function ({ data, seller_id }) {
    const zones = core_flows_1.createServiceZonesWorkflow.runAsStep({ input: { data } });
    const links = (0, workflows_sdk_1.transform)({ zones, seller_id }, ({ zones, seller_id }) => {
        return zones.map((zone) => ({
            [seller_1.SELLER_MODULE]: {
                seller_id: seller_id
            },
            [utils_1.Modules.FULFILLMENT]: {
                service_zone_id: zone.id
            }
        }));
    });
    const events = (0, workflows_sdk_1.transform)(zones, (zones) => zones.map((z) => ({
        name: framework_1.IntermediateEvents.SERVICE_ZONE_CHANGED,
        data: { id: z.id }
    })));
    (0, core_flows_1.createRemoteLinkStep)(links);
    (0, steps_1.emitMultipleEventsStep)(events);
    return new workflows_sdk_1.WorkflowResponse(zones);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXZlbmRvci1zZXJ2aWNlLXpvbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL2Z1bGZpbGxtZW50LXNldC93b3JrZmxvd3MvY3JlYXRlLXZlbmRvci1zZXJ2aWNlLXpvbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EscURBQW1EO0FBQ25ELHFFQUkwQztBQUMxQyw0REFHb0M7QUFFcEMsbURBQXdEO0FBQ3hELDZDQUFnRDtBQUVoRCw4Q0FBMkQ7QUFJOUMsUUFBQSxnQ0FBZ0MsR0FBRyxJQUFBLDhCQUFjLEVBQzVELDZCQUE2QixFQUM3QixVQUFVLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBZ0I7SUFDekMsTUFBTSxLQUFLLEdBQUcsdUNBQTBCLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBRXZFLE1BQU0sS0FBSyxHQUFHLElBQUEseUJBQVMsRUFBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7UUFDckUsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzFCLENBQUMsc0JBQWEsQ0FBQyxFQUFFO2dCQUNmLFNBQVMsRUFBRSxTQUFTO2FBQ3JCO1lBQ0QsQ0FBQyxlQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0JBQ3JCLGVBQWUsRUFBRSxJQUFJLENBQUMsRUFBRTthQUN6QjtTQUNGLENBQUMsQ0FBQyxDQUFBO0lBQ0wsQ0FBQyxDQUFDLENBQUE7SUFFRixNQUFNLE1BQU0sR0FBRyxJQUFBLHlCQUFTLEVBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FDeEMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNoQixJQUFJLEVBQUUsOEJBQWtCLENBQUMsb0JBQW9CO1FBQzdDLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0tBQ25CLENBQUMsQ0FBQyxDQUNKLENBQUE7SUFFRCxJQUFBLGlDQUFvQixFQUFDLEtBQUssQ0FBQyxDQUFBO0lBQzNCLElBQUEsOEJBQXNCLEVBQUMsTUFBTSxDQUFDLENBQUE7SUFDOUIsT0FBTyxJQUFJLGdDQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ3BDLENBQUMsQ0FDRixDQUFBIn0=