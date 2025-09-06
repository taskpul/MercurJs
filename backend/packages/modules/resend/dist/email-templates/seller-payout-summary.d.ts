interface EmailTemplateProps {
    data: {
        seller: {
            email: string;
            name: string;
        };
        payouts: {
            id: string;
            created_at: Date;
            amount: number;
            currency_code: string;
            order: {
                id: string;
                display_id: number;
                created_at: Date;
            };
        }[];
    };
}
export declare const SellerPayoutSummaryEmailTemplate: React.FC<Readonly<EmailTemplateProps>>;
export {};
//# sourceMappingURL=seller-payout-summary.d.ts.map