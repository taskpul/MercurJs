"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = exports.POST = void 0;
const algolia_1 = require("@mercurjs/algolia");
const framework_1 = require("@mercurjs/framework");
const workflows_1 = require("../../../workflows/algolia/workflows");
/**
 * @oas [post] /admin/algolia
 * operationId: "AdminSyncAlgolia"
 * summary: "Sync Algolia"
 * description: "Initiates a synchronization process for Algolia indices."
 * x-authenticated: true
 * responses:
 *   "200":
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Confirmation message that sync is in progress
 *               example: "Sync in progress"
 * tags:
 *   - Admin Algolia
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 */
const POST = async (req, res) => {
    await workflows_1.syncAlgoliaWorkflow.run({
        container: req.scope
    });
    res.status(200).json({ message: 'Sync in progress' });
};
exports.POST = POST;
/**
 * @oas [get] /admin/algolia
 * operationId: "AdminGetAlgoliaStatus"
 * summary: "Get Algolia Status"
 * description: "Retrieves the current status of Algolia configuration and product index."
 * x-authenticated: true
 * responses:
 *   "200":
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             appId:
 *               type: string
 *               description: The Algolia application ID
 *               example: "YOUR_ALGOLIA_APP_ID"
 *             productIndex:
 *               type: object
 *               description: The status of the product index
 *               properties:
 *                 exists:
 *                   type: boolean
 *                   description: Whether the product index exists
 *                 name:
 *                   type: string
 *                   description: The name of the product index
 * tags:
 *   - Admin Algolia
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 */
const GET = async (req, res) => {
    const algoliaService = req.scope.resolve(algolia_1.ALGOLIA_MODULE);
    const appId = algoliaService.getAppId();
    const productIndex = await algoliaService.checkIndex(framework_1.IndexType.PRODUCT);
    res.status(200).json({ appId, productIndex });
};
exports.GET = GET;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL2FsZ29saWEvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsK0NBQXdFO0FBQ3hFLG1EQUErQztBQUUvQyxvRUFBMEU7QUFFMUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0ksTUFBTSxJQUFJLEdBQUcsS0FBSyxFQUFFLEdBQWtCLEVBQUUsR0FBbUIsRUFBRSxFQUFFO0lBQ3BFLE1BQU0sK0JBQW1CLENBQUMsR0FBRyxDQUFDO1FBQzVCLFNBQVMsRUFBRSxHQUFHLENBQUMsS0FBSztLQUNyQixDQUFDLENBQUE7SUFFRixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxDQUFDLENBQUE7QUFDdkQsQ0FBQyxDQUFBO0FBTlksUUFBQSxJQUFJLFFBTWhCO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlDRztBQUNJLE1BQU0sR0FBRyxHQUFHLEtBQUssRUFBRSxHQUFrQixFQUFFLEdBQW1CLEVBQUUsRUFBRTtJQUNuRSxNQUFNLGNBQWMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBdUIsd0JBQWMsQ0FBQyxDQUFBO0lBRTlFLE1BQU0sS0FBSyxHQUFHLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUN2QyxNQUFNLFlBQVksR0FBRyxNQUFNLGNBQWMsQ0FBQyxVQUFVLENBQUMscUJBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUN2RSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFBO0FBQy9DLENBQUMsQ0FBQTtBQU5ZLFFBQUEsR0FBRyxPQU1mIn0=