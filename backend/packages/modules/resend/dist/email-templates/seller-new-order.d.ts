interface EmailTemplateProps {
    data: {
        order: {
            id: string;
            display_id: number | string;
            items: any[];
            customer: {
                first_name: string;
                last_name: string;
                id: string;
            };
            seller: {
                email: string;
                name: string;
                id: string;
            };
        };
    };
}
export declare const SellerNewOrderEmailTemplate: React.FC<Readonly<EmailTemplateProps>>;
export {};
//# sourceMappingURL=seller-new-order.d.ts.map