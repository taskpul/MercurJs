"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAttributeValueStep = exports.validateAttributeValueStepId = void 0;
const utils_1 = require("@medusajs/framework/utils");
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const product_attribute_value_1 = __importDefault(require("../../../links/product-attribute-value"));
exports.validateAttributeValueStepId = 'validate-attribute-value';
exports.validateAttributeValueStep = (0, workflows_sdk_1.createStep)(exports.validateAttributeValueStepId, async (input, { container }) => {
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: [attribute] } = await query.graph({
        entity: 'attribute',
        fields: ['product_categories.id', 'possible_values.value'],
        filters: {
            id: input.attribute_id
        }
    });
    const allowedValues = attribute.possible_values?.map((posVal) => posVal.value);
    if (allowedValues?.length && !allowedValues.includes(input.value)) {
        throw new utils_1.MedusaError(utils_1.MedusaErrorTypes.INVALID_DATA, `Attribute ${input.attribute_id} doesn't define ${input.value} as a possible_value`);
    }
    const attributeCategoryIds = attribute.product_categories.map((cat) => cat.id);
    // If all attributes are global, we don't enforce for product.categories to include the attribute.product_categories, since there are none
    if (attributeCategoryIds.length) {
        const { data: [product] } = await query.graph({
            entity: 'product',
            fields: ['categories.id'],
            filters: {
                id: input.product_id
            }
        });
        const productCategoryIds = product.categories?.map((cat) => cat.id);
        if (!productCategoryIds?.some((prodCatId) => attributeCategoryIds.includes(prodCatId))) {
            throw new utils_1.MedusaError(utils_1.MedusaErrorTypes.INVALID_DATA, `Product ${input.product_id} isn't linked to any category from the requested attributes.`);
        }
    }
    const { data: attributeValuesProduct } = await query.graph({
        entity: product_attribute_value_1.default.entryPoint,
        fields: ['attribute_value.value', 'attribute_value.attribute_id'],
        filters: {
            product_id: input.product_id
        }
    });
    const attributeValues = attributeValuesProduct.map((element) => element.attribute_value);
    if (attributeValues.some((value) => value.attribute_id === input.attribute_id &&
        value.value === input.value)) {
        throw new utils_1.MedusaError(utils_1.MedusaErrorTypes.DUPLICATE_ERROR, `Attribute value ${input.value} for attribute ${input.attribute_id} already exists for product ${input.product_id}`);
    }
    return new workflows_sdk_1.StepResponse();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUtYXR0cmlidXRlLXZhbHVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9hdHRyaWJ1dGUvc3RlcHMvdmFsaWRhdGUtYXR0cmlidXRlLXZhbHVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHFEQUlrQztBQUNsQyxxRUFBNEU7QUFJNUUscUdBQTBFO0FBRTdELFFBQUEsNEJBQTRCLEdBQUcsMEJBQTBCLENBQUE7QUFFekQsUUFBQSwwQkFBMEIsR0FBRyxJQUFBLDBCQUFVLEVBQ2xELG9DQUE0QixFQUM1QixLQUFLLEVBQUUsS0FBcUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDN0QsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxpQ0FBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUVoRSxNQUFNLEVBQ0osSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQ2xCLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ3BCLE1BQU0sRUFBRSxXQUFXO1FBQ25CLE1BQU0sRUFBRSxDQUFDLHVCQUF1QixFQUFFLHVCQUF1QixDQUFDO1FBQzFELE9BQU8sRUFBRTtZQUNQLEVBQUUsRUFBRSxLQUFLLENBQUMsWUFBWTtTQUN2QjtLQUNGLENBQUMsQ0FBQTtJQUVGLE1BQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUNsRCxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FDekIsQ0FBQTtJQUVELElBQUksYUFBYSxFQUFFLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDbEUsTUFBTSxJQUFJLG1CQUFXLENBQ25CLHdCQUFnQixDQUFDLFlBQVksRUFDN0IsYUFBYSxLQUFLLENBQUMsWUFBWSxtQkFBbUIsS0FBSyxDQUFDLEtBQUssc0JBQXNCLENBQ3BGLENBQUE7SUFDSCxDQUFDO0lBRUQsTUFBTSxvQkFBb0IsR0FBRyxTQUFTLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUMzRCxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FDaEIsQ0FBQTtJQUVELDBJQUEwSTtJQUMxSSxJQUFJLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2hDLE1BQU0sRUFDSixJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFDaEIsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDcEIsTUFBTSxFQUFFLFNBQVM7WUFDakIsTUFBTSxFQUFFLENBQUMsZUFBZSxDQUFDO1lBQ3pCLE9BQU8sRUFBRTtnQkFDUCxFQUFFLEVBQUUsS0FBSyxDQUFDLFVBQVU7YUFDckI7U0FDRixDQUFDLENBQUE7UUFFRixNQUFNLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDbkUsSUFDRSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQ3RDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FDekMsRUFDRCxDQUFDO1lBQ0QsTUFBTSxJQUFJLG1CQUFXLENBQ25CLHdCQUFnQixDQUFDLFlBQVksRUFDN0IsV0FBVyxLQUFLLENBQUMsVUFBVSw4REFBOEQsQ0FDMUYsQ0FBQTtRQUNILENBQUM7SUFDSCxDQUFDO0lBRUQsTUFBTSxFQUFFLElBQUksRUFBRSxzQkFBc0IsRUFBRSxHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztRQUN6RCxNQUFNLEVBQUUsaUNBQXFCLENBQUMsVUFBVTtRQUN4QyxNQUFNLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSw4QkFBOEIsQ0FBQztRQUNqRSxPQUFPLEVBQUU7WUFDUCxVQUFVLEVBQUUsS0FBSyxDQUFDLFVBQVU7U0FDN0I7S0FDRixDQUFDLENBQUE7SUFFRixNQUFNLGVBQWUsR0FBRyxzQkFBc0IsQ0FBQyxHQUFHLENBQ2hELENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUNyQyxDQUFBO0lBRUQsSUFDRSxlQUFlLENBQUMsSUFBSSxDQUNsQixDQUFDLEtBQUssRUFBRSxFQUFFLENBQ1IsS0FBSyxDQUFDLFlBQVksS0FBSyxLQUFLLENBQUMsWUFBWTtRQUN6QyxLQUFLLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxLQUFLLENBQzlCLEVBQ0QsQ0FBQztRQUNELE1BQU0sSUFBSSxtQkFBVyxDQUNuQix3QkFBZ0IsQ0FBQyxlQUFlLEVBQ2hDLG1CQUFtQixLQUFLLENBQUMsS0FBSyxrQkFBa0IsS0FBSyxDQUFDLFlBQVksK0JBQStCLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FDcEgsQ0FBQTtJQUNILENBQUM7SUFFRCxPQUFPLElBQUksNEJBQVksRUFBRSxDQUFBO0FBQzNCLENBQUMsQ0FDRixDQUFBIn0=