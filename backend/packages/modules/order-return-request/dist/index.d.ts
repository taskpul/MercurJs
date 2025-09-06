import OrderReturnModuleService from "./service";
export declare const ORDER_RETURN_MODULE = "order_return";
export { OrderReturnModuleService };
declare const _default: import("@medusajs/types").ModuleExports<typeof OrderReturnModuleService> & {
    linkable: {
        readonly orderReturnRequest: {
            id: {
                serviceName: "order_return";
                field: "orderReturnRequest";
                linkable: "order_return_request_id";
                primaryKey: "id";
            };
            toJSON: () => {
                serviceName: "order_return";
                field: "orderReturnRequest";
                linkable: "order_return_request_id";
                primaryKey: "id";
            };
        };
        readonly orderReturnRequestLineItem: {
            id: {
                serviceName: "order_return";
                field: "orderReturnRequestLineItem";
                linkable: "order_return_request_line_item_id";
                primaryKey: "id";
            };
            toJSON: () => {
                serviceName: "order_return";
                field: "orderReturnRequestLineItem";
                linkable: "order_return_request_line_item_id";
                primaryKey: "id";
            };
        };
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map