"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const product_1 = __importDefault(require("@medusajs/medusa/product"));
const attribute_1 = __importDefault(require("@mercurjs/attribute"));
exports.default = (0, utils_1.defineLink)({
    linkable: product_1.default.linkable.productCategory,
    isList: true
}, {
    linkable: attribute_1.default.linkable.attribute,
    isList: true
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnktYXR0cmlidXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpbmtzL2NhdGVnb3J5LWF0dHJpYnV0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHFEQUFzRDtBQUN0RCx1RUFBb0Q7QUFFcEQsb0VBQWlEO0FBRWpELGtCQUFlLElBQUEsa0JBQVUsRUFDdkI7SUFDRSxRQUFRLEVBQUUsaUJBQWEsQ0FBQyxRQUFRLENBQUMsZUFBZTtJQUNoRCxNQUFNLEVBQUUsSUFBSTtDQUNiLEVBQ0Q7SUFDRSxRQUFRLEVBQUUsbUJBQWUsQ0FBQyxRQUFRLENBQUMsU0FBUztJQUM1QyxNQUFNLEVBQUUsSUFBSTtDQUNiLENBQ0YsQ0FBQSJ9