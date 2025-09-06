"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const customer_1 = __importDefault(require("@medusajs/medusa/customer"));
const reviews_1 = __importDefault(require("@mercurjs/reviews"));
exports.default = (0, utils_1.defineLink)(customer_1.default.linkable.customer, {
    linkable: reviews_1.default.linkable.review,
    isList: true
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItcmV2aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpbmtzL2N1c3RvbWVyLXJldmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHFEQUFzRDtBQUN0RCx5RUFBc0Q7QUFFdEQsZ0VBQTRDO0FBRTVDLGtCQUFlLElBQUEsa0JBQVUsRUFBQyxrQkFBYyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7SUFDMUQsUUFBUSxFQUFFLGlCQUFZLENBQUMsUUFBUSxDQUFDLE1BQU07SUFDdEMsTUFBTSxFQUFFLElBQUk7Q0FDYixDQUFDLENBQUEifQ==