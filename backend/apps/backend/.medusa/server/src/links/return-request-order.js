"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const order_1 = __importDefault(require("@medusajs/medusa/order"));
const order_return_request_1 = __importDefault(require("@mercurjs/order-return-request"));
exports.default = (0, utils_1.defineLink)({
    linkable: order_return_request_1.default.linkable.orderReturnRequest,
    isList: true
}, order_1.default.linkable.order);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV0dXJuLXJlcXVlc3Qtb3JkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGlua3MvcmV0dXJuLXJlcXVlc3Qtb3JkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxREFBc0Q7QUFDdEQsbUVBQWdEO0FBRWhELDBGQUErRDtBQUUvRCxrQkFBZSxJQUFBLGtCQUFVLEVBQ3ZCO0lBQ0UsUUFBUSxFQUFFLDhCQUFrQixDQUFDLFFBQVEsQ0FBQyxrQkFBa0I7SUFDeEQsTUFBTSxFQUFFLElBQUk7Q0FDYixFQUNELGVBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUMzQixDQUFBIn0=