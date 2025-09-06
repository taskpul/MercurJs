"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const order_1 = __importDefault(require("@medusajs/medusa/order"));
const seller_1 = __importDefault(require("@mercurjs/seller"));
exports.default = (0, utils_1.defineLink)(seller_1.default.linkable.seller, {
    linkable: order_1.default.linkable.order,
    isList: true
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsbGVyLW9yZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpbmtzL3NlbGxlci1vcmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHFEQUFzRDtBQUN0RCxtRUFBZ0Q7QUFFaEQsOERBQTJDO0FBRTNDLGtCQUFlLElBQUEsa0JBQVUsRUFBQyxnQkFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7SUFDdEQsUUFBUSxFQUFFLGVBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSztJQUNwQyxNQUFNLEVBQUUsSUFBSTtDQUNiLENBQUMsQ0FBQSJ9