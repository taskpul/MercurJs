"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignBrandToProductWorkflow = void 0;
const utils_1 = require("@medusajs/framework/utils");
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const brand_1 = require("@mercurjs/brand");
const framework_1 = require("@mercurjs/framework");
const steps_1 = require("../steps");
exports.assignBrandToProductWorkflow = (0, workflows_sdk_1.createWorkflow)('assign-brand-to-product', function (input) {
    const brand = (0, steps_1.createBrandStep)(input);
    const link = (0, workflows_sdk_1.transform)({ brand, input }, ({ brand, input }) => {
        return [
            {
                [utils_1.Modules.PRODUCT]: {
                    product_id: input.product_id
                },
                [brand_1.BRAND_MODULE]: {
                    brand_id: brand.id
                }
            }
        ];
    });
    (0, core_flows_1.createRemoteLinkStep)(link);
    (0, core_flows_1.emitEventStep)({
        eventName: framework_1.AlgoliaEvents.PRODUCTS_CHANGED,
        data: {
            ids: [input.product_id]
        }
    });
    return new workflows_sdk_1.WorkflowResponse(link);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzaWduLWJyYW5kLXRvLXByb2R1Y3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL2JyYW5kL3dvcmtmbG93cy9hc3NpZ24tYnJhbmQtdG8tcHJvZHVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxREFBbUQ7QUFDbkQscUVBSTBDO0FBQzFDLDREQUdvQztBQUVwQywyQ0FBOEM7QUFDOUMsbURBQW1EO0FBRW5ELG9DQUEwQztBQUk3QixRQUFBLDRCQUE0QixHQUFHLElBQUEsOEJBQWMsRUFDeEQseUJBQXlCLEVBQ3pCLFVBQVUsS0FBbUI7SUFDM0IsTUFBTSxLQUFLLEdBQUcsSUFBQSx1QkFBZSxFQUFDLEtBQUssQ0FBQyxDQUFBO0lBRXBDLE1BQU0sSUFBSSxHQUFHLElBQUEseUJBQVMsRUFBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUU7UUFDNUQsT0FBTztZQUNMO2dCQUNFLENBQUMsZUFBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNqQixVQUFVLEVBQUUsS0FBSyxDQUFDLFVBQVU7aUJBQzdCO2dCQUNELENBQUMsb0JBQVksQ0FBQyxFQUFFO29CQUNkLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBRTtpQkFDbkI7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDLENBQUMsQ0FBQTtJQUVGLElBQUEsaUNBQW9CLEVBQUMsSUFBSSxDQUFDLENBQUE7SUFDMUIsSUFBQSwwQkFBYSxFQUFDO1FBQ1osU0FBUyxFQUFFLHlCQUFhLENBQUMsZ0JBQWdCO1FBQ3pDLElBQUksRUFBRTtZQUNKLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7U0FDeEI7S0FDRixDQUFDLENBQUE7SUFDRixPQUFPLElBQUksZ0NBQWdCLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDbkMsQ0FBQyxDQUNGLENBQUEifQ==