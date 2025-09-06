"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAttributesStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const attribute_1 = require("@mercurjs/attribute");
const updateAttributesStepId = 'update-attributes';
exports.updateAttributesStep = (0, workflows_sdk_1.createStep)(updateAttributesStepId, async (data, { container }) => {
    const service = container.resolve(attribute_1.ATTRIBUTE_MODULE);
    const prevData = await service.listAttributes({
        id: data.map((attribute) => attribute.id)
    });
    const normalized = data.map((attr) => {
        const { possible_values: values, ...attribute } = attr;
        const valuesWithAttribute = values?.map((val) => ({
            ...val,
            attribute_id: attribute.id
        }));
        return {
            ...attr,
            possible_values: valuesWithAttribute
        };
    });
    const attributes = normalized.map((element) => {
        delete element.product_category_ids;
        return element;
    });
    await service.updateAttributeWithUpsertOrReplacePossibleValues(normalized);
    return new workflows_sdk_1.StepResponse(attributes, prevData);
}, async (prevData, { container }) => {
    if (!prevData?.length) {
        return;
    }
    const service = container.resolve(attribute_1.ATTRIBUTE_MODULE);
    //@ts-expect-error Possible values
    await service.updateAttributes(prevData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWF0dHJpYnV0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL2F0dHJpYnV0ZS9zdGVwcy91cGRhdGUtYXR0cmlidXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxRUFJMEM7QUFFMUMsbURBQThFO0FBRzlFLE1BQU0sc0JBQXNCLEdBQUcsbUJBQW1CLENBQUE7QUFFckMsUUFBQSxvQkFBb0IsR0FBRyxJQUFBLDBCQUFVLEVBQzVDLHNCQUFzQixFQUN0QixLQUFLLEVBQUUsSUFBd0MsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDaEUsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBeUIsNEJBQWdCLENBQUMsQ0FBQTtJQUUzRSxNQUFNLFFBQVEsR0FBRyxNQUFNLE9BQU8sQ0FBQyxjQUFjLENBQUM7UUFDNUMsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7S0FDMUMsQ0FBQyxDQUFBO0lBRUYsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ25DLE1BQU0sRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLEdBQUcsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBQ3RELE1BQU0sbUJBQW1CLEdBQUcsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNoRCxHQUFHLEdBQUc7WUFDTixZQUFZLEVBQUUsU0FBUyxDQUFDLEVBQUU7U0FDM0IsQ0FBQyxDQUFDLENBQUE7UUFDSCxPQUFPO1lBQ0wsR0FBRyxJQUFJO1lBQ1AsZUFBZSxFQUFFLG1CQUFtQjtTQUNyQyxDQUFBO0lBQ0gsQ0FBQyxDQUFDLENBQUE7SUFFRixNQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDNUMsT0FBTyxPQUFPLENBQUMsb0JBQW9CLENBQUE7UUFDbkMsT0FBTyxPQUFPLENBQUE7SUFDaEIsQ0FBQyxDQUFDLENBQUE7SUFFRixNQUFNLE9BQU8sQ0FBQyxnREFBZ0QsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUUxRSxPQUFPLElBQUksNEJBQVksQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUE7QUFDL0MsQ0FBQyxFQUNELEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO0lBQ2hDLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUM7UUFDdEIsT0FBTTtJQUNSLENBQUM7SUFDRCxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUF5Qiw0QkFBZ0IsQ0FBQyxDQUFBO0lBRTNFLGtDQUFrQztJQUNsQyxNQUFNLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUMxQyxDQUFDLENBQ0YsQ0FBQSJ9