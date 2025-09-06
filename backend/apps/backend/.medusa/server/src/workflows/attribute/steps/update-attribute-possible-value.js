"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAttributePossibleValueStep = exports.updateAttributePossibleValueStepId = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const attribute_1 = require("@mercurjs/attribute");
exports.updateAttributePossibleValueStepId = 'update-attribute-possible-value';
exports.updateAttributePossibleValueStep = (0, workflows_sdk_1.createStep)(exports.updateAttributePossibleValueStepId, async (payload, { container }) => {
    const attributeModuleService = container.resolve(attribute_1.ATTRIBUTE_MODULE);
    const updated = await attributeModuleService.updateAttributePossibleValues(payload);
    return new workflows_sdk_1.StepResponse(updated, payload.id);
}, async (id, { container }) => {
    if (!id) {
        return;
    }
    const attributeModuleService = container.resolve(attribute_1.ATTRIBUTE_MODULE);
    await attributeModuleService.deleteAttributePossibleValues(id);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWF0dHJpYnV0ZS1wb3NzaWJsZS12YWx1ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvYXR0cmlidXRlL3N0ZXBzL3VwZGF0ZS1hdHRyaWJ1dGUtcG9zc2libGUtdmFsdWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUVBQTRFO0FBRTVFLG1EQUE4RTtBQUdqRSxRQUFBLGtDQUFrQyxHQUM3QyxpQ0FBaUMsQ0FBQTtBQUl0QixRQUFBLGdDQUFnQyxHQUFHLElBQUEsMEJBQVUsRUFDeEQsMENBQWtDLEVBQ2xDLEtBQUssRUFBRSxPQUFrQixFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUMxQyxNQUFNLHNCQUFzQixHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQzlDLDRCQUFnQixDQUNTLENBQUE7SUFDM0IsTUFBTSxPQUFPLEdBQ1gsTUFBTSxzQkFBc0IsQ0FBQyw2QkFBNkIsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNyRSxPQUFPLElBQUksNEJBQVksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBQzlDLENBQUMsRUFDRCxLQUFLLEVBQUUsRUFBc0IsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDOUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ1IsT0FBTTtJQUNSLENBQUM7SUFFRCxNQUFNLHNCQUFzQixHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQzlDLDRCQUFnQixDQUNTLENBQUE7SUFDM0IsTUFBTSxzQkFBc0IsQ0FBQyw2QkFBNkIsQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUNoRSxDQUFDLENBQ0YsQ0FBQSJ9