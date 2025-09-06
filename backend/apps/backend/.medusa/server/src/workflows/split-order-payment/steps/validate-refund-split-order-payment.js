"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRefundSplitOrderPaymentStep = void 0;
const utils_1 = require("@medusajs/framework/utils");
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const split_order_payment_1 = require("@mercurjs/split-order-payment");
exports.validateRefundSplitOrderPaymentStep = (0, workflows_sdk_1.createStep)('validate-refund-split-order-payments', async (input, { container }) => {
    const service = container.resolve(split_order_payment_1.SPLIT_ORDER_PAYMENT_MODULE);
    const payment = await service.retrieveSplitOrderPayment(input.id);
    const amountLeft = utils_1.MathBN.convert(payment.captured_amount)
        .minus(payment.refunded_amount)
        .minus(input.amount)
        .toNumber();
    const refundedAmount = utils_1.MathBN.convert(input.amount)
        .plus(payment.refunded_amount)
        .toNumber();
    const status = utils_1.MathBN.gt(amountLeft, 0) ? 'partially_refunded' : 'refunded';
    if (input.amount <= 0 || utils_1.MathBN.lt(amountLeft, 0)) {
        throw new utils_1.MedusaError(utils_1.MedusaError.Types.NOT_ALLOWED, 'Invalid refund amount!');
    }
    return new workflows_sdk_1.StepResponse({
        id: input.id,
        refunded_amount: refundedAmount,
        status
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUtcmVmdW5kLXNwbGl0LW9yZGVyLXBheW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL3NwbGl0LW9yZGVyLXBheW1lbnQvc3RlcHMvdmFsaWRhdGUtcmVmdW5kLXNwbGl0LW9yZGVyLXBheW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscURBQStEO0FBQy9ELHFFQUE0RTtBQUc1RSx1RUFHc0M7QUFFekIsUUFBQSxtQ0FBbUMsR0FBRyxJQUFBLDBCQUFVLEVBQzNELHNDQUFzQyxFQUN0QyxLQUFLLEVBQUUsS0FBa0MsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDMUQsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FDL0IsZ0RBQTBCLENBQzNCLENBQUE7SUFFRCxNQUFNLE9BQU8sR0FBRyxNQUFNLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUE7SUFFakUsTUFBTSxVQUFVLEdBQUcsY0FBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDO1NBQ3ZELEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDO1NBQzlCLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1NBQ25CLFFBQVEsRUFBRSxDQUFBO0lBRWIsTUFBTSxjQUFjLEdBQUcsY0FBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1NBQ2hELElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDO1NBQzdCLFFBQVEsRUFBRSxDQUFBO0lBRWIsTUFBTSxNQUFNLEdBQUcsY0FBTSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUE7SUFFM0UsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxjQUFNLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ2xELE1BQU0sSUFBSSxtQkFBVyxDQUNuQixtQkFBVyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQzdCLHdCQUF3QixDQUN6QixDQUFBO0lBQ0gsQ0FBQztJQUVELE9BQU8sSUFBSSw0QkFBWSxDQUFDO1FBQ3RCLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRTtRQUNaLGVBQWUsRUFBRSxjQUFjO1FBQy9CLE1BQU07S0FDUCxDQUFDLENBQUE7QUFDSixDQUFDLENBQ0YsQ0FBQSJ9