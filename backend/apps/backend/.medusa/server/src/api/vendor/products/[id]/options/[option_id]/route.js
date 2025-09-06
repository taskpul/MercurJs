"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = exports.DELETE = void 0;
const utils_1 = require("@medusajs/framework/utils");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const utils_2 = require("../../../../../../shared/infra/http/utils");
const products_1 = require("../../../../../../shared/infra/http/utils/products");
const create_product_update_request_1 = require("../../../../../../workflows/requests/workflows/create-product-update-request");
/**
 * @oas [delete] /vendor/products/{id}/options/{option_id}
 * operationId: "VendorDeleteProductOptionById"
 * summary: "Delete a Product option"
 * description: "Deletes a product option by id for the authenticated vendor."
 * x-authenticated: true
 * parameters:
 *   - in: path
 *     name: id
 *     required: true
 *     description: The ID of the Product.
 *     schema:
 *       type: string
 *   - in: path
 *     name: option_id
 *     required: true
 *     description: The ID of the Option.
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
 *               description: The ID of the deleted Product option
 *             object:
 *               type: string
 *               description: The type of the object that was deleted
 *             deleted:
 *               type: boolean
 *               description: Whether or not the items were deleted
 * tags:
 *   - Vendor Products
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 */
const DELETE = async (req, res) => {
    const productId = req.params.id;
    const optionId = req.params.option_id;
    const query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: [option] } = await query.graph({
        entity: 'product_option',
        fields: ['product_id'],
        filters: {
            id: optionId
        }
    });
    if (productId !== option.product_id) {
        throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, 'Invalid product option id!');
    }
    await core_flows_1.deleteProductOptionsWorkflow.run({
        container: req.scope,
        input: { ids: [optionId] }
    });
    res.json({
        id: optionId,
        object: 'option',
        deleted: true
    });
};
exports.DELETE = DELETE;
/**
 * @oas [post] /vendor/products/{id}/options/{option_id}
 * operationId: "VendorUpdateProductOptionById"
 * summary: "Update a Product option"
 * description: "Updates an existing product option for the authenticated vendor."
 * x-authenticated: true
 * parameters:
 *   - in: path
 *     name: id
 *     required: true
 *     description: The ID of the Product.
 *     schema:
 *       type: string
 *   - in: path
 *     name: option_id
 *     required: true
 *     description: The ID of the Option.
 *     schema:
 *       type: string
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
 *         $ref: "#/components/schemas/UpdateProductOption"
 * responses:
 *   "200":
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             product:
 *               $ref: "#/components/schemas/VendorProduct"
 * tags:
 *   - Vendor Products
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 */
const POST = async (req, res) => {
    const query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const productId = req.params.id;
    const optionId = req.params.option_id;
    await core_flows_1.updateProductOptionsWorkflow.run({
        container: req.scope,
        input: {
            selector: { id: optionId, product_id: productId },
            update: req.validatedBody
        }
    });
    const productDetails = await (0, products_1.fetchProductDetails)(req.params.id, req.scope);
    if (!['draft', 'proposed'].includes(productDetails.status)) {
        const seller = await (0, utils_2.fetchSellerByAuthActorId)(req.auth_context.actor_id, req.scope);
        await create_product_update_request_1.createProductUpdateRequestWorkflow.run({
            container: req.scope,
            input: {
                data: {
                    data: { product_id: req.params.id, title: productDetails.title },
                    submitter_id: req.auth_context.actor_id,
                    type: 'product_update'
                },
                seller_id: seller.id
            }
        });
    }
    const { data: [product] } = await query.graph({
        entity: 'product',
        fields: req.queryConfig.fields,
        filters: { id: productId }
    }, { throwIfKeyNotFound: true });
    res.json({ product });
};
exports.POST = POST;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3ZlbmRvci9wcm9kdWN0cy9baWRdL29wdGlvbnMvW29wdGlvbl9pZF0vcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EscURBR2tDO0FBQ2xDLDREQUdvQztBQUVwQyxxRUFBb0Y7QUFDcEYsaUZBQXdGO0FBQ3hGLGdJQUFpSTtBQUdqSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Q0c7QUFDSSxNQUFNLE1BQU0sR0FBRyxLQUFLLEVBQ3pCLEdBQStCLEVBQy9CLEdBQW1CLEVBQ25CLEVBQUU7SUFDRixNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQTtJQUMvQixNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQTtJQUVyQyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxpQ0FBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUVoRSxNQUFNLEVBQ0osSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQ2YsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDcEIsTUFBTSxFQUFFLGdCQUFnQjtRQUN4QixNQUFNLEVBQUUsQ0FBQyxZQUFZLENBQUM7UUFDdEIsT0FBTyxFQUFFO1lBQ1AsRUFBRSxFQUFFLFFBQVE7U0FDYjtLQUNGLENBQUMsQ0FBQTtJQUVGLElBQUksU0FBUyxLQUFLLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNwQyxNQUFNLElBQUksbUJBQVcsQ0FDbkIsbUJBQVcsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUM5Qiw0QkFBNEIsQ0FDN0IsQ0FBQTtJQUNILENBQUM7SUFFRCxNQUFNLHlDQUE0QixDQUFDLEdBQUcsQ0FBQztRQUNyQyxTQUFTLEVBQUUsR0FBRyxD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