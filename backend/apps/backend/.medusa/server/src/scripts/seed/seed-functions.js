"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSalesChannel = createSalesChannel;
exports.createStore = createStore;
exports.createRegions = createRegions;
exports.createPublishableKey = createPublishableKey;
exports.createProductCategories = createProductCategories;
exports.createProductCollections = createProductCollections;
exports.createSeller = createSeller;
exports.createSellerStockLocation = createSellerStockLocation;
exports.createServiceZoneForFulfillmentSet = createServiceZoneForFulfillmentSet;
exports.createSellerShippingOption = createSellerShippingOption;
exports.createSellerProducts = createSellerProducts;
exports.createInventoryItemStockLevels = createInventoryItemStockLevels;
exports.createDefaultCommissionLevel = createDefaultCommissionLevel;
exports.createConfigurationRules = createConfigurationRules;
const utils_1 = require("@medusajs/framework/utils");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const configuration_1 = require("@mercurjs/configuration");
const seller_1 = require("@mercurjs/seller");
const seller_shipping_profile_1 = __importDefault(require("../../links/seller-shipping-profile"));
const workflows_1 = require("../../workflows/commission/workflows");
const workflows_2 = require("../../workflows/configuration/workflows");
const workflows_3 = require("../../workflows/fulfillment-set/workflows");
const workflows_4 = require("../../workflows/seller/workflows");
const seed_products_1 = require("./seed-products");
const countries = ['be', 'de', 'dk', 'se', 'fr', 'es', 'it', 'pl', 'cz', 'nl'];
async function createSalesChannel(container) {
    const salesChannelModuleService = container.resolve(utils_1.Modules.SALES_CHANNEL);
    let [defaultSalesChannel] = await salesChannelModuleService.listSalesChannels({
        name: 'Default Sales Channel'
    });
    if (!defaultSalesChannel) {
        const { result: [salesChannelResult] } = await (0, core_flows_1.createSalesChannelsWorkflow)(container).run({
            input: {
                salesChannelsData: [
                    {
                        name: 'Default Sales Channel'
                    }
                ]
            }
        });
        defaultSalesChannel = salesChannelResult;
    }
    return defaultSalesChannel;
}
async function createStore(container, salesChannelId, regionId) {
    const storeModuleService = container.resolve(utils_1.Modules.STORE);
    const [store] = await storeModuleService.listStores();
    if (!store) {
        return;
    }
    await (0, core_flows_1.updateStoresWorkflow)(container).run({
        input: {
            selector: { id: store.id },
            update: {
                supported_currencies: [
                    {
                        currency_code: 'eur',
                        is_default: true
                    }
                ],
                default_sales_channel_id: salesChannelId,
                default_region_id: regionId
            }
        }
    });
}
async function createRegions(container) {
    const { result: [region] } = await (0, core_flows_1.createRegionsWorkflow)(container).run({
        input: {
            regions: [
                {
                    name: 'Europe',
                    currency_code: 'eur',
                    countries,
                    payment_providers: ['pp_system_default']
                }
            ]
        }
    });
    await (0, core_flows_1.createTaxRegionsWorkflow)(container).run({
        input: countries.map((country_code) => ({
            country_code
        }))
    });
    return region;
}
async function createPublishableKey(container, salesChannelId) {
    const apiKeyService = container.resolve(utils_1.Modules.API_KEY);
    let [key] = await apiKeyService.listApiKeys({ type: 'publishable' });
    if (!key) {
        const { result: [publishableApiKeyResult] } = await (0, core_flows_1.createApiKeysWorkflow)(container).run({
            input: {
                api_keys: [
                    {
                        title: 'Default publishable key',
                        type: 'publishable',
                        created_by: ''
                    }
                ]
            }
        });
        key = publishableApiKeyResult;
    }
    await (0, core_flows_1.linkSalesChannelsToApiKeyWorkflow)(container).run({
        input: {
            id: key.id,
            add: [salesChannelId]
        }
    });
    return key;
}
async function createProductCategories(container) {
    const { result } = await (0, core_flows_1.createProductCategoriesWorkflow)(container).run({
        input: {
            product_categories: [
                {
                    name: 'Sneakers',
                    is_active: true
                },
                {
                    name: 'Sandals',
                    is_active: true
                },
                {
                    name: 'Boots',
                    is_active: true
                },
                {
                    name: 'Sport',
                    is_active: true
                },
                {
                    name: 'Accessories',
                    is_active: true
                },
                {
                    name: 'Tops',
                    is_active: true
                }
            ]
        }
    });
    return result;
}
async function createProductCollections(container) {
    const { result } = await (0, core_flows_1.createCollectionsWorkflow)(container).run({
        input: {
            collections: [
                {
                    title: 'Luxury'
                },
                {
                    title: 'Vintage'
                },
                {
                    title: 'Casual'
                },
                {
                    title: 'Soho'
                },
                {
                    title: 'Streetwear'
                },
                {
                    title: 'Y2K'
                }
            ]
        }
    });
    return result;
}
async function createSeller(container) {
    const authService = container.resolve(utils_1.Modules.AUTH);
    const { authIdentity } = await authService.register('emailpass', {
        body: {
            email: 'seller@mercurjs.com',
            password: 'secret'
        }
    });
    const { result: seller } = await workflows_4.createSellerWorkflow.run({
        container,
        input: {
            auth_identity_id: authIdentity?.id,
            member: {
                name: 'John Doe',
                email: 'seller@mercurjs.com'
            },
            seller: {
                name: 'MercurJS Store'
            }
        }
    });
    return seller;
}
async function createSellerStockLocation(container, sellerId, salesChannelId) {
    const link = container.resolve(utils_1.ContainerRegistrationKeys.LINK);
    const { result: [stock] } = await (0, core_flows_1.createStockLocationsWorkflow)(container).run({
        input: {
            locations: [
                {
                    name: `Stock Location for seller ${sellerId}`,
                    address: {
                        address_1: 'Random Strasse',
                        city: 'Berlin',
                        country_code: 'de'
                    }
                }
            ]
        }
    });
    await link.create([
        {
            [seller_1.SELLER_MODULE]: {
                seller_id: sellerId
            },
            [utils_1.Modules.STOCK_LOCATION]: {
                stock_location_id: stock.id
            }
        },
        {
            [utils_1.Modules.STOCK_LOCATION]: {
                stock_location_id: stock.id
            },
            [utils_1.Modules.FULFILLMENT]: {
                fulfillment_provider_id: 'manual_manual'
            }
        },
        {
            [utils_1.Modules.SALES_CHANNEL]: {
                sales_channel_id: salesChannelId
            },
            [utils_1.Modules.STOCK_LOCATION]: {
                stock_location_id: stock.id
            }
        }
    ]);
    await workflows_3.createLocationFulfillmentSetAndAssociateWithSellerWorkflow.run({
        container,
        input: {
            fulfillment_set_data: {
                name: `${sellerId} fulfillment set`,
                type: 'shipping'
            },
            location_id: stock.id,
            seller_id: sellerId
        }
    });
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: [stockLocation] } = await query.graph({
        entity: 'stock_location',
        fields: ['*', 'fulfillment_sets.*'],
        filters: {
            id: stock.id
        }
    });
    return stockLocation;
}
async function createServiceZoneForFulfillmentSet(container, sellerId, fulfillmentSetId) {
    await core_flows_1.createServiceZonesWorkflow.run({
        container,
        input: {
            data: [
                {
                    fulfillment_set_id: fulfillmentSetId,
                    name: `Europe`,
                    geo_zones: countries.map((c) => ({
                        type: 'country',
                        country_code: c
                    }))
                }
            ]
        }
    });
    const fulfillmentService = container.resolve(utils_1.Modules.FULFILLMENT);
    const [zone] = await fulfillmentService.listServiceZones({
        fulfillment_set: {
            id: fulfillmentSetId
        }
    });
    const link = container.resolve(utils_1.ContainerRegistrationKeys.LINK);
    await link.create({
        [seller_1.SELLER_MODULE]: {
            seller_id: sellerId
        },
        [utils_1.Modules.FULFILLMENT]: {
            service_zone_id: zone.id
        }
    });
    return zone;
}
async function createSellerShippingOption(container, sellerId, sellerName, regionId, serviceZoneId) {
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: [shippingProfile] } = await query.graph({
        entity: seller_shipping_profile_1.default.entryPoint,
        fields: ['shipping_profile_id'],
        filters: {
            seller_id: sellerId
        }
    });
    const { result: [shippingOption] } = await core_flows_1.createShippingOptionsWorkflow.run({
        container,
        input: [
            {
                name: `${sellerName} shipping`,
                shipping_profile_id: shippingProfile.shipping_profile_id,
                service_zone_id: serviceZoneId,
                provider_id: 'manual_manual',
                type: {
                    label: `${sellerName} shipping`,
                    code: sellerName,
                    description: 'Europe shipping'
                },
                rules: [
                    { value: 'true', attribute: 'enabled_in_store', operator: 'eq' },
                    { attribute: 'is_return', value: 'false', operator: 'eq' }
                ],
                prices: [
                    { currency_code: 'eur', amount: 10 },
                    { amount: 10, region_id: regionId }
                ],
                price_type: 'flat',
                data: { id: 'manual-fulfillment' }
            }
        ]
    });
    const link = container.resolve(utils_1.ContainerRegistrationKeys.LINK);
    await link.create({
        [seller_1.SELLER_MODULE]: {
            seller_id: sellerId
        },
        [utils_1.Modules.FULFILLMENT]: {
            shipping_option_id: shippingOption.id
        }
    });
    return shippingOption;
}
async function createSellerProducts(container, sellerId, salesChannelId) {
    const productService = container.resolve(utils_1.Modules.PRODUCT);
    const collections = await productService.listProductCollections({}, { select: ['id', 'title'] });
    const categories = await productService.listProductCategories({}, { select: ['id', 'name'] });
    const randomCategory = () => categories[Math.floor(Math.random() * categories.length)];
    const randomCollection = () => collections[Math.floor(Math.random() * collections.length)];
    const toInsert = seed_products_1.productsToInsert.map((p) => ({
        ...p,
        categories: [
            {
                id: randomCategory().id
            }
        ],
        collection_id: randomCollection().id,
        sales_channels: [
            {
                id: salesChannelId
            }
        ]
    }));
    const { result } = await core_flows_1.createProductsWorkflow.run({
        container,
        input: {
            products: toInsert,
            additional_data: {
                seller_id: sellerId
            }
        }
    });
    return result;
}
async function createInventoryItemStockLevels(container, stockLocationId) {
    const inventoryService = container.resolve(utils_1.Modules.INVENTORY);
    const items = await inventoryService.listInventoryItems({}, { select: ['id'] });
    const toCreate = items.map((i) => ({
        inventory_item_id: i.id,
        location_id: stockLocationId,
        stocked_quantity: Math.floor(Math.random() * 50) + 1
    }));
    const { result } = await core_flows_1.createInventoryLevelsWorkflow.run({
        container,
        input: {
            inventory_levels: toCreate
        }
    });
    return result;
}
async function createDefaultCommissionLevel(container) {
    await workflows_1.createCommissionRuleWorkflow.run({
        container,
        input: {
            name: 'default',
            is_active: true,
            reference: 'site',
            reference_id: '',
            rate: {
                include_tax: true,
                type: 'percentage',
                percentage_rate: 2
            }
        }
    });
}
async function createConfigurationRules(container) {
    const configurationService = container.resolve(configuration_1.CONFIGURATION_MODULE);
    for (const [ruleType, isEnabled] of configuration_1.ConfigurationRuleDefaults) {
        const [existingRule] = await configurationService.listConfigurationRules({
            rule_type: ruleType
        });
        if (!existingRule) {
            await workflows_2.createConfigurationRuleWorkflow.run({
                container,
                input: {
                    rule_type: ruleType,
                    is_enabled: isEnabled
                }
            });
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VlZC1mdW5jdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2NyaXB0cy9zZWVkL3NlZWQtZnVuY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBa0NBLGdEQXdCQztBQUVELGtDQTJCQztBQUNELHNDQXVCQztBQUVELG9EQWlDQztBQUVELDBEQWlDQztBQUVELDREQTJCQztBQUVELG9DQXlCQztBQUVELDhEQTJFQztBQUVELGdGQXdDQztBQUVELGdFQTBEQztBQUVELG9EQThDQztBQUVELHdFQXVCQztBQUVELG9FQWVDO0FBRUQsNERBbUJDO0FBOWdCRCxxREFBOEU7QUFDOUUsNERBY29DO0FBRXBDLDJEQUlnQztBQUNoQyw2Q0FBZ0Q7QUFFaEQsa0dBQXVFO0FBQ3ZFLG9FQUFtRjtBQUNuRix1RUFBeUY7QUFDekYseUVBQXNIO0FBQ3RILGdFQUF1RTtBQUN2RSxtREFBa0Q7QUFFbEQsTUFBTSxTQUFTLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUV2RSxLQUFLLFVBQVUsa0JBQWtCLENBQUMsU0FBMEI7SUFDakUsTUFBTSx5QkFBeUIsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGVBQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUMxRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxNQUFNLHlCQUF5QixDQUFDLGlCQUFpQixDQUMzRTtRQUNFLElBQUksRUFBRSx1QkFBdUI7S0FDOUIsQ0FDRixDQUFBO0lBRUQsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDekIsTUFBTSxFQUNKLE1BQU0sRUFBRSxDQUFDLGtCQUFrQixDQUFDLEVBQzdCLEdBQUcsTUFBTSxJQUFBLHdDQUEyQixFQUFDLFNBQVMsQ0FBQyxD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