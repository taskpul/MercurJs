"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const seller_1 = require("@mercurjs/seller");
const getVariantInventoryItemIds = async (variantId, container) => {
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const items = await query.graph({
        entity: 'product_variant',
        fields: ['inventory_items.inventory_item_id'],
        filters: {
            id: variantId
        }
    });
    return items.data
        .map((item) => item.inventory_items.map((ii) => ii.inventory_item_id))
        .flat(2);
};
core_flows_1.createProductVariantsWorkflow.hooks.productVariantsCreated(async ({ product_variants, additional_data }, { container }) => {
    if (!additional_data?.seller_id) {
        return;
    }
    const remoteLinks = [];
    for (const variant of product_variants) {
        if (variant.manage_inventory) {
            const inventoryItemIds = await getVariantInventoryItemIds(variant.id, container);
            inventoryItemIds.forEach((inventory_item_id) => {
                remoteLinks.push({
                    [seller_1.SELLER_MODULE]: {
                        seller_id: additional_data.seller_id
                    },
                    [utils_1.Modules.INVENTORY]: {
                        inventory_item_id
                    }
                });
            });
        }
    }
    const remoteLink = container.resolve(utils_1.ContainerRegistrationKeys.LINK);
    await remoteLink.create(remoteLinks);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC12YXJpYW50LWNyZWF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL2hvb2tzL3Byb2R1Y3QtdmFyaWFudC1jcmVhdGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEscURBQThFO0FBQzlFLDREQUEyRTtBQUUzRSw2Q0FBZ0Q7QUFFaEQsTUFBTSwwQkFBMEIsR0FBRyxLQUFLLEVBQ3RDLFNBQWlCLEVBQ2pCLFNBQTBCLEVBQzFCLEVBQUU7SUFDRixNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2hFLE1BQU0sS0FBSyxHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztRQUM5QixNQUFNLEVBQUUsaUJBQWlCO1FBQ3pCLE1BQU0sRUFBRSxDQUFDLG1DQUFtQyxDQUFDO1FBQzdDLE9BQU8sRUFBRTtZQUNQLEVBQUUsRUFBRSxTQUFTO1NBQ2Q7S0FDRixDQUFDLENBQUE7SUFFRixPQUFPLEtBQUssQ0FBQyxJQUFJO1NBQ2QsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDckUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ1osQ0FBQyxDQUFBO0FBRUQsMENBQTZCLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUN4RCxLQUFLLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDN0QsSUFBSSxDQUFDLGVBQWUsRUFBRSxTQUFTLEVBQUUsQ0FBQztRQUNoQyxPQUFNO0lBQ1IsQ0FBQztJQUVELE1BQU0sV0FBVyxHQUFxQixFQUFFLENBQUE7SUFFeEMsS0FBSyxNQUFNLE9BQU8sSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3ZDLElBQUksT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDN0IsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLDBCQUEwQixDQUN2RCxPQUFPLENBQUMsRUFBRSxFQUNWLFNBQVMsQ0FDVixDQUFBO1lBRUQsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsaUJBQWlCLEVBQUUsRUFBRTtnQkFDN0MsV0FBVyxDQUFDLElBQUksQ0FBQztvQkFDZixDQUFDLHNCQUFhLENBQUMsRUFBRTt3QkFDZixTQUFTLEVBQUUsZUFBZSxDQUFDLFNBQVM7cUJBQ3JDO29CQUNELENBQUMsZUFBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFO3dCQUNuQixpQkFBaUI7cUJBQ2xCO2lCQUNGLENBQUMsQ0FBQTtZQUNKLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQztJQUNILENBQUM7SUFDRCxNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3BFLE1BQU0sVUFBVSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtBQUN0QyxDQUFDLENBQ0YsQ0FBQSJ9