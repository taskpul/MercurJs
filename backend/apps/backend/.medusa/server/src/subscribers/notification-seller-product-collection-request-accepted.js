"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = sellerProductCollectionRequestAcceptedHandler;
const framework_1 = require("@mercurjs/framework");
const requests_1 = require("@mercurjs/requests");
async function sellerProductCollectionRequestAcceptedHandler({ event, container }) {
    await (0, requests_1.sendVendorUIRequestNotification)({
        container,
        requestId: event.data.id,
        requestType: 'product_collection',
        template: 'seller_product_collection_request_accepted_notification'
    });
}
exports.config = {
    event: framework_1.ProductCollectionRequestUpdatedEvent.ACCEPTED,
    context: {
        subscriberId: 'seller-product-collection-request-accepted-handler'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLXNlbGxlci1wcm9kdWN0LWNvbGxlY3Rpb24tcmVxdWVzdC1hY2NlcHRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdWJzY3JpYmVycy9ub3RpZmljYXRpb24tc2VsbGVyLXByb2R1Y3QtY29sbGVjdGlvbi1yZXF1ZXN0LWFjY2VwdGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUtBLGdFQVVDO0FBYkQsbURBQTBFO0FBQzFFLGlEQUFvRTtBQUVyRCxLQUFLLFVBQVUsNkNBQTZDLENBQUMsRUFDMUUsS0FBSyxFQUNMLFNBQVMsRUFDc0I7SUFDL0IsTUFBTSxJQUFBLDBDQUErQixFQUFDO1FBQ3BDLFNBQVM7UUFDVCxTQUFTLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3hCLFdBQVcsRUFBRSxvQkFBb0I7UUFDakMsUUFBUSxFQUFFLHlEQUF5RDtLQUNwRSxDQUFDLENBQUE7QUFDSixDQUFDO0FBRVksUUFBQSxNQUFNLEdBQXFCO0lBQ3RDLEtBQUssRUFBRSxnREFBb0MsQ0FBQyxRQUFRO0lBQ3BELE9BQU8sRUFBRTtRQUNQLFlBQVksRUFBRSxvREFBb0Q7S0FDbkU7Q0FDRixDQUFBIn0=