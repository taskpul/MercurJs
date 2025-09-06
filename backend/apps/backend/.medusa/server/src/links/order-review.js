"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const order_1 = __importDefault(require("@medusajs/medusa/order"));
const reviews_1 = __importDefault(require("@mercurjs/reviews"));
exports.default = (0, utils_1.defineLink)(order_1.default.linkable.order, {
    linkable: reviews_1.default.linkable.review,
    isList: true
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItcmV2aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpbmtzL29yZGVyLXJldmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHFEQUFzRDtBQUN0RCxtRUFBZ0Q7QUFFaEQsZ0VBQTRDO0FBRTVDLGtCQUFlLElBQUEsa0JBQVUsRUFBQyxlQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRTtJQUNwRCxRQUFRLEVBQUUsaUJBQVksQ0FBQyxRQUFRLENBQUMsTUFBTTtJQUN0QyxNQUFNLEVBQUUsSUFBSTtDQUNiLENBQUMsQ0FBQSJ9