"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = sellerProductCategoryRequestRejectedHandler;
const framework_1 = require("@mercurjs/framework");
const requests_1 = require("@mercurjs/requests");
async function sellerProductCategoryRequestRejectedHandler({ event, container }) {
    await (0, requests_1.sendVendorUIRequestNotification)({
        container,
        requestId: event.data.id,
        requestType: 'product_category',
        template: 'seller_product_category_request_rejected_notification'
    });
}
exports.config = {
    event: framework_1.ProductCategoryRequestUpdatedEvent.REJECTED,
    context: {
        subscriberId: 'seller-product-category-request-rejected-handler'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLXNlbGxlci1wcm9kdWN0LWNhdGVnb3J5LXJlcXVlc3QtcmVqZWN0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc3Vic2NyaWJlcnMvbm90aWZpY2F0aW9uLXNlbGxlci1wcm9kdWN0LWNhdGVnb3J5LXJlcXVlc3QtcmVqZWN0ZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBS0EsOERBVUM7QUFiRCxtREFBd0U7QUFDeEUsaURBQW9FO0FBRXJELEtBQUssVUFBVSwyQ0FBMkMsQ0FBQyxFQUN4RSxLQUFLLEVBQ0wsU0FBUyxFQUNzQjtJQUMvQixNQUFNLElBQUEsMENBQStCLEVBQUM7UUFDcEMsU0FBUztRQUNULFNBQVMsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDeEIsV0FBVyxFQUFFLGtCQUFrQjtRQUMvQixRQUFRLEVBQUUsdURBQXVEO0tBQ2xFLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFFWSxRQUFBLE1BQU0sR0FBcUI7SUFDdEMsS0FBSyxFQUFFLDhDQUFrQyxDQUFDLFFBQVE7SUFDbEQsT0FBTyxFQUFFO1FBQ1AsWUFBWSxFQUFFLGtEQUFrRDtLQUNqRTtDQUNGLENBQUEifQ==