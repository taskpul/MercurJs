"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = exports.POST = void 0;
const utils_1 = require("@medusajs/framework/utils");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const seller_1 = require("@mercurjs/seller");
const seller_shipping_profile_1 = __importDefault(require("../../../links/seller-shipping-profile"));
const utils_2 = require("../../../shared/infra/http/utils");
/**
 * @oas [post] /vendor/shipping-profiles
 * operationId: "VendorCreateShippingProfile"
 * summary: "Create a Shipping profile"
 * description: "Creates a Shipping profile."
 * x-authenticated: true
 * parameters:
 *   - in: query
 *     name: fields
 *     description: The comma-separated fields to include in the response
 *     schema:
 *       type: string
 * requestBody:
 *   content:
 *     application/json:
 *       schema:
 *         $ref: "#/components/schemas/VendorCreateShippingProfile"
 * responses:
 *   "201":
 *     description: Created
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             shipping_profile:
 *               $ref: "#/components/schemas/VendorShippingProfile"
 * tags:
 *   - Vendor Shipping Profiles
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 */
const POST = async (req, res) => {
    const query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const link = req.scope.resolve(utils_1.ContainerRegistrationKeys.LINK);
    const seller = await (0, utils_2.fetchSellerByAuthActorId)(req.auth_context.actor_id, req.scope);
    const { result } = await core_flows_1.createShippingProfilesWorkflow.run({
        container: req.scope,
        input: {
            data: [
                {
                    type: req.validatedBody.type,
                    name: `${seller.id}:${req.validatedBody.name}`
                }
            ]
        }
    });
    const { data: [shipping_profile] } = await query.graph({
        entity: 'shipping_profile',
        fields: req.queryConfig.fields,
        filters: {
            id: result[0].id
        }
    });
    await link.create({
        [seller_1.SELLER_MODULE]: {
            seller_id: seller.id
        },
        [utils_1.Modules.FULFILLMENT]: {
            shipping_profile_id: shipping_profile.id
        }
    });
    res.status(201).json({ shipping_profile });
};
exports.POST = POST;
/**
 * @oas [get] /vendor/shipping-profiles
 * operationId: "VendorListShippingProfiles"
 * summary: "List shipping profiles"
 * description: "Retrieves a list of shipping profiles."
 * x-authenticated: true
 * parameters:
 *   - in: query
 *     name: fields
 *     description: The comma-separated fields to include in the response
 *     schema:
 *       type: string
 * responses:
 *   "200":
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             shipping_profiles:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/VendorShippingProfile"
 * tags:
 *   - Vendor Shipping Profiles
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 */
const GET = async (req, res) => {
    const query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: shipping_profiles, metadata } = await query.graph({
        entity: seller_shipping_profile_1.default.entryPoint,
        fields: req.queryConfig.fields.map((field) => `shipping_profile.${field}`),
        filters: {
            ...req.filterableFields,
            deleted_at: {
                $eq: null
            }
        },
        pagination: req.queryConfig.pagination
    });
    res.json({
        shipping_profiles,
        count: metadata?.count,
        offset: metadata?.skip,
        limit: metadata?.take
    });
};
exports.GET = GET;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3ZlbmRvci9zaGlwcGluZy1wcm9maWxlcy9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxxREFBOEU7QUFDOUUsNERBQTRFO0FBRTVFLDZDQUFnRDtBQUVoRCxxR0FBMEU7QUFDMUUsNERBQTJFO0FBRzNFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdDRztBQUNJLE1BQU0sSUFBSSxHQUFHLEtBQUssRUFDdkIsR0FBZ0UsRUFDaEUsR0FBbUIsRUFDbkIsRUFBRTtJQUNGLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2hFLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLElBQUksQ0FBQyxDQUFBO0lBRTlELE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBQSxnQ0FBd0IsRUFDM0MsR0FBRyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQ3pCLEdBQUcsQ0FBQyxLQUFLLENBQ1YsQ0FBQTtJQUVELE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxNQUFNLDJDQUE4QixDQUFDLEdBQUcsQ0FBQztRQUMxRCxTQUFTLEVBQUUsR0FBRyxDQUFDLEtBQUs7UUFDcEIsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFO2dCQUNKO29CQUNFLElBQUksRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUk7b0JBQzVCLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUU7aUJBQy9DO2FBQ0Y7U0FDRjtLQUNGLENBQUMsQ0FBQTtJQUVGLE1BQU0sRUFDSixJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUN6QixHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztRQUNwQixNQUFNLEVBQUUsa0JBQWtCO1FBQzFCLE1BQU0sRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLE1BQU07UUFDOUIsT0FBTyxFQUFFO1lBQ1AsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1NBQ2pCO0tBQ0YsQ0FBQyxDQUFBO0lBRUYsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ2hCLENBQUMsc0JBQWEsQ0FBQyxFQUFFO1lBQ2YsU0FBUyxFQUFFLE1BQU0sQ0FBQyxFQUFFO1NBQ3JCO1FBQ0QsQ0FBQyxlQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDckIsbUJBQW1CLEVBQUUsZ0JBQWdCLENBQUMsRUFBRTtTQUN6QztLQUNGLENBQUMsQ0FBQTtJQUVGLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFBO0FBQzVDLENBQUMsQ0FBQTtBQTVDWSxRQUFBLElBQUksUUE0Q2hCO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJHO0FBQ0ksTUFBTSxHQUFHLEdBQUcsS0FBSyxFQUN0QixHQUErQixFQUMvQixHQUFtQixFQUNuQixFQUFFO0lBQ0YsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFaEUsTUFBTSxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDOUQsTUFBTSxFQUFFLGlDQUFxQixDQUFDLFVBQVU7UUFDeEMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsb0JBQW9CLEtBQUssRUFBRSxDQUFDO1FBQzFFLE9BQU8sRUFBRTtZQUNQLEdBQUcsR0FBRyxDQUFDLGdCQUFnQjtZQUN2QixVQUFVLEVBQUU7Z0JBQ1YsR0FBRyxFQUFFLElBQUk7YUFDVjtTQUNGO1FBQ0QsVUFBVSxFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsVUFBVTtLQUN2QyxDQUFDLENBQUE7SUFFRixHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ1AsaUJBQWlCO1FBQ2pCLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSztRQUN0QixNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUk7UUFDdEIsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJO0tBQ3RCLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQXhCWSxRQUFBLEdBQUcsT0F3QmYifQ==