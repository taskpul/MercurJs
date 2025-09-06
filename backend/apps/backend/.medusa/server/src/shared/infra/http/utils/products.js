"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchProductDetails = void 0;
const utils_1 = require("@medusajs/framework/utils");
const fetchProductDetails = async (product_id, scope) => {
    const service = scope.resolve(utils_1.Modules.PRODUCT);
    const product = await service.retrieveProduct(product_id);
    return product;
};
exports.fetchProductDetails = fetchProductDetails;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvc2hhcmVkL2luZnJhL2h0dHAvdXRpbHMvcHJvZHVjdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEscURBQW1EO0FBRTVDLE1BQU0sbUJBQW1CLEdBQUcsS0FBSyxFQUN0QyxVQUFrQixFQUNsQixLQUFzQixFQUNELEVBQUU7SUFDdkIsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDOUMsTUFBTSxPQUFPLEdBQUcsTUFBTSxPQUFPLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ3pELE9BQU8sT0FBTyxDQUFBO0FBQ2hCLENBQUMsQ0FBQTtBQVBZLFFBQUEsbUJBQW1CLHVCQU8vQiJ9