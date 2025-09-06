import { AbstractNotificationProviderService } from '@medusajs/framework/utils';
import { ProviderSendNotificationDTO } from '@medusajs/types';
type ResendOptions = {
    api_key: string;
    from: string;
};
declare class ResendNotificationProviderService extends AbstractNotificationProviderService {
    static identifier: string;
    private resendClient;
    private options;
    constructor(_: any, options: ResendOptions);
    validateModuleOptions(options: ResendOptions): void;
    send(notification: ProviderSendNotificationDTO): Promise<import("resend").CreateEmailResponseSuccess>;
}
export default ResendNotificationProviderService;
//# sourceMappingURL=service.d.ts.map