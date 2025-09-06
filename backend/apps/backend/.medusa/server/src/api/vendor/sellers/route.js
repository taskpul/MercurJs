"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
const utils_1 = require("@medusajs/framework/utils");
const workflows_1 = require("../../../workflows/requests/workflows");
/**
 * @oas [post] /vendor/sellers
 * operationId: "VendorCreateSeller"
 * summary: "Create a Seller"
 * description: "Creates a request to create a new seller with an initial owner member."
 * x-authenticated: true
 * requestBody:
 *   content:
 *     application/json:
 *       schema:
 *         $ref: "#/components/schemas/VendorCreateSeller"
 * responses:
 *   "201":
 *     description: Created
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             request:
 *               $ref: "#/components/schemas/VendorRequest"
 * tags:
 *   - Vendor Sellers
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 */
const POST = async (req, res) => {
    if (req.auth_context?.actor_id) {
        throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, 'Request already authenticated as a seller.');
    }
    const query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { member, ...sellerData } = req.validatedBody;
    const { data: [identity] } = await query.graph({
        entity: 'provider_identity',
        fields: ['id', 'entity_id'],
        filters: {
            auth_identity_id: req.auth_context?.auth_identity_id
        }
    });
    const { data: [existingRequest] } = await query.graph({
        entity: 'request',
        fields: ['id'],
        filters: {
            submitter_id: identity.id,
            type: 'seller'
        }
    });
    if (existingRequest) {
        throw new utils_1.MedusaError(utils_1.MedusaError.Types.CONFLICT, 'Request already exists!');
    }
    const { result: [request] } = await workflows_1.createSellerCreationRequestWorkflow.run({
        input: {
            data: {
                seller: { ...sellerData, email: sellerData.email || member.email },
                member,
                auth_identity_id: req.auth_context?.auth_identity_id,
                provider_identity_id: identity.entity_id
            },
            type: 'seller',
            submitter_id: identity.id
        },
        container: req.scope
    });
    res.status(201).json({ request });
};
exports.POST = POST;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3ZlbmRvci9zZWxsZXJzL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHFEQUdrQztBQUVsQyxxRUFBMkY7QUFHM0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0ksTUFBTSxJQUFJLEdBQUcsS0FBSyxFQUN2QixHQUF1RCxFQUN2RCxHQUFtQixFQUNuQixFQUFFO0lBQ0YsSUFBSSxHQUFHLENBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxDQUFDO1FBQy9CLE1BQU0sSUFBSSxtQkFBVyxDQUNuQixtQkFBVyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQzlCLDRDQUE0QyxDQUM3QyxDQUFBO0lBQ0gsQ0FBQztJQUNELE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2hFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxVQUFVLEVBQUUsR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFBO0lBRW5ELE1BQU0sRUFDSixJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFDakIsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDcEIsTUFBTSxFQUFFLG1CQUFtQjtRQUMzQixNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDO1FBQzNCLE9BQU8sRUFBRTtZQUNQLGdCQUFnQixFQUFFLEdBQUcsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCO1NBQ3JEO0tBQ0YsQ0FBQyxDQUFBO0lBRUYsTUFBTSxFQUNKLElBQUksRUFBRSxDQUFDLGVBQWUsQ0FBQyxFQUN4QixHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztRQUNwQixNQUFNLEVBQUUsU0FBUztRQUNqQixNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7UUFDZCxPQUFPLEVBQUU7WUFDUCxZQUFZLEVBQUUsUUFBUSxDQUFDLEVBQUU7WUFDekIsSUFBSSxFQUFFLFFBQVE7U0FDZjtLQUNGLENBQUMsQ0FBQTtJQUVGLElBQUksZUFBZSxFQUFFLENBQUM7UUFDcEIsTUFBTSxJQUFJLG1CQUFXLENBQUMsbUJBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLHlCQUF5QixDQUFDLENBQUE7SUFDOUUsQ0FBQztJQUVELE1BQU0sRUFDSixNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFDbEIsR0FBRyxNQUFNLCtDQUFtQyxDQUFDLEdBQUcsQ0FBQztRQUNoRCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUU7Z0JBQ0osTUFBTSxFQUFFLEVBQUUsR0FBRyxVQUFVLEVBQUUsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTtnQkFDbEUsTUFBTTtnQkFDTixnQkFBZ0IsRUFBRSxHQUFHLENBQUMsWUFBWSxFQUFFLGdCQUFnQjtnQkFDcEQsb0JBQW9CLEVBQUUsUUFBUSxDQUFDLFNBQVM7YUFDekM7WUFDRCxJQUFJLEVBQUUsUUFBUTtZQUNkLFlBQVksRUFBRSxRQUFRLENBQUMsRUFBRTtTQUMxQjtRQUNELFNBQVMsRUFBRSxHQUFHLENBQUMsS0FBSztLQUNyQixDQUFDLENBQUE7SUFFRixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUE7QUFDbkMsQ0FBQyxDQUFBO0FBdkRZLFFBQUEsSUFBSSxRQXVEaEIifQ==