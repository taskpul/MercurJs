"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterProductsByStatus = filterProductsByStatus;
exports.findAndTransformAlgoliaProducts = findAndTransformAlgoliaProducts;
const zod_1 = require("zod");
const utils_1 = require("@medusajs/framework/utils");
const framework_1 = require("@mercurjs/framework");
const reviews_1 = require("@mercurjs/reviews");
const seller_product_1 = __importDefault(require("../../links/seller-product"));
async function selectProductVariantsSupportedCountries(container, product_id) {
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: variants } = await query.graph({
        entity: 'product_variant',
        fields: ['inventory_items.inventory.location_levels.location_id'],
        filters: {
            product_id
        }
    });
    let location_ids = [];
    for (const variant of variants) {
        const inventory_items = variant.inventory_items?.map((item) => item.inventory) || [];
        const locations = inventory_items
            .flatMap((inventory_item) => inventory_item.location_levels || [])
            .map((level) => level.location_id);
        location_ids = location_ids.concat(locations);
    }
    const { data: stock_locations } = await query.graph({
        entity: 'stock_location',
        fields: ['fulfillment_sets.service_zones.geo_zones.country_code'],
        filters: {
            id: location_ids
        }
    });
    let country_codes = [];
    for (const location of stock_locations) {
        const fulfillmentSets = location.fulfillment_sets?.flatMap((set) => set.service_zones || []) || [];
        const codes = fulfillmentSets
            .flatMap((sz) => sz.geo_zones || [])
            .map((gz) => gz.country_code);
        country_codes = country_codes.concat(codes);
    }
    return [...new Set(country_codes)];
}
async function selectProductSeller(container, product_id) {
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: [product] } = await query.graph({
        entity: seller_product_1.default.entryPoint,
        fields: ['seller_id', 'seller.handle', 'seller.store_status'],
        filters: {
            product_id
        }
    });
    return product
        ? {
            id: product.seller_id,
            handle: product.seller.handle,
            store_status: product.seller.store_status
        }
        : null;
}
async function filterProductsByStatus(container, ids = []) {
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: products } = await query.graph({
        entity: 'product',
        fields: ['id', 'status'],
        filters: {
            id: ids
        }
    });
    const published = products.filter((p) => p.status === 'published');
    const other = (0, utils_1.arrayDifference)(products, published);
    return {
        published: published.map((p) => p.id),
        other: other.map((p) => p.id)
    };
}
async function findAndTransformAlgoliaProducts(container, ids = []) {
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: products } = await query.graph({
        entity: 'product',
        fields: [
            '*',
            'categories.name',
            'categories.id',
            'collection.title ',
            'tags.value',
            'type.value',
            'variants.*',
            'variants.options.*',
            'variants.options.prices.*',
            'variants.prices.*',
            'brand.name',
            'options.*',
            'options.values.*',
            'images.*',
            'attribute_values.value',
            'attribute_values.attribute.name',
            'attribute_values.attribute.is_filterable',
            'attribute_values.attribute.ui_component'
        ],
        filters: ids.length
            ? {
                id: ids,
                status: 'published'
            }
            : { status: 'published' }
    });
    for (const product of products) {
        product.average_rating = await (0, reviews_1.getAvgRating)(container, 'product', product.id);
        product.supported_countries = await selectProductVariantsSupportedCountries(container, product.id);
        product.seller = await selectProductSeller(container, product.id);
        product.options = product.options
            ?.map((option) => {
            return option.values.map((value) => {
                const entry = {};
                entry[option.title.toLowerCase()] = value.value;
                return entry;
            });
        })
            .flat();
        product.variants = zod_1.z.array(framework_1.AlgoliaVariantValidator).parse(product.variants);
        product.variants = product.variants
            ?.map((variant) => {
            return variant.options?.reduce((entry, item) => {
                entry[item.option.title.toLowerCase()] = item.value;
                return entry;
            }, variant);
        })
            .flat();
        product.attribute_values = product.attribute_values?.map((attribute) => {
            return {
                name: attribute.attribute.name,
                value: attribute.value,
                is_filterable: attribute.attribute.is_filterable,
                ui_component: attribute.attribute.ui_component
            };
        });
    }
    return zod_1.z.array(framework_1.AlgoliaProductValidator).parse(products);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxnb2xpYS1wcm9kdWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3N1YnNjcmliZXJzL3V0aWxzL2FsZ29saWEtcHJvZHVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQXlGQSx3REFxQkM7QUFFRCwwRUE2RUM7QUE3TEQsNkJBQXVCO0FBR3ZCLHFEQUdrQztBQUVsQyxtREFHNEI7QUFDNUIsK0NBQWdEO0FBRWhELGdGQUFzRDtBQUV0RCxLQUFLLFVBQVUsdUNBQXVDLENBQ3BELFNBQTBCLEVBQzFCLFVBQWtCO0lBRWxCLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDaEUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDM0MsTUFBTSxFQUFFLGlCQUFpQjtRQUN6QixNQUFNLEVBQUUsQ0FBQyx1REFBdUQsQ0FBQztRQUNqRSxPQUFPLEVBQUU7WUFDUCxVQUFVO1NBQ1g7S0FDRixDQUFDLENBQUE7SUFFRixJQUFJLFlBQVksR0FBRyxFQUFFLENBQUE7SUFFckIsS0FBSyxNQUFNLE9BQU8sSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUMvQixNQUFNLGVBQWUsR0FDbkIsT0FBTyxDQUFDLGVBQWUsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDOUQsTUFBTSxTQUFTLEdBQUcsZUFBZTthQUM5QixPQUFPLENBQUMsQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLGNBQWMsQ0FBQyxlQUFlLElBQUksRUFBRSxDQUFDO2FBQ2pFLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBRXBDLFlBQVksR0FBRyxZQUFZLENBQUMs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