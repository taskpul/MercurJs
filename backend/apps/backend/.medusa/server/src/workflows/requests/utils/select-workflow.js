"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequestWorkflowByType = void 0;
const workflows_1 = require("../workflows");
const getRequestWorkflowByType = (type) => {
    if (type === 'product_collection') {
        return workflows_1.acceptProductCollectionRequestWorkflow;
    }
    if (type === 'product_category') {
        return workflows_1.acceptProductCategoryRequestWorkflow;
    }
    if (type === 'product') {
        return workflows_1.acceptProductRequestWorkflow;
    }
    if (type === 'product_update') {
        return workflows_1.acceptProductRequestWorkflow;
    }
    if (type === 'seller') {
        return workflows_1.acceptSellerCreationRequestWorkflow;
    }
    if (type === 'review_remove') {
        return workflows_1.acceptReviewRemoveRequestWorkflow;
    }
    if (type === 'product_type') {
        return workflows_1.acceptProductTypeRequestWorkflow;
    }
    if (type === 'product_tag') {
        return workflows_1.acceptProductTagRequestWorkflow;
    }
    return null;
};
exports.getRequestWorkflowByType = getRequestWorkflowByType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LXdvcmtmbG93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9yZXF1ZXN0cy91dGlscy9zZWxlY3Qtd29ya2Zsb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNENBUXFCO0FBRWQsTUFBTSx3QkFBd0IsR0FBRyxDQUFDLElBQVksRUFBRSxFQUFFO0lBQ3ZELElBQUksSUFBSSxLQUFLLG9CQUFvQixFQUFFLENBQUM7UUFDbEMsT0FBTyxrREFBc0MsQ0FBQTtJQUMvQyxDQUFDO0lBRUQsSUFBSSxJQUFJLEtBQUssa0JBQWtCLEVBQUUsQ0FBQztRQUNoQyxPQUFPLGdEQUFvQyxDQUFBO0lBQzdDLENBQUM7SUFFRCxJQUFJLElBQUksS0FBSyxTQUFTLEVBQUUsQ0FBQztRQUN2QixPQUFPLHdDQUE0QixDQUFBO0lBQ3JDLENBQUM7SUFFRCxJQUFJLElBQUksS0FBSyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzlCLE9BQU8sd0NBQTRCLENBQUE7SUFDckMsQ0FBQztJQUVELElBQUksSUFBSSxLQUFLLFFBQVEsRUFBRSxDQUFDO1FBQ3RCLE9BQU8sK0NBQW1DLENBQUE7SUFDNUMsQ0FBQztJQUVELElBQUksSUFBSSxLQUFLLGVBQWUsRUFBRSxDQUFDO1FBQzdCLE9BQU8sNkNBQWlDLENBQUE7SUFDMUMsQ0FBQztJQUVELElBQUksSUFBSSxLQUFLLGNBQWMsRUFBRSxDQUFDO1FBQzVCLE9BQU8sNENBQWdDLENBQUE7SUFDekMsQ0FBQztJQUVELElBQUksSUFBSSxLQUFLLGFBQWEsRUFBRSxDQUFDO1FBQzNCLE9BQU8sMkNBQStCLENBQUE7SUFDeEMsQ0FBQztJQUVELE9BQU8sSUFBSSxDQUFBO0FBQ2IsQ0FBQyxDQUFBO0FBbENZLFFBQUEsd0JBQXdCLDRCQWtDcEMifQ==