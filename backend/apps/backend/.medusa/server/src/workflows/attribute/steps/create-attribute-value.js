"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAttributeValueStep = exports.createAttributeValueStepId = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const attribute_1 = require("@mercurjs/attribute");
exports.createAttributeValueStepId = 'create-attribute-value';
exports.createAttributeValueStep = (0, workflows_sdk_1.createStep)(exports.createAttributeValueStepId, async (input, { container }) => {
    const attributeModuleService = container.resolve(attribute_1.ATTRIBUTE_MODULE);
    const created = await attributeModuleService.createAttributeValues({
        ...input,
        rank: 0
    });
    return new workflows_sdk_1.StepResponse(created, created.id);
}, async (id, { container }) => {
    if (!id) {
        return;
    }
    const attributeModuleService = container.resolve(attribute_1.ATTRIBUTE_MODULE);
    await attributeModuleService.deleteAttributeValues(id);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWF0dHJpYnV0ZS12YWx1ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvYXR0cmlidXRlL3N0ZXBzL2NyZWF0ZS1hdHRyaWJ1dGUtdmFsdWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUVBQTRFO0FBRTVFLG1EQUE4RTtBQUdqRSxRQUFBLDBCQUEwQixHQUFHLHdCQUF3QixDQUFBO0FBRXJELFFBQUEsd0JBQXdCLEdBQUcsSUFBQSwwQkFBVSxFQUNoRCxrQ0FBMEIsRUFDMUIsS0FBSyxFQUNILEtBQXlELEVBQ3pELEVBQUUsU0FBUyxFQUFFLEVBQ2IsRUFBRTtJQUNGLE1BQU0sc0JBQXNCLEdBQzFCLFNBQVMsQ0FBQyxPQUFPLENBQXlCLDRCQUFnQixDQUFDLENBQUE7SUFFN0QsTUFBTSxPQUFPLEdBQUcsTUFBTSxzQkFBc0IsQ0FBQyxxQkFBcUIsQ0FBQztRQUNqRSxHQUFHLEtBQUs7UUFDUixJQUFJLEVBQUUsQ0FBQztLQUNSLENBQUMsQ0FBQTtJQUVGLE9BQU8sSUFBSSw0QkFBWSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUE7QUFDOUMsQ0FBQyxFQUNELEtBQUssRUFBRSxFQUFzQixFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUM5QyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDUixPQUFNO0lBQ1IsQ0FBQztJQUVELE1BQU0sc0JBQXNCLEdBQzFCLFNBQVMsQ0FBQyxPQUFPLENBQXlCLDRCQUFnQixDQUFDLENBQUE7SUFDN0QsTUFBTSxzQkFBc0IsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUN4RCxDQUFDLENBQ0YsQ0FBQSJ9