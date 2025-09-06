"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = seedTaxCodes;
const taxcode_1 = require("@mercurjs/taxcode");
async function seedTaxCodes({ container }) {
    const taxCodeService = container.resolve(taxcode_1.TAX_CODE_MODULE);
    const codesResponse = await taxCodeService.getTaxCodes();
    const taxCodes = codesResponse.map((t) => {
        return { code: t.id, description: t.description, name: t.name };
    });
    await taxCodeService.createTaxCodes(taxCodes);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VlZFRheENvZGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NjcmlwdHMvc2VlZFRheENvZGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBS0EsK0JBU0M7QUFaRCwrQ0FBbUQ7QUFHcEMsS0FBSyxVQUFVLFlBQVksQ0FBQyxFQUFFLFNBQVMsRUFBWTtJQUNoRSxNQUFNLGNBQWMsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFpQix5QkFBZSxDQUFDLENBQUE7SUFFekUsTUFBTSxhQUFhLEdBQUcsTUFBTSxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDeEQsTUFBTSxRQUFRLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ3ZDLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ2pFLENBQUMsQ0FBQyxDQUFBO0lBRUYsTUFBTSxjQUFjLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQy9DLENBQUMifQ==