"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorProductCollectionsMiddlewares = void 0;
const framework_1 = require("@medusajs/framework");
const query_config_1 = require("./query-config");
const validators_1 = require("./validators");
exports.vendorProductCollectionsMiddlewares = [
    {
        method: ['GET'],
        matcher: '/vendor/product-collections',
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.VendorGetProductCollectionsParams, query_config_1.vendorProductCollectionQueryConfig.list)
        ]
    },
    {
        method: ['GET'],
        matcher: '/vendor/product-collections/:id',
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.VendorGetProductCollectionsParams, query_config_1.vendorProductCollectionQueryConfig.retrieve)
        ]
    }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3ZlbmRvci9wcm9kdWN0LWNvbGxlY3Rpb25zL21pZGRsZXdhcmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1EQUFnRjtBQUVoRixpREFBbUU7QUFDbkUsNkNBQWdFO0FBRW5ELFFBQUEsbUNBQW1DLEdBQXNCO0lBQ3BFO1FBQ0UsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDO1FBQ2YsT0FBTyxFQUFFLDZCQUE2QjtRQUN0QyxXQUFXLEVBQUU7WUFDWCxJQUFBLHFDQUF5QixFQUN2Qiw4Q0FBaUMsRUFDakMsaURBQWtDLENBQUMsSUFBSSxDQUN4QztTQUNGO0tBQ0Y7SUFDRDtRQUNFLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQztRQUNmLE9BQU8sRUFBRSxpQ0FBaUM7UUFDMUMsV0FBVyxFQUFFO1lBQ1gsSUFBQSxxQ0FBeUIsRUFDdkIsOENBQWlDLEVBQ2pDLGlEQUFrQyxDQUFDLFFBQVEsQ0FDNUM7U0FDRjtLQUNGO0NBQ0YsQ0FBQSJ9