import Stripe from "stripe";
import { ProviderWebhookPayload, WebhookActionResult } from "@medusajs/framework/types";
import { AbstractPaymentProvider } from "@medusajs/framework/utils";
import { AuthorizePaymentInput, AuthorizePaymentOutput, CancelPaymentInput, CancelPaymentOutput, CapturePaymentInput, CapturePaymentOutput, DeletePaymentInput, DeletePaymentOutput, GetPaymentStatusInput, GetPaymentStatusOutput, InitiatePaymentInput, InitiatePaymentOutput, RefundPaymentInput, RefundPaymentOutput, RetrievePaymentInput, RetrievePaymentOutput, UpdatePaymentInput, UpdatePaymentOutput } from "@medusajs/types";
import { PaymentIntentOptions } from "@mercurjs/framework";
type Options = {
    apiKey: string;
    webhookSecret: string;
};
declare abstract class StripeConnectProvider extends AbstractPaymentProvider<Options> {
    private readonly options_;
    private readonly client_;
    constructor(container: any, options: Options);
    abstract get paymentIntentOptions(): PaymentIntentOptions;
    getPaymentStatus(input: GetPaymentStatusInput): Promise<GetPaymentStatusOutput>;
    initiatePayment(input: InitiatePaymentInput): Promise<InitiatePaymentOutput>;
    authorizePayment(data: AuthorizePaymentInput): Promise<AuthorizePaymentOutput>;
    cancelPayment({ data: paymentSessionData, }: CancelPaymentInput): Promise<CancelPaymentOutput>;
    capturePayment({ data: paymentSessionData, }: CapturePaymentInput): Promise<CapturePaymentOutput>;
    deletePayment(data: DeletePaymentInput): Promise<DeletePaymentOutput>;
    refundPayment({ data: paymentSessionData, amount, }: RefundPaymentInput): Promise<RefundPaymentOutput>;
    retrievePayment({ data: paymentSessionData, }: RetrievePaymentInput): Promise<RetrievePaymentOutput>;
    updatePayment(input: UpdatePaymentInput): Promise<UpdatePaymentOutput>;
    updatePaymentData(sessionId: string, data: Record<string, unknown>): Promise<any>;
    getWebhookActionAndData(webhookData: ProviderWebhookPayload["payload"]): Promise<WebhookActionResult>;
    constructWebhookEvent(data: ProviderWebhookPayload["payload"]): Stripe.Event;
    private buildError;
}
export default StripeConnectProvider;
//# sourceMappingURL=stripe-connect-provider.d.ts.map