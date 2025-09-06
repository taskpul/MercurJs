"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = exports.POST = void 0;
const utils_1 = require("@medusajs/framework/utils");
const customer_review_1 = __importDefault(require("../../../links/customer-review"));
const workflows_1 = require("../../../workflows/review/workflows");
/**
 * @oas [post] /store/reviews
 * operationId: "StoreCreateNewReview"
 * summary: "Create new review"
 * description: "Creates new review with rating and comment"
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
 *         $ref: "#/components/schemas/StoreCreateReview"
 * responses:
 *   "201":
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             product:
 *               $ref: "#/components/schemas/Review"
 * tags:
 *   - Store Reviews
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 */
const POST = async (req, res) => {
    const { result } = await workflows_1.createReviewWorkflow.run({
        container: req.scope,
        input: {
            ...req.validatedBody,
            customer_id: req.auth_context.actor_id
        }
    });
    const query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: [review] } = await query.graph({
        entity: 'review',
        fields: req.queryConfig.fields,
        filters: {
            id: result.id
        }
    });
    res.status(201).json({ review });
};
exports.POST = POST;
/**
 * @oas [get] /store/reviews
 * operationId: "StoreGetMyReviews"
 * summary: "Get reviews of the current user"
 * description: "Retrieves the reviews created by the authenticated user."
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
 *             products:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Review"
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
 *   - Store Reviews
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 */
const GET = async (req, res) => {
    const query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: reviews, metadata } = await query.graph({
        entity: customer_review_1.default.entryPoint,
        fields: req.queryConfig.fields.map((field) => `review.${field}`),
        filters: {
            customer_id: req.auth_context.actor_id
        },
        pagination: req.queryConfig.pagination
    });
    res.json({
        reviews: reviews.map((relation) => relation.review),
        count: metadata?.count,
        offset: metadata?.skip,
        limit: metadata?.take
    });
};
exports.GET = GET;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL3Jldmlld3Mvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EscURBQXFFO0FBRXJFLHFGQUEyRDtBQUMzRCxtRUFBMEU7QUFHMUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlDRztBQUNJLE1BQU0sSUFBSSxHQUFHLEtBQUssRUFDdkIsR0FBc0QsRUFDdEQsR0FBbUIsRUFDbkIsRUFBRTtJQUNGLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxNQUFNLGdDQUFvQixDQUFDLEdBQUcsQ0FBQztRQUNoRCxTQUFTLEVBQUUsR0FBRyxDQUFDLEtBQUs7UUFDcEIsS0FBSyxFQUFFO1lBQ0wsR0FBRyxHQUFHLENBQUMsYUFBYTtZQUNwQixXQUFXLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxRQUFRO1NBQ3ZDO0tBQ0YsQ0FBQyxDQUFBO0lBRUYsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFaEUsTUFBTSxFQUNKLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUNmLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ3BCLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLE1BQU0sRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLE1BQU07UUFDOUIsT0FBTyxFQUFFO1lBQ1AsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1NBQ2Q7S0FDRixDQUFDLENBQUE7SUFFRixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7QUFDbEMsQ0FBQyxDQUFBO0FBekJZLFFBQUEsSUFBSSxRQXlCaEI7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbURHO0FBQ0ksTUFBTSxHQUFHLEdBQUcsS0FBSyxFQUN0QixHQUEwRCxFQUMxRCxHQUFtQixFQUNuQixFQUFFO0lBQ0YsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFaEUsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ3BELE1BQU0sRUFBRSx5QkFBYyxDQUFDLFVBQVU7UUFDakMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsVUFBVSxLQUFLLEVBQUUsQ0FBQztRQUNoRSxPQUFPLEVBQUU7WUFDUCxXQUFXLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxRQUFRO1NBQ3ZDO1FBQ0QsVUFBVSxFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsVUFBVTtLQUN2QyxDQUFDLENBQUE7SUFFRixHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ1AsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFDbkQsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLO1FBQ3RCLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSTtRQUN0QixLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUk7S0FDdEIsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBckJZLFFBQUEsR0FBRyxPQXFCZiJ9