"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAttributesStep = exports.createAttributesStepId = void 0;
const utils_1 = require("@medusajs/framework/utils");
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const attribute_1 = require("@mercurjs/attribute");
exports.createAttributesStepId = 'create-attributes';
exports.createAttributesStep = (0, workflows_sdk_1.createStep)(exports.createAttributesStepId, async (data, { container }) => {
    const service = container.resolve(attribute_1.ATTRIBUTE_MODULE);
    const validated = data.map((attribute) => {
        return {
            ...attribute,
            handle: attribute.handle || (0, utils_1.toHandle)(attribute.name)
        };
    });
    //@ts-expect-error Possible values
    const created = (await service.createAttributes(validated));
    return new workflows_sdk_1.StepResponse(created, created.map((attribute) => attribute.id));
}, async (createdIds, { container }) => {
    if (!createdIds?.length) {
        return;
    }
    const service = container.resolve(attribute_1.ATTRIBUTE_MODULE);
    await service.deleteAttributes(createdIds);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWF0dHJpYnV0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL2F0dHJpYnV0ZS9zdGVwcy9jcmVhdGUtYXR0cmlidXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxREFBb0Q7QUFDcEQscUVBQTRFO0FBRTVFLG1EQUE4RTtBQUdqRSxRQUFBLHNCQUFzQixHQUFHLG1CQUFtQixDQUFBO0FBTzVDLFFBQUEsb0JBQW9CLEdBQUcsSUFBQSwwQkFBVSxFQUM1Qyw4QkFBc0IsRUFDdEIsS0FBSyxFQUFFLElBQThCLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO0lBQ3RELE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQXlCLDRCQUFnQixDQUFDLENBQUE7SUFFM0UsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ3ZDLE9BQU87WUFDTCxHQUFHLFNBQVM7WUFDWixNQUFNLEVBQUUsU0FBUyxDQUFDLE1BQU0sSUFBSSxJQUFBLGdCQUFRLEVBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztTQUNyRCxDQUFBO0lBQ0gsQ0FBQyxDQUFDLENBQUE7SUFFRixrQ0FBa0M7SUFDbEMsTUFBTSxPQUFPLEdBQUcsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBVSxDQUFBO0lBQ3BFLE9BQU8sSUFBSSw0QkFBWSxDQUNyQixPQUFPLEVBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUN6QyxDQUFBO0FBQ0gsQ0FBQyxFQUNELEtBQUssRUFBRSxVQUFnQyxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUN4RCxJQUFJLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxDQUFDO1FBQ3hCLE9BQU07SUFDUixDQUFDO0lBRUQsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBeUIsNEJBQWdCLENBQUMsQ0FBQTtJQUUzRSxNQUFNLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUM1QyxDQUFDLENBQ0YsQ0FBQSJ9