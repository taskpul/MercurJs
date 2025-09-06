"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const requests_1 = __importDefault(require("@mercurjs/requests"));
const seller_1 = __importDefault(require("@mercurjs/seller"));
exports.default = (0, utils_1.defineLink)(seller_1.default.linkable.seller, {
    linkable: requests_1.default.linkable.request,
    isList: true
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsbGVyLXJlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGlua3Mvc2VsbGVyLXJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxREFBc0Q7QUFFdEQsa0VBQStDO0FBQy9DLDhEQUEyQztBQUUzQyxrQkFBZSxJQUFBLGtCQUFVLEVBQUMsZ0JBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO0lBQ3RELFFBQVEsRUFBRSxrQkFBYyxDQUFDLFFBQVEsQ0FBQyxPQUFPO0lBQ3pDLE1BQU0sRUFBRSxJQUFJO0NBQ2IsQ0FBQyxDQUFBIn0=