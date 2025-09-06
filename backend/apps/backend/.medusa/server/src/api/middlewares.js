"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const medusa_1 = require("@medusajs/medusa");
const middlewares_1 = require("./admin/middlewares");
const middlewares_2 = require("./hooks/middlewares");
const middlewares_3 = require("./store/middlewares");
const middlewares_4 = require("./vendor/middlewares");
exports.default = (0, medusa_1.defineMiddlewares)({
    routes: [
        ...middlewares_4.vendorMiddlewares,
        ...middlewares_3.storeMiddlewares,
        ...middlewares_1.adminMiddlewares,
        ...middlewares_2.hooksMiddlewares
    ]
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL21pZGRsZXdhcmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkNBQW9EO0FBRXBELHFEQUFzRDtBQUN0RCxxREFBc0Q7QUFDdEQscURBQXNEO0FBQ3RELHNEQUF3RDtBQUV4RCxrQkFBZSxJQUFBLDBCQUFpQixFQUFDO0lBQy9CLE1BQU0sRUFBRTtRQUNOLEdBQUcsK0JBQWlCO1FBQ3BCLEdBQUcsOEJBQWdCO1FBQ25CLEdBQUcsOEJBQWdCO1FBQ25CLEdBQUcsOEJBQWdCO0tBQ3BCO0NBQ0YsQ0FBQyxDQUFBIn0=