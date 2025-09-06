"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const reviews_1 = __importDefault(require("@mercurjs/reviews"));
const seller_1 = __importDefault(require("@mercurjs/seller"));
exports.default = (0, utils_1.defineLink)(seller_1.default.linkable.seller, {
    linkable: reviews_1.default.linkable.review,
    isList: true
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsbGVyLXJldmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saW5rcy9zZWxsZXItcmV2aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscURBQXNEO0FBRXRELGdFQUE0QztBQUM1Qyw4REFBMkM7QUFFM0Msa0JBQWUsSUFBQSxrQkFBVSxFQUFDLGdCQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtJQUN0RCxRQUFRLEVBQUUsaUJBQVksQ0FBQyxRQUFRLENBQUMsTUFBTTtJQUN0QyxNQUFNLEVBQUUsSUFBSTtDQUNiLENBQUMsQ0FBQSJ9