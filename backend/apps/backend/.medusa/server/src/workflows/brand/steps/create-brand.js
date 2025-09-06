"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBrandStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const brand_1 = require("@mercurjs/brand");
exports.createBrandStep = (0, workflows_sdk_1.createStep)('create-brand', async (input, { container }) => {
    const service = container.resolve(brand_1.BRAND_MODULE);
    let [brand] = await service.listBrands({ name: input.brand_name });
    if (!brand) {
        brand = await service.createBrands({ name: input.brand_name });
    }
    return new workflows_sdk_1.StepResponse(brand, brand.id);
}, async (brandId, { container }) => {
    const service = container.resolve(brand_1.BRAND_MODULE);
    await service.deleteBrands(brandId);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWJyYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9icmFuZC9zdGVwcy9jcmVhdGUtYnJhbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUVBQTRFO0FBRTVFLDJDQUE4QztBQUlqQyxRQUFBLGVBQWUsR0FBRyxJQUFBLDBCQUFVLEVBQ3ZDLGNBQWMsRUFDZCxLQUFLLEVBQUUsS0FBcUIsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDN0MsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBcUIsb0JBQVksQ0FBQyxDQUFBO0lBRW5FLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUE7SUFFbEUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ1gsS0FBSyxHQUFHLE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQTtJQUNoRSxDQUFDO0lBRUQsT0FBTyxJQUFJLDRCQUFZLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUMxQyxDQUFDLEVBQ0QsS0FBSyxFQUFFLE9BQWUsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDdkMsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBcUIsb0JBQVksQ0FBQyxDQUFBO0lBQ25FLE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUNyQyxDQUFDLENBQ0YsQ0FBQSJ9