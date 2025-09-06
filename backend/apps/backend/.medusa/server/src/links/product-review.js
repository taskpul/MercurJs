"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const product_1 = __importDefault(require("@medusajs/medusa/product"));
const reviews_1 = __importDefault(require("@mercurjs/reviews"));
exports.default = (0, utils_1.defineLink)(product_1.default.linkable.product, {
    linkable: reviews_1.default.linkable.review,
    isList: true
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1yZXZpZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGlua3MvcHJvZHVjdC1yZXZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxREFBc0Q7QUFDdEQsdUVBQW9EO0FBRXBELGdFQUE0QztBQUU1QyxrQkFBZSxJQUFBLGtCQUFVLEVBQUMsaUJBQWEsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFO0lBQ3hELFFBQVEsRUFBRSxpQkFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNO0lBQ3RDLE1BQU0sRUFBRSxJQUFJO0NBQ2IsQ0FBQyxDQUFBIn0=