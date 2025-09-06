"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddlewares = void 0;
const middlewares_1 = require("./attributes/middlewares");
const middlewares_2 = require("./commission/middlewares");
const middlewares_3 = require("./configuration/middlewares");
const middlewares_4 = require("./order-sets/middlewares");
const middlewares_5 = require("./products/middlewares");
const middlewares_6 = require("./requests/middlewares");
const middlewares_7 = require("./return-request/middlewares");
const middlewares_8 = require("./reviews/middlewares");
const middlewares_9 = require("./sellers/middlewares");
exports.adminMiddlewares = [
    ...middlewares_4.orderSetsMiddlewares,
    ...middlewares_6.requestsMiddlewares,
    ...middlewares_3.configurationMiddleware,
    ...middlewares_7.returnRequestsMiddlewares,
    ...middlewares_2.commissionMiddlewares,
    ...middlewares_9.sellerMiddlewares,
    ...middlewares_8.reviewsMiddlewares,
    ...middlewares_1.attributeMiddlewares,
    ...middlewares_5.adminProductsMiddlewares
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL21pZGRsZXdhcmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLDBEQUErRDtBQUMvRCwwREFBZ0U7QUFDaEUsNkRBQXFFO0FBQ3JFLDBEQUErRDtBQUMvRCx3REFBaUU7QUFDakUsd0RBQTREO0FBQzVELDhEQUF3RTtBQUN4RSx1REFBMEQ7QUFDMUQsdURBQXlEO0FBRTVDLFFBQUEsZ0JBQWdCLEdBQXNCO0lBQ2pELEdBQUcsa0NBQW9CO0lBQ3ZCLEdBQUcsaUNBQW1CO0lBQ3RCLEdBQUcscUNBQXVCO0lBQzFCLEdBQUcsdUNBQXlCO0lBQzVCLEdBQUcsbUNBQXFCO0lBQ3hCLEdBQUcsK0JBQWlCO0lBQ3BCLEdBQUcsZ0NBQWtCO0lBQ3JCLEdBQUcsa0NBQW9CO0lBQ3ZCLEdBQUcsc0NBQXdCO0NBQzVCLENBQUEifQ==