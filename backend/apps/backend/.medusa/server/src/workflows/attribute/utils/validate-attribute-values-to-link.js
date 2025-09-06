"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAttributeValuesToLink = void 0;
const utils_1 = require("@medusajs/framework/utils");
const validateAttributeValuesToLink = async ({ attributeValues, products, container }) => {
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const attributeMap = new Map();
    for (const attrVal of attributeValues) {
        const id = attrVal.attribute_id;
        if (!attributeMap.get(id)) {
            const { data: [attribute] } = await query.graph({
                entity: 'attribute',
                fields: ['product_categories.*', 'possible_values.*'],
                filters: {
                    id: id
                }
            });
            attributeMap.set(id, attribute);
        }
        const allowedValues = attributeMap
            .get(id)
            ?.possible_values?.map((posVal) => posVal.value);
        if (allowedValues?.length && !allowedValues.includes(attrVal.value)) {
            throw new utils_1.MedusaError(utils_1.MedusaErrorTypes.INVALID_DATA, `Attribute ${attrVal.attribute_id} doesn't define ${attrVal.value} as a possible_value`);
        }
    }
    const attributeCategoryIds = Array.from(new Set(Array.from(attributeMap.values()).flatMap((attr) => attr.product_categories?.map((cat) => cat.id) || [])));
    if (!attributeCategoryIds.length) {
        return;
    }
    const invalidProductIds = [];
    for (const product of products) {
        const productCategoryIds = product.categories?.map((cat) => cat.id);
        if (!productCategoryIds?.some((prodCatId) => attributeCategoryIds.includes(prodCatId))) {
            invalidProductIds.push(product.id);
        }
    }
    if (invalidProductIds.length) {
        throw new utils_1.MedusaError(utils_1.MedusaErrorTypes.INVALID_DATA, `The following products aren't linked to any category from the requested attributes:\n${invalidProductIds.join(', ')}`);
    }
};
exports.validateAttributeValuesToLink = validateAttributeValuesToLink;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUtYXR0cmlidXRlLXZhbHVlcy10by1saW5rLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9hdHRyaWJ1dGUvdXRpbHMvdmFsaWRhdGUtYXR0cmlidXRlLXZhbHVlcy10by1saW5rLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQU1BLHFEQUlrQztBQUszQixNQUFNLDZCQUE2QixHQUFHLEtBQUssRUFBRSxFQUNsRCxlQUFlLEVBQ2YsUUFBUSxFQUNSLFNBQVMsRUFLVixFQUFFLEVBQUU7SUFDSCxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRWhFLE1BQU0sWUFBWSxHQUFHLElBQUksR0FBRyxFQUt6QixDQUFBO0lBRUgsS0FBSyxNQUFNLE9BQU8sSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUN0QyxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFBO1FBRS9CLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDMUIsTUFBTSxFQUNKLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUNsQixHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztnQkFDcEIsTUFBTSxFQUFFLFdBQVc7Z0JBQ25CLE1BQU0sRUFBRSxDQUFDLHNCQUFzQixFQUFFLG1CQUFtQixDQUFDO2dCQUNyRCxPQUFPLEVBQUU7b0JBQ1AsRUFBRSxFQUFFLEVBQUU7aUJBQ1A7YUFDRixDQUFDLENBQUE7WUFFRixZQUFZLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQTtRQUNqQyxDQUFDO1FBRUQsTUFBTSxhQUFhLEdBQUcsWUFBWTthQUMvQixHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ1IsRUFBRSxlQUFlLEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7UUFFbEQsSUFBSSxhQUFhLEVBQUUsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUNwRSxNQUFNLElBQUksbUJBQVcsQ0FDbkIsd0JBQWdCLENBQUMsWUFBWSxFQUM3QixhQUFhLE9BQU8sQ0FBQyxZQUFZLG1CQUFtQixPQUFPLENBQUMsS0FBSyxzQkFBc0IsQ0FDeEYsQ0FBQTtRQUNILENBQUM7SUFDSCxDQUFDO0lBRUQsTUFBTSxvQkFBb0IsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUNyQyxJQUFJLEdBQUcsQ0FDTCxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FDdkMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQzlELENBQ0YsQ0FDRixDQUFBO0lBRUQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2pDLE9BQU07SUFDUixDQUFDO0lBRUQsTUFBTSxpQkFBaUIsR0FBYSxFQUFFLENBQUE7SUFDdEMsS0FBSyxNQUFNLE9BQU8sSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUMvQixNQUFNLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDbkUsSUFDRSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQ3RDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FDekMsRUFDRCxDQUFDO1lBQ0QsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNwQyxDQUFDO0lBQ0gsQ0FBQztJQUVELElBQUksaUJBQWlCLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDN0IsTUFBTSxJQUFJLG1CQUFXLENBQ25CLHdCQUFnQixDQUFDLFlBQVksRUFDN0Isd0ZBQXdGLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUN2SCxDQUFBO0lBQ0gsQ0FBQztBQUNILENBQUMsQ0FBQTtBQTdFWSxRQUFBLDZCQUE2QixpQ0E2RXpDIn0=