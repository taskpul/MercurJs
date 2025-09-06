"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAttributesWorkflow = void 0;
const utils_1 = require("@medusajs/framework/utils");
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const attribute_1 = require("@mercurjs/attribute");
const category_attribute_1 = __importDefault(require("../../../links/category-attribute"));
const steps_1 = require("../steps");
const updateAttributesWorkflowId = 'update-attributes';
exports.updateAttributesWorkflow = (0, workflows_sdk_1.createWorkflow)(updateAttributesWorkflowId, (input) => {
    const toUpdateInput = (0, workflows_sdk_1.transform)({ input }, ({ input: { attributes } }) => {
        return attributes.map((attribute) => ({
            ...attribute,
            product_category_ids: undefined
        }));
    });
    const updatedAttributes = (0, steps_1.updateAttributesStep)(toUpdateInput);
    const attributesIdsWithCategories = (0, workflows_sdk_1.transform)({ input, updatedAttributes }, ({ input, updatedAttributes }) => {
        const updatedAttributeIds = updatedAttributes.map((attr) => attr.id);
        const attributeIdsWithoutCategories = input.attributes
            .filter((attr) => !attr.product_category_ids)
            .map((attr) => attr.id);
        return (0, utils_1.arrayDifference)(updatedAttributeIds, attributeIdsWithoutCategories);
    });
    const currentCategoriesLinksResult = (0, core_flows_1.useQueryGraphStep)({
        entity: category_attribute_1.default.entryPoint,
        fields: ['attribute_id', 'product_category_id'],
        filters: {
            attribute_id: attributesIdsWithCategories
        }
    });
    const currentCategoriesLinks = (0, workflows_sdk_1.transform)({ currentCategoriesLinksResult }, ({ currentCategoriesLinksResult }) => {
        return currentCategoriesLinksResult.data;
    });
    const toDeleteCategoriesLinks = (0, workflows_sdk_1.transform)({ currentCategoriesLinks }, ({ currentCategoriesLinks }) => {
        if (!currentCategoriesLinks.length) {
            return [];
        }
        return currentCategoriesLinks.map(({ attribute_id, product_category_id }) => ({
            [utils_1.Modules.PRODUCT]: {
                product_category_id
            },
            [attribute_1.ATTRIBUTE_MODULE]: {
                attribute_id
            }
        }));
    });
    (0, core_flows_1.dismissRemoteLinkStep)(toDeleteCategoriesLinks);
    const toCreateCategoryLinks = (0, workflows_sdk_1.transform)({ input }, ({ input: { attributes } }) => {
        return attributes
            .filter((attribute) => attribute.product_category_ids)
            .flatMap((attribute) => attribute.product_category_ids.map((attrCat) => ({
            [utils_1.Modules.PRODUCT]: {
                product_category_id: attrCat.id
            },
            [attribute_1.ATTRIBUTE_MODULE]: {
                attribute_id: attribute.id
            }
        })));
    });
    (0, core_flows_1.createRemoteLinkStep)(toCreateCategoryLinks);
    return new workflows_sdk_1.WorkflowResponse(updatedAttributes);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWF0dHJpYnV0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL2F0dHJpYnV0ZS93b3JrZmxvd3MvdXBkYXRlLWF0dHJpYnV0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EscURBQW9FO0FBQ3BFLHFFQUkwQztBQUMxQyw0REFJb0M7QUFFcEMsbURBQXNEO0FBR3RELDJGQUF3RTtBQUN4RSxvQ0FBK0M7QUFFL0MsTUFBTSwwQkFBMEIsR0FBRyxtQkFBbUIsQ0FBQTtBQU16QyxRQUFBLHdCQUF3QixHQUFHLElBQUEsOEJBQWMsRUFDcEQsMEJBQTBCLEVBQzFCLENBQUMsS0FBb0MsRUFBRSxFQUFFO0lBQ3ZDLE1BQU0sYUFBYSxHQUFHLElBQUEseUJBQVMsRUFBQyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLEVBQUU7UUFDdkUsT0FBTyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3BDLEdBQUcsU0FBUztZQUNaLG9CQUFvQixFQUFFLFNBQVM7U0FDaEMsQ0FBQyxDQUFDLENBQUE7SUFDTCxDQUFDLENBQUMsQ0FBQTtJQUVGLE1BQU0saUJBQWlCLEdBQUcsSUFBQSw0QkFBb0IsRUFBQyxhQUFhLENBQUMsQ0FBQTtJQUU3RCxNQUFNLDJCQUEyQixHQUFHLElBQUEseUJBQVMsRUFDM0MsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsRUFDNUIsQ0FBQyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxFQUFFLEVBQUU7UUFDL0IsTUFBTSxtQkFBbUIsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNwRSxNQUFNLDZCQUE2QixHQUFHLEtBQUss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