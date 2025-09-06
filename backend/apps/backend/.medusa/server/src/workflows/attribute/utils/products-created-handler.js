"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsCreatedHookHandler = void 0;
const workflows_1 = require("../../../workflows/attribute/workflows");
const productsCreatedHookHandler = async ({ products, additional_data, container }) => {
    const attributeValues = (additional_data?.values ??
        []);
    const productIds = products.map((prod) => prod.id);
    if (!attributeValues.length) {
        return [];
    }
    await Promise.all(productIds.flatMap((prodId) => attributeValues.map(async (attrVal) => {
        return (0, workflows_1.createAttributeValueWorkflow)(container).run({
            input: {
                attribute_id: attrVal.attribute_id,
                value: attrVal.value,
                product_id: prodId
            }
        });
    })));
};
exports.productsCreatedHookHandler = productsCreatedHookHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdHMtY3JlYXRlZC1oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9hdHRyaWJ1dGUvdXRpbHMvcHJvZHVjdHMtY3JlYXRlZC1oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUlBLHNFQUFxRjtBQUU5RSxNQUFNLDBCQUEwQixHQUFHLEtBQUssRUFBRSxFQUMvQyxRQUFRLEVBQ1IsZUFBZSxFQUNmLFNBQVMsRUFLVixFQUFFLEVBQUU7SUFDSCxNQUFNLGVBQWUsR0FBRyxDQUFDLGVBQWUsRUFBRSxNQUFNO1FBQzlDLEVBQUUsQ0FBK0IsQ0FBQTtJQUNuQyxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7SUFFbEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM1QixPQUFPLEVBQUUsQ0FBQTtJQUNYLENBQUM7SUFFRCxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQ2YsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQzVCLGVBQWUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFO1FBQ3BDLE9BQU8sSUFBQSx3Q0FBNEIsRUFBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDakQsS0FBSyxFQUFFO2dCQUNMLFlBQVksRUFBRSxPQUFPLENBQUMsWUFBWTtnQkFDbEMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO2dCQUNwQixVQUFVLEVBQUUsTUFBTTthQUNuQjtTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUNILENBQ0YsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQTlCWSxRQUFBLDBCQUEwQiw4QkE4QnRDIn0=