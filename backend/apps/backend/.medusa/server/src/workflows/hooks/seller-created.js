"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const seller_1 = require("@mercurjs/seller");
const workflows_1 = require("../seller/workflows");
workflows_1.createSellerWorkflow.hooks.sellerCreated(async ({ sellerId }, { container }) => {
    const link = container.resolve(utils_1.ContainerRegistrationKeys.LINK);
    const { result } = await core_flows_1.createShippingProfilesWorkflow.run({
        container,
        input: {
            data: [
                {
                    type: 'default',
                    name: `${sellerId}:Default shipping profile`
                }
            ]
        }
    });
    await link.create({
        [seller_1.SELLER_MODULE]: {
            seller_id: sellerId
        },
        [utils_1.Modules.FULFILLMENT]: {
            shipping_profile_id: result[0].id
        }
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsbGVyLWNyZWF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL2hvb2tzL3NlbGxlci1jcmVhdGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQThFO0FBQzlFLDREQUE0RTtBQUU1RSw2Q0FBZ0Q7QUFFaEQsbURBQTBEO0FBRTFELGdDQUFvQixDQUFDLEtBQUssQ0FBQyxhQUFhLENBQ3RDLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUNwQyxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzlELE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxNQUFNLDJDQUE4QixDQUFDLEdBQUcsQ0FBQztRQUMxRCxTQUFTO1FBQ1QsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFO2dCQUNKO29CQUNFLElBQUksRUFBRSxTQUFTO29CQUNmLElBQUksRUFBRSxHQUFHLFFBQVEsMkJBQTJCO2lCQUM3QzthQUNGO1NBQ0Y7S0FDRixDQUFDLENBQUE7SUFFRixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxzQkFBYSxDQUFDLEVBQUU7WUFDZixTQUFTLEVBQUUsUUFBUTtTQUNwQjtRQUNELENBQUMsZUFBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3JCLG1CQUFtQixFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1NBQ2xDO0tBQ0YsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUNGLENBQUEifQ==