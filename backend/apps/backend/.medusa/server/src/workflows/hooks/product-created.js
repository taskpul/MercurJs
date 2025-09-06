"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const framework_1 = require("@mercurjs/framework");
const seller_1 = require("@mercurjs/seller");
const seller_shipping_profile_1 = __importDefault(require("../../links/seller-shipping-profile"));
const utils_2 = require("../attribute/utils");
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
const assignDefaultSellerShippingProfile = async (container, product_id, seller_id) => {
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const link = container.resolve(utils_1.ContainerRegistrationKeys.LINK);
    const { data: [existingLink] } = await query.graph({
        entity: 'product_shipping_profile',
        fields: ['*'],
        filters: {
            product_id
        }
    });
    if (existingLink) {
        return;
    }
    const { data: shippingProfiles } = await query.graph({
        entity: seller_shipping_profile_1.default.entryPoint,
        fields: ['shipping_profile.id', 'shipping_profile.type'],
        filters: {
            seller_id
        }
    });
    const [profile] = shippingProfiles.filter((relation) => relation.shipping_profile.type === 'default');
    if (!profile) {
        return;
    }
    await link.create({
        [utils_1.Modules.PRODUCT]: {
            product_id
        },
        [utils_1.Modules.FULFILLMENT]: {
            shipping_profile_id: profile.shipping_profile.id
        }
    });
};
core_flows_1.createProductsWorkflow.hooks.productsCreated(async ({ products, additional_data }, { container }) => {
    await (0, utils_2.productsCreatedHookHandler)({
        products,
        additional_data,
        container
    });
    const remoteLink = container.resolve(utils_1.ContainerRegistrationKeys.REMOTE_LINK);
    if (!additional_data?.seller_id) {
        return new workflows_sdk_1.StepResponse(undefined, null);
    }
    const variants = products.map((p) => p.variants).flat();
    const remoteLinks = products.map((product) => ({
        [seller_1.SELLER_MODULE]: {
            seller_id: additional_data.seller_id
        },
        [utils_1.Modules.PRODUCT]: {
            product_id: product.id
        }
    }));
    for (const variant of variants) {
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
    await Promise.all(products.map((p) => assignDefaultSellerShippingProfile(container, p.id, additional_data.seller_id)));
    await remoteLink.create(remoteLinks);
    await container.resolve(utils_1.Modules.EVENT_BUS).emit({
        name: framework_1.AlgoliaEvents.PRODUCTS_CHANGED,
        data: { ids: products.map((product) => product.id) }
    });
    return new workflows_sdk_1.StepResponse(undefined, products.map((product) => product.id));
}, async (productIds, { container }) => {
    if (!productIds) {
        return;
    }
    const remoteLink = container.resolve(utils_1.ContainerRegistrationKeys.REMOTE_LINK);
    await remoteLink.dismiss(productIds.map((productId) => ({
        [utils_1.Modules.PRODUCT]: {
            product_id: productId
        }
    })));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1jcmVhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9ob29rcy9wcm9kdWN0LWNyZWF0ZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxxREFBOEU7QUFDOUUsNERBQW9FO0FBQ3BFLDJEQUFzRDtBQUV0RCxtREFBbUQ7QUFDbkQsNkNBQWdEO0FBRWhELGtHQUF1RTtBQUN2RSw4Q0FBK0Q7QUFFL0QsTUFBTSwwQkFBMEIsR0FBRyxLQUFLLEVBQ3RDLFNBQWlCLEVBQ2pCLFNBQTBCLEVBQzFCLEVBQUU7SUFDRixNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2hFLE1BQU0sS0FBSyxHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztRQUM5QixNQUFNLEVBQUUsaUJBQWlCO1FBQ3pCLE1BQU0sRUFBRSxDQUFDLG1DQUFtQyxDQUFDO1FBQzdDLE9BQU8sRUFBRTtZQUNQLEVBQUUsRUFBRSxTQUFTO1NBQ2Q7S0FDRixDQUFDLENBQUE7SUFFRixPQUFPLEtBQUssQ0FBQyxJQUFJO1NBQ2QsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDckUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ1osQ0FBQyxDQUFBO0FBRUQsTUFBTSxrQ0FBa0MsR0FBRyxLQUFLLEVBQzlDLFNBQTBCLEVBQzFCLFVBQWtCLEVBQ2xCLFNBQWlCLEVBQ2pCLEVBQUU7SUFDRixNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2hFLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxPQUFP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