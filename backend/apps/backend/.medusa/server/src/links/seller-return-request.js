"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const order_return_request_1 = __importDefault(require("@mercurjs/order-return-request"));
const seller_1 = __importDefault(require("@mercurjs/seller"));
exports.default = (0, utils_1.defineLink)(seller_1.default.linkable.seller, {
    linkable: order_return_request_1.default.linkable.orderReturnRequest,
    isList: true
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsbGVyLXJldHVybi1yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpbmtzL3NlbGxlci1yZXR1cm4tcmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHFEQUFzRDtBQUV0RCwwRkFBK0Q7QUFDL0QsOERBQTJDO0FBRTNDLGtCQUFlLElBQUEsa0JBQVUsRUFBQyxnQkFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7SUFDdEQsUUFBUSxFQUFFLDhCQUFrQixDQUFDLFFBQVEsQ0FBQyxrQkFBa0I7SUFDeEQsTUFBTSxFQUFFLElBQUk7Q0FDYixDQUFDLENBQUEifQ==