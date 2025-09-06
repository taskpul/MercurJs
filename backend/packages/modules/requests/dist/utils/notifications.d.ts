import { MedusaContainer } from '@medusajs/framework';
interface RequestNotificationParams {
    container: MedusaContainer;
    requestId: string;
    requestType: string;
    template: string;
}
export declare function sendVendorUIRequestNotification({ container, requestId, requestType, template }: RequestNotificationParams): Promise<void>;
export {};
//# sourceMappingURL=notifications.d.ts.map