"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = exports.POST = void 0;
const framework_1 = require("@medusajs/framework");
const utils_1 = require("@medusajs/framework/utils");
const wishlist_1 = require("@mercurjs/wishlist");
const customer_wishlist_1 = __importDefault(require("../../../links/customer-wishlist"));
const workflows_1 = require("../../../workflows/wishlist/workflows");
/**
 * @oas [post] /store/wishlist
 * operationId: "StoreCreateNewWishlist"
 * summary: "Create new wishlist entry"
 * description: "Creates a new wishlist entry by specifying a reference type and reference ID."
 * x-authenticated: true
 * parameters:
 *   - name: fields
 *     in: query
 *     schema:
 *       type: string
 *     required: false
 *     description: Comma-separated fields to include in the response.
 * requestBody:
 *   content:
 *     application/json:
 *       schema:
 *         $ref: "#/components/schemas/StoreCreateWishlist"
 * responses:
 *   "201":
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: Id of the wishlsit nad reference id.
 *             created_at:
 *               type: string
 *               format: date-time
 *               description: The date with timezone at which the resource was created.
 *             updated_at:
 *               type: string
 *               format: date-time
 *               description: The date with timezone at which the resource was last updated.
 *             deleted_at:
 *               type: string
 *               format: date-time
 *               description: The date with timezone at which the resource was deleted.
 * tags:
 *   - Store Wishlist
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 */
const POST = async (req, res) => {
    const { result } = await workflows_1.createWishlistEntryWorkflow.run({
        container: req.scope,
        input: {
            ...req.validatedBody,
            customer_id: req.auth_context.actor_id
        }
    });
    const query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: [wishlist] } = await query.graph({
        entity: 'wishlist',
        fields: req.queryConfig.fields,
        filters: {
            id: result.id
        }
    });
    res.status(201).json({ wishlist });
};
exports.POST = POST;
/**
 * @oas [get] /store/wishlist
 * operationId: "StoreGetMyWishlist"
 * summary: "Get wishlist of the current user"
 * description: "Retrieves the wishlist created by the authenticated user."
 * x-authenticated: true
 * parameters:
 *   - name: offset
 *     in: query
 *     schema:
 *       type: number
 *     required: false
 *     description: The number of items to skip before starting to collect the result set.
 *   - name: limit
 *     in: query
 *     schema:
 *       type: number
 *     required: false
 *     description: The number of items to return.
 *   - name: fields
 *     in: query
 *     schema:
 *       type: string
 *     required: false
 *     description: Comma-separated fields to include in the response.
 * responses:
 *   "200":
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             wishlists:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Wishlist"
 *             count:
 *               type: integer
 *               description: The total number of items available
 *             offset:
 *               type: integer
 *               description: The number of items skipped before these items
 *             limit:
 *               type: integer
 *               description: The number of items per page
 * tags:
 *   - Store Wishlist
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 */
const GET = async (req, res) => {
    const query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: wishlists, metadata } = await query.graph({
        entity: customer_wishlist_1.default.entryPoint,
        fields: [
            ...req.queryConfig.fields.map((field) => `wishlist.products.${field}`),
            'wishlist.products.variants.prices.*'
        ],
        filters: {
            customer_id: req.auth_context.actor_id
        },
        pagination: req.queryConfig.pagination
    });
    const formattedWithPrices = await (0, wishlist_1.calculateWishlistProductsPrice)(framework_1.container, wishlists);
    res.json({
        wishlists: formattedWithPrices,
        count: metadata?.count,
        offset: metadata?.skip,
        limit: metadata?.take
    });
};
exports.GET = GET;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL3dpc2hsaXN0L3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG1EQUk0QjtBQUM1QixxREFBcUU7QUFFckUsaURBQW1FO0FBRW5FLHlGQUErRDtBQUMvRCxxRUFBbUY7QUFHbkY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4Q0c7QUFFSSxNQUFNLElBQUksR0FBRyxLQUFLLEVBQ3ZCLEdBQXdELEVBQ3hELEdBQW1CLEVBQ25CLEVBQUU7SUFDRixNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsTUFBTSx1Q0FBMkIsQ0FBQyxHQUFHLENBQUM7UUFDdkQsU0FBUyxFQUFFLEdBQUcsQ0FBQyxLQUFLO1FBQ3BCLEtBQUssRUFBRTtZQUNMLEdBQUcsR0FBRyxDQUFDLGFBQWE7WUFDcEIsV0FBVyxFQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsUUFBUTtTQUN2QztLQUNGLENBQUMsQ0FBQTtJQUVGLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRWhFLE1BQU0sRUFDSixJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFDakIsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDcEIsTUFBTSxFQUFFLFVBQVU7UUFDbEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsTUFBTTtRQUM5QixPQUFPLEVBQUU7WUFDUCxFQUFFLEVBQUUsTUFBTSxDQUFDLEVBQUU7U0FDZDtLQUNGLENBQUMsQ0FBQTtJQUVGLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtBQUNwQyxDQUFDLENBQUE7QUF6QlksUUFBQSxJQUFJLFFBeUJoQjtBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtREc7QUFFSSxNQUFNLEdBQUcsR0FBRyxLQUFLLEVBQ3RCLEdBQStCLEVBQy9CLEdBQW1CLEVBQ25CLEVBQUU7SUFDRixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxpQ0FBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUVoRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDdEQsTUFBTSxFQUFFLDJCQUFnQixDQUFDLFVBQVU7UUFDbkMsTUFBTSxFQUFFO1lBQ04sR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLHFCQUFxQixLQUFLLEVBQUUsQ0FBQztZQUN0RSxxQ0FBcUM7U0FDdEM7UUFDRCxPQUFPLEVBQUU7WUFDUCxXQUFXLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxRQUFRO1NBQ3ZDO1FBQ0QsVUFBVSxFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsVUFBVTtLQUN2QyxDQUFDLENBQUE7SUFFRixNQUFNLG1CQUFtQixHQUFHLE1BQU0sSUFBQSx5Q0FBOEIsRUFDOUQscUJBQVMsRUFDVCxTQUFTLENBQ1YsQ0FBQTtJQUVELEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDUCxTQUFTLEVBQUUsbUJBQW1CO1FBQzlCLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSztRQUN0QixNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUk7UUFDdEIsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJO0tBQ3RCLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQTdCWSxRQUFBLEdBQUcsT0E2QmYifQ==