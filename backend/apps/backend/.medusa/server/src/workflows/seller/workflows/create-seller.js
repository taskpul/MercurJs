"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSellerWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const workflows_sdk_2 = require("@medusajs/workflows-sdk");
const steps_1 = require("../../member/steps");
const steps_2 = require("../steps");
exports.createSellerWorkflow = (0, workflows_sdk_2.createWorkflow)('create-seller', function (input) {
    const seller = (0, steps_2.createSellerStep)(input.seller);
    const memberInput = (0, workflows_sdk_1.transform)({ seller, member: input.member }, ({ member, seller }) => ({
        ...member,
        seller_id: seller.id
    }));
    const member = (0, steps_1.createMemberStep)(memberInput);
    (0, steps_2.createSellerOnboardingStep)(seller);
    (0, core_flows_1.setAuthAppMetadataStep)({
        authIdentityId: input.auth_identity_id,
        actorType: 'seller',
        value: member.id
    });
    const sellerCreatedHook = (0, workflows_sdk_2.createHook)('sellerCreated', {
        sellerId: seller.id
    });
    return new workflows_sdk_2.WorkflowResponse(seller, { hooks: [sellerCreatedHook] });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXNlbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3Mvc2VsbGVyL3dvcmtmbG93cy9jcmVhdGUtc2VsbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQUE2RDtBQUM3RCw0REFBb0U7QUFDcEUsMkRBSWdDO0FBSWhDLDhDQUFxRDtBQUNyRCxvQ0FBdUU7QUFRMUQsUUFBQSxvQkFBb0IsR0FBRyxJQUFBLDhCQUFjLEVBQ2hELGVBQWUsRUFDZixVQUFVLEtBQWdDO0lBQ3hDLE1BQU0sTUFBTSxHQUFHLElBQUEsd0JBQWdCLEVBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBRTdDLE1BQU0sV0FBVyxHQUFHLElBQUEseUJBQVMsRUFDM0IsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFDaEMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN2QixHQUFHLE1BQU07UUFDVCxTQUFTLEVBQUUsTUFBTSxDQUFDLEVBQUU7S0FDckIsQ0FBQyxDQUNILENBQUE7SUFFRCxNQUFNLE1BQU0sR0FBRyxJQUFBLHdCQUFnQixFQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQzVDLElBQUEsa0NBQTBCLEVBQUMsTUFBTSxDQUFDLENBQUE7SUFFbEMsSUFBQSxtQ0FBc0IsRUFBQztRQUNyQixjQUFjLEVBQUUsS0FBSyxDQUFDLGdCQUFnQjtRQUN0QyxTQUFTLEVBQUUsUUFBUTtRQUNuQixLQUFLLEVBQUUsTUFBTSxDQUFDLEVBQUU7S0FDakIsQ0FBQyxDQUFBO0lBRUYsTUFBTSxpQkFBaUIsR0FBRyxJQUFBLDBCQUFVLEVBQUMsZUFBZSxFQUFFO1FBQ3BELFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtLQUNwQixDQUFDLENBQUE7SUFDRixPQUFPLElBQUksZ0NBQWdCLENBQUMsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUE7QUFDckUsQ0FBQyxDQUNGLENBQUEifQ==