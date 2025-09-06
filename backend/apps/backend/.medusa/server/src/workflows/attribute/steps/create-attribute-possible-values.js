"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAttributePossibleValuesStep = exports.createAttributePossibleValuesStepId = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const attribute_1 = require("@mercurjs/attribute");
exports.createAttributePossibleValuesStepId = 'create-attribute-possible-values';
exports.createAttributePossibleValuesStep = (0, workflows_sdk_1.createStep)(exports.createAttributePossibleValuesStepId, async (data, { container }) => {
    const service = container.resolve(attribute_1.ATTRIBUTE_MODULE);
    const values = await service.createAttributePossibleValues(data);
    return new workflows_sdk_1.StepResponse(values, values.map((val) => val.id));
}, async (ids, { container }) => {
    if (!ids?.length) {
        return;
    }
    const service = container.resolve(attribute_1.ATTRIBUTE_MODULE);
    await service.deleteAttributeValues(ids);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWF0dHJpYnV0ZS1wb3NzaWJsZS12YWx1ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL2F0dHJpYnV0ZS9zdGVwcy9jcmVhdGUtYXR0cmlidXRlLXBvc3NpYmxlLXZhbHVlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxRUFBNEU7QUFFNUUsbURBQThFO0FBR2pFLFFBQUEsbUNBQW1DLEdBQzlDLGtDQUFrQyxDQUFBO0FBSXZCLFFBQUEsaUNBQWlDLEdBQUcsSUFBQSwwQkFBVSxFQUN6RCwyQ0FBbUMsRUFDbkMsS0FBSyxFQUFFLElBQTRDLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO0lBQ3BFLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQXlCLDRCQUFnQixDQUFDLENBQUE7SUFFM0UsTUFBTSxNQUFNLEdBQUcsTUFBTSxPQUFPLENBQUMsNkJBQTZCLENBQUMsSUFBSSxDQUFDLENBQUE7SUFFaEUsT0FBTyxJQUFJLDRCQUFZLENBQ3JCLE1BQU0sRUFDTixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQzVCLENBQUE7QUFDSCxDQUFDLEVBQ0QsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDM0IsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQztRQUNqQixPQUFNO0lBQ1IsQ0FBQztJQUVELE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQXlCLDRCQUFnQixDQUFDLENBQUE7SUFFM0UsTUFBTSxPQUFPLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDMUMsQ0FBQyxDQUNGLENBQUEifQ==