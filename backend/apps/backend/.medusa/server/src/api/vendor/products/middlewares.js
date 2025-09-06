"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorProductsMiddlewares = void 0;
const multer_1 = __importDefault(require("multer"));
const framework_1 = require("@medusajs/framework");
const index_1 = require("@medusajs/medusa/api/admin/products/utils/index");
const framework_2 = require("@mercurjs/framework");
const seller_product_1 = __importDefault(require("../../../links/seller-product"));
const middlewares_1 = require("../../../shared/infra/http/middlewares");
const middlewares_2 = require("../../../shared/infra/http/middlewares");
const query_config_1 = require("../attributes/query-config");
const validators_1 = require("../attributes/validators");
const query_config_2 = require("./query-config");
const validators_2 = require("./validators");
const canVendorCreateProduct = [
    (0, middlewares_2.checkConfigurationRule)(framework_2.ConfigurationRuleType.GLOBAL_PRODUCT_CATALOG, false),
    (0, middlewares_2.checkConfigurationRule)(framework_2.ConfigurationRuleType.PRODUCT_REQUEST_ENABLED, true)
];
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
exports.vendorProductsMiddlewares = [
    {
        method: ['GET'],
        matcher: '/vendor/products',
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_2.VendorGetProductParams, query_config_2.vendorProductQueryConfig.list),
            (0, middlewares_1.filterBySellerId)(),
            (0, framework_1.maybeApplyLinkFilter)({
                entryPoint: seller_product_1.default.entryPoint,
                resourceId: 'product_id',
                filterableField: 'seller_id'
            }),
            (0, framework_1.maybeApplyLinkFilter)({
                entryPoint: 'product_sales_channel',
                resourceId: 'product_id',
                filterableField: 'sales_channel_id'
            }),
            (0, index_1.maybeApplyPriceListsFilter)()
        ]
    },
    {
        method: ['POST'],
        matcher: '/vendor/products',
        middlewares: [
            ...canVendorCreateProduct,
            (0, framework_1.validateAndTransformBody)(validators_2.VendorCreateProduct),
            (0, framework_1.validateAndTransformQuery)(validators_2.VendorGetProductParams, query_config_2.vendorProductQueryConfig.retrieve)
        ]
    },
    {
        method: ['POST'],
        matcher: '/vendor/products/export',
        middlewares: []
    },
    {
        method: ['POST'],
        matcher: '/vendor/products/import',
        middlewares: [
            (0, middlewares_2.checkConfigurationRule)(framework_2.ConfigurationRuleType.PRODUCT_IMPORT_ENABLED, true),
            upload.single('file')
        ]
    },
    {
        method: ['GET'],
        matcher: '/vendor/products/:id',
        middlewares: [
            (0, framework_1.unlessPath)(/.*\/products\/(export|import)/, (0, middlewares_1.checkResourceOwnershipByResourceId)({
                entryPoint: seller_product_1.default.entryPoint,
                filterField: 'product_id'
            })),
            (0, framework_1.unlessPath)(/.*\/products\/(export|import)/, (0, framework_1.validateAndTransformQuery)(validators_2.VendorGetProductParams, query_config_2.vendorProductQueryConfig.retrieve))
        ]
    },
    {
        method: ['POST'],
        matcher: '/vendor/products/:id',
        middlewares: [
            (0, framework_1.unlessPath)(/.*\/products\/(export|import)/, (0, middlewares_1.checkResourceOwnershipByResourceId)({
                entryPoint: seller_product_1.default.entryPoint,
                filterField: 'product_id'
            })),
            (0, framework_1.unlessPath)(/.*\/products\/(export|import)/, (0, framework_1.validateAndTransformBody)(validators_2.VendorUpdateProduct)),
            (0, framework_1.unlessPath)(/.*\/products\/(export|import)/, (0, framework_1.validateAndTransformQuery)(validators_2.VendorGetProductParams, query_config_2.vendorProductQueryConfig.retrieve))
        ]
    },
    {
        method: ['POST'],
        matcher: '/vendor/products/:id/brand',
        middlewares: [
            (0, middlewares_1.checkResourceOwnershipByResourceId)({
                entryPoint: seller_product_1.default.entryPoint,
                filterField: 'product_id'
            }),
            (0, framework_1.validateAndTransformBody)(validators_2.VendorAssignBrandName),
            (0, framework_1.validateAndTransformQuery)(validators_2.VendorGetProductParams, query_config_2.vendorProductQueryConfig.retrieve)
        ]
    },
    {
        method: ['POST'],
        matcher: '/vendor/products/:id/variants',
        middlewares: [
            (0, middlewares_1.checkResourceOwnershipByResourceId)({
                entryPoint: seller_product_1.default.entryPoint,
                filterField: 'product_id'
            }),
            (0, framework_1.validateAndTransformBody)(validators_2.CreateProductVariant),
            (0, framework_1.validateAndTransformQuery)(validators_2.VendorGetProductParams, query_config_2.vendorProductQueryConfig.retrieve)
        ]
    },
    {
        method: ['POST'],
        matcher: '/vendor/products/:id/variants/:variant_id',
        middlewares: [
            (0, middlewares_1.checkResourceOwnershipByResourceId)({
                entryPoint: seller_product_1.default.entryPoint,
                filterField: 'product_id'
            }),
            (0, framework_1.validateAndTransformBody)(validators_2.UpdateProductVariant),
            (0, framework_1.validateAndTransformQuery)(validators_2.VendorGetProductParams, query_config_2.vendorProductQueryConfig.retrieve)
        ]
    },
    {
        method: ['DELETE'],
        matcher: '/vendor/products/:id/variants/:variant_id',
        middlewares: [
            (0, middlewares_1.checkResourceOwnershipByResourceId)({
                entryPoint: seller_product_1.default.entryPoint,
                filterField: 'product_id'
            })
        ]
    },
    {
        method: ['POST'],
        matcher: '/vendor/products/:id/options',
        middlewares: [
            (0, middlewares_1.checkResourceOwnershipByResourceId)({
                entryPoint: seller_product_1.default.entryPoint,
                filterField: 'product_id'
            }),
            (0, framework_1.validateAndTransformBody)(validators_2.CreateProductOption),
            (0, framework_1.validateAndTransformQuery)(validators_2.VendorGetProductParams, query_config_2.vendorProductQueryConfig.retrieve)
        ]
    },
    {
        method: ['POST'],
        matcher: '/vendor/products/:id/options/:option_id',
        middlewares: [
            (0, middlewares_1.checkResourceOwnershipByResourceId)({
                entryPoint: seller_product_1.default.entryPoint,
                filterField: 'product_id'
            }),
            (0, framework_1.validateAndTransformBody)(validators_2.UpdateProductOption),
            (0, framework_1.validateAndTransformQuery)(validators_2.VendorGetProductParams, query_config_2.vendorProductQueryConfig.retrieve)
        ]
    },
    {
        method: ['DELETE'],
        matcher: '/vendor/products/:id/options/:option_id',
        middlewares: [
            (0, middlewares_1.checkResourceOwnershipByResourceId)({
                entryPoint: seller_product_1.default.entryPoint,
                filterField: 'product_id'
            })
        ]
    },
    {
        method: ['DELETE'],
        matcher: '/vendor/products/:id',
        middlewares: [
            (0, middlewares_1.checkResourceOwnershipByResourceId)({
                entryPoint: seller_product_1.default.entryPoint,
                filterField: 'product_id'
            })
        ]
    },
    {
        method: ['POST'],
        matcher: '/vendor/products/:id/status',
        middlewares: [
            (0, middlewares_1.checkResourceOwnershipByResourceId)({
                entryPoint: seller_product_1.default.entryPoint,
                filterField: 'product_id'
            }),
            (0, framework_1.validateAndTransformBody)(validators_2.VendorUpdateProductStatus),
            (0, framework_1.validateAndTransformQuery)(validators_2.VendorGetProductParams, query_config_2.vendorProductQueryConfig.retrieve)
        ]
    },
    {
        method: ['GET'],
        matcher: '/vendor/products/:id/applicable-attributes',
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.VendorGetAttributesParams, query_config_1.retrieveAttributeQueryConfig)
        ]
    }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3ZlbmRvci9wcm9kdWN0cy9taWRkbGV3YXJlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxvREFBMkI7QUFFM0IsbURBSzRCO0FBRTVCLDJFQUE0RjtBQUU1RixtREFBMkQ7QUFFM0QsbUZBQTZEO0FBQzdELHdFQUcrQztBQUMvQyx3RUFBK0U7QUFDL0UsNkRBQXlFO0FBQ3pFLHlEQUFvRTtBQUNwRSxpREFBeUQ7QUFDekQsNkNBVXFCO0FBRXJCLE1BQU0sc0JBQXNCLEdBQUc7SUFDN0IsSUFBQSxvQ0FBc0IsRUFBQyxpQ0FBcUIsQ0FBQyxzQkFBc0IsRUFBRSxLQUFLLENBQUM7SUFDM0UsSUFBQSxvQ0FBc0IsRUFBQyxpQ0FBcUIsQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUM7Q0FDNUUsQ0FBQTtBQUVELE1BQU0sTUFBTSxHQUFHLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxnQkFBTSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQTtBQUU3QyxRQUFBLHlCQUF5QixHQUFzQjtJQUMxRDtRQUNFLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQztRQUNmLE9BQU8sRUFBRSxrQkFBa0I7UUFDM0IsV0FBVyxFQUFFO1lBQ1gsSUFBQSxxQ0FBeUIsRUFDdkIsbUNBQXNCLEVBQ3RCLHVDQUF3QixDQUFDLElBQUksQ0FDOUI7WUFDRCxJQUFBLDhCQUFnQixHQUFFO1lBQ2xCLElBQUEsZ0NBQW9CLEVBQUM7Z0JBQ25CLFVBQVUsRUFBRSx3QkFBaUIsQ0FBQyxVQUFVO2dCQUN4QyxVQUFVLEVBQUUsWUFBWTtnQkFDeEIsZUFBZSxFQUFFLFdBQVc7YUFDN0IsQ0FBQztZQUNGLElBQUEsZ0NBQW9CLEVBQUM7Z0JBQ25CLFVBQVUsRUFBRSx1QkFBdUI7Z0JBQ25DLFVBQVUsRUFBRSxZQUFZO2dCQUN4QixlQUFl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