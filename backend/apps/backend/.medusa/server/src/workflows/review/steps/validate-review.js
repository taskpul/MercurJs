"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateReviewStep = void 0;
const utils_1 = require("@medusajs/framework/utils");
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const order_review_1 = __importDefault(require("../../../links/order-review"));
exports.validateReviewStep = (0, workflows_sdk_1.createStep)('validate-review', async (reviewToCreate, { container }) => {
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: [order] } = await query.graph({
        entity: 'order',
        fields: ['id'],
        filters: {
            id: reviewToCreate.order_id,
            customer_id: reviewToCreate.customer_id
        }
    });
    if (!order) {
        throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, 'Order not found!');
    }
    const { data } = await query.graph({
        entity: order_review_1.default.entryPoint,
        fields: ['review.reference', 'review.product.id', 'review.seller.id'],
        filters: {
            order_id: reviewToCreate.order_id
        }
    });
    const reviews = data.map((relation) => relation.review);
    if (reviews.some((rev) => rev.reference === reviewToCreate.reference &&
        rev[rev.reference].id === reviewToCreate.reference_id)) {
        throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, 'Review already exists');
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUtcmV2aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9yZXZpZXcvc3RlcHMvdmFsaWRhdGUtcmV2aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHFEQUdrQztBQUNsQyxxRUFBOEQ7QUFJOUQsK0VBQXFEO0FBRXhDLFFBQUEsa0JBQWtCLEdBQUcsSUFBQSwwQkFBVSxFQUMxQyxpQkFBaUIsRUFDakIsS0FBSyxFQUFFLGNBQStCLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO0lBQ3ZELE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFaEUsTUFBTSxFQUNKLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUNkLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ3BCLE1BQU0sRUFBRSxPQUFPO1FBQ2YsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO1FBQ2QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxFQUFFLGNBQWMsQ0FBQyxRQUFRO1lBQzNCLFdBQVcsRUFBRSxjQUFjLENBQUMsV0FBVztTQUN4QztLQUNGLENBQUMsQ0FBQTtJQUVGLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNYLE1BQU0sSUFBSSxtQkFBVyxDQUFDLG1CQUFXLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxrQkFBa0IsQ0FBQyxDQUFBO0lBQzNFLENBQUM7SUFFRCxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ2pDLE1BQU0sRUFBRSxzQkFBVyxDQUFDLFVBQVU7UUFDOUIsTUFBTSxFQUFFLENBQUMsa0JBQWtCLEVBQUUsbUJBQW1CLEVBQUUsa0JBQWtCLENBQUM7UUFDckUsT0FBTyxFQUFFO1lBQ1AsUUFBUSxFQUFFLGNBQWMsQ0FBQyxRQUFRO1NBQ2xDO0tBQ0YsQ0FBQyxDQUFBO0lBRUYsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBRXZELElBQ0UsT0FBTyxDQUFDLElBQUksQ0FDVixDQUFDLEdBQUcsRUFBRSxFQUFFLENBQ04sR0FBRyxDQUFDLFNBQVMsS0FBSyxjQUFjLENBQUMsU0FBUztRQUMxQyxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxjQUFjLENBQUMsWUFBWSxDQUN4RCxFQUNELENBQUM7UUFDRCxNQUFNLElBQUksbUJBQVcsQ0FDbkIsbUJBQVcsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUM5Qix1QkFBdUIsQ0FDeEIsQ0FBQTtJQUNILENBQUM7QUFDSCxDQUFDLENBQ0YsQ0FBQSJ9