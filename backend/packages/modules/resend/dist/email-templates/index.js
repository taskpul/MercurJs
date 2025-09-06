"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailTemplates = void 0;
const admin_request_created_1 = require("./admin-request-created");
const admin_seller_request_created_1 = require("./admin-seller-request-created");
const buyer_account_created_1 = require("./buyer-account-created");
const buyer_cancel_order_1 = require("./buyer-cancel-order");
const buyer_new_order_1 = require("./buyer-new-order");
const buyer_shipped_order_1 = require("./buyer-shipped-order");
const forgot_password_1 = require("./forgot-password");
const new_seller_invitation_1 = require("./new-seller-invitation");
const seller_account_approved_1 = require("./seller-account-approved");
const seller_account_rejected_1 = require("./seller-account-rejected");
const seller_account_updates_submission_1 = require("./seller-account-updates-submission");
const seller_canceled_order_1 = require("./seller-canceled-order");
const seller_new_order_1 = require("./seller-new-order");
const seller_payout_summary_1 = require("./seller-payout-summary");
const seller_product_approved_1 = require("./seller-product-approved");
const seller_product_rejected_1 = require("./seller-product-rejected");
const seller_shipping_order_1 = require("./seller-shipping-order");
const seller_team_invite_1 = require("./seller-team-invite");
const seller_verify_email_1 = require("./seller-verify-email");
exports.emailTemplates = {
    buyerAccountCreatedEmailTemplate: buyer_account_created_1.BuyerAccountCreatedEmailTemplate,
    buyerCancelOrderEmailTemplate: buyer_cancel_order_1.BuyerCancelOrderEmailTemplate,
    buyerNewOrderEmailTemplate: buyer_new_order_1.BuyerNewOrderEmailTemplate,
    buyerOrderShippedEmailTemplate: buyer_shipped_order_1.BuyerOrderShippedEmailTemplate,
    forgotPasswordEmailTemplate: forgot_password_1.ForgotPasswordEmailTemplate,
    sellerAccountApprovedEmailTemplate: seller_account_approved_1.SellerAccountApprovedEmailTemplate,
    sellerAccountRejectedEmailTemplate: seller_account_rejected_1.SellerAccountRejectedEmailTemplate,
    sellerAccountSubmissionEmailTemplate: seller_account_updates_submission_1.SellerAccountSubmissionEmailTemplate,
    sellerCanceledOrderEmailTemplate: seller_canceled_order_1.SellerCanceledOrderEmailTemplate,
    sellerNewOrderEmailTemplate: seller_new_order_1.SellerNewOrderEmailTemplate,
    sellerOrderShippingEmailTemplate: seller_shipping_order_1.SellerOrderShippingEmailTemplate,
    sellerTeamInviteEmailTemplate: seller_team_invite_1.SellerTeamInviteEmailTemplate,
    sellerVerifyEmailTemplate: seller_verify_email_1.SellerEmailVerifyEmailTemplate,
    newSellerInvitation: new_seller_invitation_1.NewSellerInviteEmailTemplate,
    sellerProductRejectedEmailTemplate: seller_product_rejected_1.SellerProductRejectedEmailTemplate,
    sellerProductApprovedEmailTemplate: seller_product_approved_1.SellerProductApprovedEmailTemplate,
    adminRequestCreatedEmailTemplate: admin_request_created_1.AdminRequestCreatedEmailTemplate,
    adminSellerRequestCreatedEmailTemplate: admin_seller_request_created_1.AdminSellerRequestCreatedEmailTemplate,
    sellerPayoutSummaryEmailTemplate: seller_payout_summary_1.SellerPayoutSummaryEmailTemplate,
};
//# sourceMappingURL=index.js.map