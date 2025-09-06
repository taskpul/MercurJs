"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE = exports.GET = exports.POST = void 0;
const utils_1 = require("@medusajs/framework/utils");
const workflows_1 = require("../../../../workflows/member/workflows");
const delete_member_1 = require("../../../../workflows/member/workflows/delete-member");
/**
 * @oas [post] /vendor/members/{id}
 * operationId: "VendorUpdateMemberById"
 * summary: "Update a Member"
 * description: "Updates a member by id for the authenticated vendor."
 * x-authenticated: true
 * parameters:
 *   - in: path
 *     name: id
 *     required: true
 *     description: The ID of the Member.
 *     schema:
 *       type: string
 * requestBody:
 *   content:
 *     application/json:
 *       schema:
 *         $ref: "#/components/schemas/VendorUpdateMember"
 * responses:
 *   "200":
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             member:
 *               $ref: "#/components/schemas/VendorMember"
 * tags:
 *   - Vendor Members
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 */
const POST = async (req, res) => {
    const query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { id } = req.params;
    await (0, workflows_1.updateMemberWorkflow)(req.scope).run({
        input: {
            id,
            ...req.validatedBody
        }
    });
    const { data: [member] } = await query.graph({
        entity: 'member',
        fields: req.queryConfig.fields,
        filters: { id: id }
    }, { throwIfKeyNotFound: true });
    res.json({ member });
};
exports.POST = POST;
/**
 * @oas [get] /vendor/members/{id}
 * operationId: "VendorGetMemberById"
 * summary: "Get a Member"
 * description: "Retrieves a member by id."
 * x-authenticated: true
 * parameters:
 *   - in: path
 *     name: id
 *     required: true
 *     description: The ID of the Member.
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
 *             member:
 *               $ref: "#/components/schemas/VendorMember"
 * tags:
 *   - Vendor Members
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 */
const GET = async (req, res) => {
    const query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { id } = req.params;
    const { data: [member] } = await query.graph({
        entity: 'member',
        fields: req.queryConfig.fields,
        filters: { id: id }
    }, { throwIfKeyNotFound: true });
    res.json({ member });
};
exports.GET = GET;
/**
 * @oas [delete] /vendor/members/{id}
 * operationId: "VendorDeleteMemberById"
 * summary: "Delete a Member"
 * description: "Deletes a member by id."
 * x-authenticated: true
 * parameters:
 *   - in: path
 *     name: id
 *     required: true
 *     description: The ID of the Member.
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
 *             id:
 *               type: string
 *               description: The ID of the deleted Member
 *             object:
 *               type: string
 *               description: The type of the object that was deleted
 *             deleted:
 *               type: boolean
 *               description: Whether or not the items were deleted
 * tags:
 *   - Vendor Members
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 */
const DELETE = async (req, res) => {
    const { id } = req.params;
    await (0, delete_member_1.deleteMemberWorkflow)(req.scope).run({
        input: id
    });
    res.json({
        id,
        object: 'member',
        deleted: true
    });
};
exports.DELETE = DELETE;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3ZlbmRvci9tZW1iZXJzL1tpZF0vcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EscURBQXFFO0FBRXJFLHNFQUE2RTtBQUM3RSx3RkFBMkY7QUFHM0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlDRztBQUNJLE1BQU0sSUFBSSxHQUFHLEtBQUssRUFDdkIsR0FBdUQsRUFDdkQsR0FBbUIsRUFDbkIsRUFBRTtJQUNGLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2hFLE1BQU0sRUFBRSxFQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFBO0lBRXpCLE1BQU0sSUFBQSxnQ0FBb0IsRUFBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hDLEtBQUssRUFBRTtZQUNMLEVBQUU7WUFDRixHQUFHLEdBQUcsQ0FBQyxhQUFhO1NBQ3JCO0tBQ0YsQ0FBQyxDQUFBO0lBRUYsTUFBTSxFQUNKLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUNmLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUNuQjtRQUNFLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLE1BQU0sRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLE1BQU07UUFDOUIsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtLQUNwQixFQUNELEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLENBQzdCLENBQUE7SUFFRCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQTtBQUN0QixDQUFDLENBQUE7QUExQlksUUFBQSxJQUFJLFFBMEJoQjtBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBQ0ksTUFBTSxHQUFHLEdBQUcsS0FBSyxFQUN0QixHQUErQixFQUMvQixHQUFtQixFQUNuQixFQUFFO0lBQ0YsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFaEUsTUFBTSxFQUFFLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUE7SUFDekIsTUFBTSxFQUNKLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUNmLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUNuQjtRQUNFLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLE1BQU0sRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLE1BQU07UUFDOUIsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtLQUNwQixFQUNELEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLENBQzdCLENBQUE7SUFFRCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQTtBQUN0QixDQUFDLENBQUE7QUFuQlksUUFBQSxHQUFHLE9BbUJmO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUNHO0FBQ0ksTUFBTSxNQUFNLEdBQUcsS0FBSyxFQUN6QixHQUErQixFQUMvQixHQUFtQixFQUNuQixFQUFFO0lBQ0YsTUFBTSxFQUFFLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUE7SUFFekIsTUFBTSxJQUFBLG9DQUFvQixFQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDeEMsS0FBSyxFQUFFLEVBQUU7S0FDVixDQUFDLENBQUE7SUFFRixHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ1AsRUFBRTtRQUNGLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLE9BQU8sRUFBRSxJQUFJO0tBQ2QsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBZlksUUFBQSxNQUFNLFVBZWxCIn0=