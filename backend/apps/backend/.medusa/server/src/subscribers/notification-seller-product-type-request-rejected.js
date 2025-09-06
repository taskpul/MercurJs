"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = sellerProductTypeRequestRejectedHandler;
const framework_1 = require("@mercurjs/framework");
const requests_1 = require("@mercurjs/requests");
async function sellerProductTypeRequestRejectedHandler({ event, container }) {
    await (0, requests_1.sendVendorUIRequestNotification)({
        container,
        requestId: event.data.id,
        requestType: 'product_type',
        template: 'seller_product_type_request_rejected_notification'
    });
}
exports.config = {
    event: framework_1.ProductTypeRequestUpdatedEvent.REJECTED,
    context: {
        subscriberId: 'seller-product-type-request-rejected-handler'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLXNlbGxlci1wcm9kdWN0LXR5cGUtcmVxdWVzdC1yZWplY3RlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdWJzY3JpYmVycy9ub3RpZmljYXRpb24tc2VsbGVyLXByb2R1Y3QtdHlwZS1yZXF1ZXN0LXJlamVjdGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUtBLDBEQVVDO0FBYkQsbURBQW9FO0FBQ3BFLGlEQUFvRTtBQUVyRCxLQUFLLFVBQVUsdUNBQXVDLENBQUMsRUFDcEUsS0FBSyxFQUNMLFNBQVMsRUFDc0I7SUFDL0IsTUFBTSxJQUFBLDBDQUErQixFQUFDO1FBQ3BDLFNBQVM7UUFDVCxTQUFTLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3hCLFdBQVcsRUFBRSxjQUFjO1FBQzNCLFFBQVEsRUFBRSxtREFBbUQ7S0FDOUQsQ0FBQyxDQUFBO0FBQ0osQ0FBQztBQUVZLFFBQUEsTUFBTSxHQUFxQjtJQUN0QyxLQUFLLEVBQUUsMENBQThCLENBQUMsUUFBUTtJQUM5QyxPQUFPLEVBQUU7UUFDUCxZQUFZLEVBQUUsOENBQThDO0tBQzdEO0NBQ0YsQ0FBQSJ9