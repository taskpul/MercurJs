"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVendorPriceListWorkflow = void 0;
const utils_1 = require("@medusajs/framework/utils");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const seller_1 = require("@mercurjs/seller");
const steps_1 = require("../steps");
exports.createVendorPriceListWorkflow = (0, workflows_sdk_1.createWorkflow)('create-vendor-price-list', function ({ price_lists_data, seller_id }) {
    (0, steps_1.validateVendorPriceListPricesStep)({
        create: price_lists_data.prices,
        seller_id
    });
    const result = core_flows_1.createPriceListsWorkflow.runAsStep({
        input: {
            price_lists_data: [price_lists_data]
        }
    });
    const links = (0, workflows_sdk_1.transform)({ result, seller_id }, ({ result, seller_id }) => {
        return result.map((list) => {
            return {
                [seller_1.SELLER_MODULE]: {
                    seller_id: seller_id
                },
                [utils_1.Modules.PRICING]: {
                    price_list_id: list.id
                }
            };
        });
    });
    (0, core_flows_1.createRemoteLinkStep)(links);
    return new workflows_sdk_1.WorkflowResponse(result);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXZlbmRvci1wcmljZS1saXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9wcmljZS1saXN0L3dvcmtmbG93cy9jcmVhdGUtdmVuZG9yLXByaWNlLWxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EscURBQW1EO0FBQ25ELDREQUdvQztBQUNwQywyREFJZ0M7QUFFaEMsNkNBQWdEO0FBRWhELG9DQUE0RDtBQUUvQyxRQUFBLDZCQUE2QixHQUFHLElBQUEsOEJBQWMsRUFDekQsMEJBQTBCLEVBQzFCLFVBQVUsRUFDUixnQkFBZ0IsRUFDaEIsU0FBUyxFQUlWO0lBQ0MsSUFBQSx5Q0FBaUMsRUFBQztRQUNoQyxNQUFNLEVBQUUsZ0JBQWdCLENBQUMsTUFBTTtRQUMvQixTQUFTO0tBQ1YsQ0FBQyxDQUFBO0lBRUYsTUFBTSxNQUFNLEdBQUcscUNBQXdCLENBQUMsU0FBUyxDQUFDO1FBQ2hELEtBQUssRUFBRTtZQUNMLGdCQUFnQixFQUFFLENBQUMsZ0JBQWdCLENBQUM7U0FDckM7S0FDRixDQUFDLENBQUE7SUFFRixNQUFNLEtBQUssR0FBRyxJQUFBLHlCQUFTLEVBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO1FBQ3ZFLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3pCLE9BQU87Z0JBQ0wsQ0FBQyxzQkFBYSxDQUFDLEVBQUU7b0JBQ2YsU0FBUyxFQUFFLFNBQVM7aUJBQ3JCO2dCQUNELENBQUMsZUFBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNqQixhQUFhLEVBQUUsSUFBSSxDQUFDLEVBQUU7aUJBQ3ZCO2FBQ0YsQ0FBQTtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFDLENBQUE7SUFFRixJQUFBLGlDQUFvQixFQUFDLEtBQUssQ0FBQyxDQUFBO0lBQzNCLE9BQU8sSUFBSSxnQ0FBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUNyQyxDQUFDLENBQ0YsQ0FBQSJ9