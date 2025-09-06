"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLocationFulfillmentSetAndAssociateWithSellerWorkflow = void 0;
const utils_1 = require("@medusajs/framework/utils");
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const workflows_sdk_2 = require("@medusajs/workflows-sdk");
const seller_1 = require("@mercurjs/seller");
exports.createLocationFulfillmentSetAndAssociateWithSellerWorkflow = (0, workflows_sdk_2.createWorkflow)('create-fulfillment-set-and-associate-with-seller', function (input) {
    const fulfillmentSet = (0, core_flows_1.createFulfillmentSets)([
        {
            name: input.fulfillment_set_data.name,
            type: input.fulfillment_set_data.type
        }
    ]);
    const fullfillmentSetId = (0, workflows_sdk_1.transform)(fulfillmentSet, (data) => data[0].id);
    (0, core_flows_1.createRemoteLinkStep)([
        {
            [utils_1.Modules.STOCK_LOCATION]: {
                stock_location_id: input.location_id
            },
            [utils_1.Modules.FULFILLMENT]: {
                fulfillment_set_id: fullfillmentSetId
            }
        },
        {
            [seller_1.SELLER_MODULE]: {
                seller_id: input.seller_id
            },
            [utils_1.Modules.FULFILLMENT]: {
                fulfillment_set_id: fullfillmentSetId
            }
        }
    ]);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWxvY2F0aW9uLWZ1bGZpbGxtZW50LXNldC1hbmQtYXNzb2NpYXRlLXdpdGgtc2VsbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9mdWxmaWxsbWVudC1zZXQvd29ya2Zsb3dzL2NyZWF0ZS1sb2NhdGlvbi1mdWxmaWxsbWVudC1zZXQtYW5kLWFzc29jaWF0ZS13aXRoLXNlbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxREFBbUQ7QUFDbkQscUVBQTZEO0FBQzdELDREQUdvQztBQUNwQywyREFBd0Q7QUFFeEQsNkNBQWdEO0FBV25DLFFBQUEsMERBQTBELEdBQ3JFLElBQUEsOEJBQWMsRUFDWixrREFBa0QsRUFDbEQsVUFBVSxLQUFzRDtJQUM5RCxNQUFNLGNBQWMsR0FBRyxJQUFBLGtDQUFxQixFQUFDO1FBQzNDO1lBQ0UsSUFBSSxFQUFFLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJO1lBQ3JDLElBQUksRUFBRSxLQUFLLENBQUMsb0JBQW9CLENBQUMsSUFBSTtTQUN0QztLQUNGLENBQUMsQ0FBQTtJQUVGLE1BQU0saUJBQWlCLEdBQUcsSUFBQSx5QkFBUyxFQUFDLGNBQWMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBRXpFLElBQUEsaUNBQW9CLEVBQUM7UUFDbkI7WUFDRSxDQUFDLGVBQU8sQ0FBQyxjQUFjLENBQUMsRUFBRTtnQkFDeEIsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLFdBQVc7YUFDckM7WUFDRCxDQUFDLGVBQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtnQkFDckIsa0JBQWtCLEVBQUUsaUJBQWlCO2FBQ3RDO1NBQ0Y7UUFDRDtZQUNFLENBQUMsc0JBQWEsQ0FBQyxFQUFFO2dCQUNmLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUzthQUMzQjtZQUNELENBQUMsZUFBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFO2dCQUNyQixrQkFBa0IsRUFBRSxpQkFBaUI7YUFDdEM7U0FDRjtLQUNGLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FDRixDQUFBIn0=