"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
const utils_1 = require("@medusajs/framework/utils");
const category_attribute_1 = __importDefault(require("../../../../../links/category-attribute"));
/**
 * @oas [get] /admin/products/{id}/applicable-attributes
 * operationId: "AdminGetProductApplicableAttributes"
 * summary: "Get Product Applicable Attributes"
 * description: "Retrieves all attributes that can be applied to a specific product, including global attributes and category-specific attributes."
 * x-authenticated: true
 * parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     schema:
 *       type: string
 *     description: The ID of the product to get applicable attributes for.
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
 *             attributes:
 *               type: array
 *               description: Array of attributes that can be applied to the product, including global attributes and category-specific attributes.
 *               items:
 *                 $ref: "#/components/schemas/Attribute"
 *   "404":
 *     description: Not Found
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Product not found"
 * tags:
 *   - Admin Products
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 */
const GET = async (req, res) => {
    const query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: [product] } = await query.graph({
        entity: 'product',
        fields: ['categories.id'],
        filters: {
            id: req.params.id
        }
    });
    const categoryIds = product.categories.map((category) => category.id);
    const { data: attributes } = await query.graph({
        entity: category_attribute_1.default.entryPoint,
        fields: ['attribute_id']
    });
    const attributeIds = attributes.map((attribute) => attribute.attribute_id);
    const { data: globalAttributes } = await query.graph({
        entity: 'attribute',
        fields: req.queryConfig.fields,
        filters: {
            id: {
                $nin: attributeIds
            }
        }
    });
    const { data: categoryAttributes } = await query.graph({
        entity: category_attribute_1.default.entryPoint,
        fields: req.queryConfig.fields.map((field) => `attribute.${field}`),
        filters: {
            product_category_id: categoryIds
        }
    });
    res.json({
        attributes: [
            ...globalAttributes,
            ...categoryAttributes.map((rel) => rel.attribute)
        ]
    });
};
exports.GET = GET;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3Byb2R1Y3RzL1tpZF0vYXBwbGljYWJsZS1hdHRyaWJ1dGVzL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLHFEQUFxRTtBQUVyRSxpR0FBdUU7QUFFdkU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0NHO0FBQ0ksTUFBTSxHQUFHLEdBQUcsS0FBSyxFQUN0QixHQUErQixFQUMvQixHQUFtQixFQUNuQixFQUFFO0lBQ0YsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFaEUsTUFBTSxFQUNKLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUNoQixHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztRQUNwQixNQUFNLEVBQUUsU0FBUztRQUNqQixNQUFNLEVBQUUsQ0FBQyxlQUFlLENBQUM7UUFDekIsT0FBTyxFQUFFO1lBQ1AsRUFBRSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtTQUNsQjtLQUNGLENBQUMsQ0FBQTtJQUNGLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUE7SUFFckUsTUFBTSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDN0MsTUFBTSxFQUFFLDRCQUFpQixDQUFDLFVBQVU7UUFDcEMsTUFBTSxFQUFFLENBQUMsY0FBYyxDQUFDO0tBQ3pCLENBQUMsQ0FBQTtJQUNGLE1BQU0sWUFBWSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUUxRSxNQUFNLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ25ELE1BQU0sRUFBRSxXQUFXO1FBQ25CLE1BQU0sRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLE1BQU07UUFDOUIsT0FBTyxFQUFFO1lBQ1AsRUFBRSxFQUFFO2dCQUNGLElBQUksRUFBRSxZQUFZO2FBQ25CO1NBQ0Y7S0FDRixDQUFDLENBQUE7SUFFRixNQUFNLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ3JELE1BQU0sRUFBRSw0QkFBaUIsQ0FBQyxVQUFVO1FBQ3BDLE1BQU0sRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLGFBQWEsS0FBSyxFQUFFLENBQUM7UUFDbkUsT0FBTyxFQUFFO1lBQ1AsbUJBQW1CLEVBQUUsV0FBVztTQUNqQztLQUNGLENBQUMsQ0FBQTtJQUVGLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDUCxVQUFVLEVBQUU7WUFDVixHQUFHLGdCQUFnQjtZQUNuQixHQUFHLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztTQUNsRDtLQUNGLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQS9DWSxRQUFBLEdBQUcsT0ErQ2YifQ==