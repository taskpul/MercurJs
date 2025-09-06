interface EmailTemplateProps {
    data: {
        user_name: string;
        host: string;
        order_id: string;
        order: {
            id: string;
            display_id: string;
            trackingNumber: string;
            items: any[];
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
export declare const SellerOrderShippingEmailTemplate: React.FC<Readonly<EmailTemplateProps>>;
export {};
//# sourceMappingURL=seller-shipping-order.d.ts.map