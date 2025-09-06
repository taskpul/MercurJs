"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = sellerProductTagRequestAcceptedHandler;
const framework_1 = require("@mercurjs/framework");
const requests_1 = require("@mercurjs/requests");
async function sellerProductTagRequestAcceptedHandler({ event, container }) {
    await (0, requests_1.sendVendorUIRequestNotification)({
        container,
        requestId: event.data.id,
        requestType: 'product_tag',
        template: 'seller_product_tag_request_accepted_notification'
    });
}
exports.config = {
    event: framework_1.ProductTagRequestUpdatedEvent.ACCEPTED,
    context: {
        subscriberId: 'seller-product-tag-request-accepted-handler'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLXNlbGxlci1wcm9kdWN0LXRhZy1yZXF1ZXN0LWFjY2VwdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3N1YnNjcmliZXJzL25vdGlmaWNhdGlvbi1zZWxsZXItcHJvZHVjdC10YWctcmVxdWVzdC1hY2NlcHRlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFLQSx5REFVQztBQWJELG1EQUFtRTtBQUNuRSxpREFBb0U7QUFFckQsS0FBSyxVQUFVLHNDQUFzQyxDQUFDLEVBQ25FLEtBQUssRUFDTCxTQUFTLEVBQ3NCO0lBQy9CLE1BQU0sSUFBQSwwQ0FBK0IsRUFBQztRQUNwQyxTQUFTO1FBQ1QsU0FBUyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN4QixXQUFXLEVBQUUsYUFBYTtRQUMxQixRQUFRLEVBQUUsa0RBQWtEO0tBQzdELENBQUMsQ0FBQTtBQUNKLENBQUM7QUFFWSxRQUFBLE1BQU0sR0FBcUI7SUFDdEMsS0FBSyxFQUFFLHlDQUE2QixDQUFDLFFBQVE7SUFDN0MsT0FBTyxFQUFFO1FBQ1AsWUFBWSxFQUFFLDZDQUE2QztLQUM1RDtDQUNGLENBQUEifQ==