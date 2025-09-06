interface EmailTemplateProps {
    data: {
        user_name: string;
        order_address: string;
        order_id: string;
        order: {
            id: string;
            display_id: string;
            trackingNumber: string;
            items: {
                name: string;
            }[];
            currency_code: string;
            item_total: number;
            shipping_methods: {
                amount: number;
                name: string;
            }[];
            total: number;
            email: string;
            shipping_address: {
                first_name: string;
                last_name: string;
                company: string;
                address_1: string;
                address_2: string;
                city: string;
                province: string;
                postal_code: string;
                phone: string;
            };
        };
    };
}
export declare const SellerCanceledOrderEmailTemplate: React.FC<Readonly<EmailTemplateProps>>;
export {};
//# sourceMappingURL=seller-canceled-order.d.ts.map