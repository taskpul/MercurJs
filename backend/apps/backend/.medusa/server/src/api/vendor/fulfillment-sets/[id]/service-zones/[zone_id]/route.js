"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE = exports.POST = void 0;
const utils_1 = require("@medusajs/framework/utils");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const framework_1 = require("@mercurjs/framework");
const utils_2 = require("../../../../../../shared/infra/http/utils");
const workflows_1 = require("../../../../../../workflows/fulfillment-set/workflows");
/**
 * @oas [post] /vendor/fulfillment-sets/{id}/service-zones/{zone_id}
 * operationId: "VendorUpdateServiceZoneById"
 * summary: "Update a Service Zone"
 * description: "Updates a Service Zone."
 * x-authenticated: true
 * parameters:
 *   - in: path
 *     name: id
 *     required: true
 *     description: The ID of the Fulfillment Set.
 *     schema:
 *       type: string
 *   - in: path
 *     name: zone_id
 *     required: true
 *     description: The ID of the Service Zone.
 *     schema:
 *       type: string
 * requestBody:
 *   content:
 *     application/json:
 *       schema:
 *         $ref: "#/components/schemas/VendorUpdateServiceZone"
 * responses:
 *   "200":
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             fulfillment_set:
 *               $ref: "#/components/schemas/VendorFulfillmentSet"
 * tags:
 *   - Vendor Fulfillment Sets
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 */
const POST = async (req, res) => {
    const query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const eventBus = req.scope.resolve(utils_1.Modules.EVENT_BUS);
    await core_flows_1.updateServiceZonesWorkflow.run({
        container: req.scope,
        input: {
            selector: {
                id: req.params.zone_id
            },
            update: req.validatedBody
        }
    });
    await eventBus.emit({
        name: framework_1.IntermediateEvents.SERVICE_ZONE_CHANGED,
        data: { id: req.params.zone_id }
    });
    const { data: [fulfillmentSet] } = await query.graph({
        entity: 'fulfillment_set',
        fields: req.queryConfig.fields,
        filters: {
            id: req.params.id
        }
    }, { throwIfKeyNotFound: true });
    res.json({ fulfillment_set: fulfillmentSet });
};
exports.POST = POST;
/**
 * @oas [delete] /vendor/fulfillment-sets/{id}/service-zones/{zone_id}
 * operationId: "VendorDeleteServiceZoneById"
 * summary: "Delete a Service Zone"
 * description: "Deletes a Service Zone."
 * x-authenticated: true
 * parameters:
 *   - in: path
 *     name: id
 *     required: true
 *     description: The ID of the Fulfillment Set.
 *     schema:
 *       type: string
 *   - in: path
 *     name: zone_id
 *     required: true
 *     description: The ID of the Service Zone.
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
 *               description: The ID of the deleted Service Zone.
 *             object:
 *               type: string
 *               description: The type of the object that was deleted.
 *               default: service_zone
 *             deleted:
 *               type: boolean
 *               description: Whether or not the items were deleted.
 *               default: true
 * tags:
 *   - Vendor Fulfillment Sets
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 */
const DELETE = async (req, res) => {
    const { zone_id } = req.params;
    const seller = await (0, utils_2.fetchSellerByAuthActorId)(req.auth_context.actor_id, req.scope);
    await workflows_1.deleteVendorServiceZonesWorkflow.run({
        container: req.scope,
        input: {
            ids: [zone_id],
            seller_id: seller.id
        }
    });
    res.json({ id: zone_id, object: 'service_zone', deleted: true });
};
exports.DELETE = DELETE;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3ZlbmRvci9mdWxmaWxsbWVudC1zZXRzL1tpZF0vc2VydmljZS16b25lcy9bem9uZV9pZF0vcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EscURBQThFO0FBQzlFLDREQUF3RTtBQUV4RSxtREFBd0Q7QUFFeEQscUVBQW9GO0FBQ3BGLHFGQUF3RztBQUd4Rzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUNHO0FBQ0ksTUFBTSxJQUFJLEdBQUcsS0FBSyxFQUN2QixHQUE0RCxFQUM1RCxHQUFtQixFQUNuQixFQUFFO0lBQ0YsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDaEUsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBRXJELE1BQU0sdUNBQTBCLENBQUMsR0FBRyxDQUFDO1FBQ25DLFNBQVMsRUFBRSxHQUFHLENBQUMsS0FBSztRQUNwQixLQUFLLEVBQUU7WUFDTCxRQUFRLEVBQUU7Z0JBQ1IsRUFBRSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTzthQUN2QjtZQUNELE1BQU0sRUFBRSxHQUFHLENBQUMsYUFBYTtTQUMxQjtLQUNGLENBQUMsQ0FBQTtJQUVGLE1BQU0sUUFBUSxDQUFDLElBQUksQ0FBQztRQUNsQixJQUFJLEVBQUUsOEJBQWtCLENBQUMsb0JBQW9CO1FBQzdDLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtLQUNqQyxDQUFDLENBQUE7SUFFRixNQUFNLEVBQ0osSUFBSSxFQUFFLENBQUMsY0FBYyxDQUFDLEVBQ3ZCLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUNuQjtRQUNFLE1BQU0sRUFBRSxpQkFBaUI7UUFDekIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsTUFBTTtRQUM5QixPQUFPLEVBQUU7WUFDUCxFQUFFLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1NBQ2xCO0tBQ0YsRUFDRCxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBRSxDQUM3QixDQUFBO0lBRUQsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFBO0FBQy9DLENBQUMsQ0FBQTtBQXBDWSxRQUFBLElBQUksUUFvQ2hCO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQ0c7QUFDSSxNQUFNLE1BQU0sR0FBRyxLQUFLLEVBQ3pCLEdBQStCLEVBQy9CLEdBQW1CLEVBQ25CLEVBQUU7SUFDRixNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQTtJQUU5QixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUEsZ0NBQXdCLEVBQzNDLEdBQUcsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUN6QixHQUFHLENBQUMsS0FBSyxDQUNWLENBQUE7SUFDRCxNQUFNLDRDQUFnQyxDQUFDLEdBQUcsQ0FBQztRQUN6QyxTQUFTLEVBQUUsR0FBRyxDQUFDLEtBQUs7UUFDcEIsS0FBSyxFQUFFO1lBQ0wsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO1lBQ2QsU0FBUyxFQUFFLE1BQU0sQ0FBQyxFQUFFO1NBQ3JCO0tBQ0YsQ0FBQyxDQUFBO0lBRUYsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtBQUNsRSxDQUFDLENBQUE7QUFuQlksUUFBQSxNQUFNLFVBbUJsQiJ9