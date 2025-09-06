"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitAndCompleteCartWorkflow = void 0;
const utils_1 = require("@medusajs/framework/utils");
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const workflows_sdk_2 = require("@medusajs/workflows-sdk");
const framework_1 = require("@mercurjs/framework");
const marketplace_1 = require("@mercurjs/marketplace");
const seller_1 = require("@mercurjs/seller");
const steps_1 = require("../../promotions/steps");
const steps_2 = require("../../split-order-payment/steps");
const steps_3 = require("../steps");
const utils_2 = require("../utils");
exports.splitAndCompleteCartWorkflow = (0, workflows_sdk_2.createWorkflow)({
    name: 'split-and-complete-cart',
    idempotent: true
}, function (input) {
    const existingOrderSet = (0, core_flows_1.useRemoteQueryStep)({
        entry_point: 'order_set',
        fields: ['id', 'cart_id'],
        variables: {
            filters: {
                cart_id: input.id
            }
        },
        list: false
    }).config({ name: 'order-set-query' });
    const orderSet = (0, workflows_sdk_1.when)({ existingOrderSet }, ({ existingOrderSet }) => {
        return !existingOrderSet;
    }).then(() => {
        const cart = (0, core_flows_1.useRemoteQueryStep)({
            entry_point: 'cart',
            fields: utils_2.completeCartFields,
            variables: {
                id: input.id
            },
            list: false
        }).config({ name: 'cart-query' });
        (0, steps_3.validateCartSellersStep)((0, workflows_sdk_1.transform)({ cart }, ({ cart }) => ({
            line_items: cart.items
        })));
        const validateCartShippingOptionsInput = (0, workflows_sdk_1.transform)({ cart }, ({ cart }) => ({
            cart_id: cart.id,
            option_ids: cart.shipping_methods.map((method) => method.shipping_option_id)
        }));
        const { sellerProducts, sellerShippingOptions } = (0, steps_3.validateCartShippingOptionsStep)(validateCartShippingOptionsInput);
        const paymentSessions = (0, core_flows_1.validateCartPaymentsStep)({ cart });
        const payment = (0, core_flows_1.authorizePaymentSessionStep)({
            id: paymentSessions[0].id,
            context: { cart_id: cart.id }
        });
        const { ordersToCreate, sellers, variants } = (0, workflows_sdk_1.transform)({ cart, sellerProducts, sellerShippingOptions }, ({ cart, sellerProducts, sellerShippingOptions }) => {
            const productSellerMap = new Map(sellerProducts.map((sp) => [sp.product_id, sp.seller_id]));
            const shippingOptionSellerMap = new Map(sellerShippingOptions.map((sp) => [
                sp.shipping_option_id,
                sp.seller_id
            ]));
            const sellerLineItemsMap = new Map();
            const sellerShippingMethodsMap = new Map();
            const variantsMap = new Map();
            cart.items.forEach((item) => {
                const sellerId = productSellerMap.get(item.variant.product_id);
                const lineItems = sellerLineItemsMap.get(sellerId) || [];
                lineItems.push(item);
                sellerLineItemsMap.set(sellerId, lineItems);
                variantsMap.set(item.variant.id, item.variant);
            });
            cart.shipping_methods.forEach((method) => {
                const sellerId = shippingOptionSellerMap.get(method.shipping_option_id);
                sellerShippingMethodsMap.set(sellerId, method);
            });
            const sellers = Array.from(sellerLineItemsMap.keys());
            const ordersToCreate = sellers.map((sellerId) => {
                const sm = sellerShippingMethodsMap.get(sellerId);
                if (!sm) {
                    throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, 'Seller shipping method not found!');
                }
                const items = sellerLineItemsMap.get(sellerId).map((item) => (0, utils_2.prepareLineItemData)({
                    item,
                    variant: item.variant,
                    unitPrice: item.unit_price,
                    compareAtUnitPrice: item.compare_at_unit_price,
                    isTaxInclusive: item.is_tax_inclusive,
                    quantity: item.quantity,
                    metadata: item?.metadata,
                    taxLines: item.tax_lines ?? [],
                    adjustments: item.adjustments ?? []
                }));
                const itemAdjustments = items
                    .map((item) => item.adjustments ?? [])
                    .flat(1);
                const promoCodes = [...itemAdjustments]
                    .map((adjustment) => adjustment.code)
                    .filter(Boolean);
                return {
                    region_id: cart.region?.id,
                    customer_id: cart.customer?.id,
                    sales_channel_id: cart.sales_channel_id,
                    status: utils_1.OrderStatus.PENDING,
                    email: cart.email,
                    currency_code: cart.currency_code,
                    shipping_address: cart.shipping_address,
                    billing_address: cart.billing_address,
                    no_notification: false,
                    items,
                    promo_codes: promoCodes,
                    shipping_methods: [
                        {
                            name: sm.name,
                            description: sm.description,
                            amount: sm.amount,
                            is_tax_inclusive: sm.is_tax_inclusive,
                            shipping_option_id: sm.shipping_option_id,
                            data: sm.data,
                            metadata: sm.metadata,
                            tax_lines: (0, utils_2.prepareTaxLinesData)(sm.tax_lines ?? [])
                        }
                    ]
                };
            });
            return {
                ordersToCreate,
                sellers,
                variants: Array.from(variantsMap.values())
            };
        });
        const promotionUsage = (0, workflows_sdk_1.transform)({ cart }, ({ cart }) => {
            const promotionUsage = [];
            const itemAdjustments = (cart.items ?? [])
                .map((item) => item.adjustments ?? [])
                .flat(1);
            const shippingAdjustments = (cart.shipping_methods ?? [])
                .map((item) => item.adjustments ?? [])
                .flat(1);
            for (const adjustment of itemAdjustments) {
                promotionUsage.push({
                    amount: adjustment.amount,
                    code: adjustment.code
                });
            }
            for (const adjustment of shippingAdjustments) {
                promotionUsage.push({
                    amount: adjustment.amount,
                    code: adjustment.code
                });
            }
            return promotionUsage;
        });
        (0, steps_1.registerUsageStep)(promotionUsage);
        const orderSet = (0, steps_3.createOrderSetStep)({
            cart_id: cart.id,
            customer_id: cart.customer_id,
            sales_channel_id: cart.sales_channel_id,
            payment_collection_id: payment.payment_collection_id
        });
        const createdOrders = (0, core_flows_1.createOrdersStep)(ordersToCreate);
        const splitPaymentsToCreate = (0, workflows_sdk_1.transform)({ createdOrders, payment }, ({ createdOrders, payment }) => {
            return createdOrders.map((order) => ({
                order_id: order.id,
                status: 'pending',
                currency_code: order.currency_code,
                authorized_amount: utils_1.MathBN.convert(order.summary?.accounting_total || 0).toNumber(),
                payment_collection_id: payment.payment_collection_id
            }));
        });
        const reservationItemsData = (0, workflows_sdk_1.transform)({ createdOrders }, ({ createdOrders }) => createdOrders.reduce((acc, order) => {
            acc.push(...order.items.map((i) => ({
                variant_id: i.variant_id,
                quantity: i.quantity,
                id: i.id
            })));
            return acc;
        }, []));
        const updateCartInput = (0, workflows_sdk_1.transform)({ cart }, ({ cart }) => ({
            id: cart.id,
            completed_at: new Date()
        }));
        const formatedInventoryItems = (0, workflows_sdk_1.transform)({
            input: {
                sales_channel_id: cart.sales_channel_id,
                variants,
                items: reservationItemsData
            }
        }, utils_2.prepareConfirmInventoryInput);
        const links = (0, workflows_sdk_1.transform)({
            createdOrders,
            sellers,
            orderSet,
            cart
        }, ({ createdOrders, sellers, orderSet, cart }) => {
            const sellerOrderLinks = createdOrders.map((order, index) => ({
                [seller_1.SELLER_MODULE]: {
                    seller_id: sellers[index]
                },
                [utils_1.Modules.ORDER]: {
                    order_id: order.id
                }
            }));
            const orderSetOrderLinks = createdOrders.map((order) => ({
                [marketplace_1.MARKETPLACE_MODULE]: {
                    order_set_id: orderSet.id
                },
                [utils_1.Modules.ORDER]: {
                    order_id: order.id
                }
            }));
            const orderPaymentLinks = createdOrders.map((order) => ({
                [utils_1.Modules.ORDER]: {
                    order_id: order.id
                },
                [utils_1.Modules.PAYMENT]: {
                    payment_collection_id: cart.payment_collection.id
                }
            }));
            return [
                ...sellerOrderLinks,
                ...orderSetOrderLinks,
                ...orderPaymentLinks
            ];
        });
        const orderEvents = (0, workflows_sdk_1.transform)({ createdOrders }, ({ createdOrders }) => ({
            eventName: utils_1.OrderWorkflowEvents.PLACED,
            data: createdOrders.map((order) => ({
                id: order.id
            }))
        }));
        (0, workflows_sdk_1.parallelize)((0, steps_2.createSplitOrderPaymentsStep)(splitPaymentsToCreate), (0, core_flows_1.createRemoteLinkStep)(links), (0, core_flows_1.reserveInventoryStep)(formatedInventoryItems), (0, core_flows_1.updateCartsStep)([updateCartInput]), (0, core_flows_1.emitEventStep)(orderEvents), (0, core_flows_1.emitEventStep)({
            eventName: framework_1.OrderSetWorkflowEvents.PLACED,
            data: {
                id: orderSet.id
            }
        }).config({ name: 'order-set-event' }));
        return orderSet;
    });
    const orderSetId = (0, workflows_sdk_1.transform)({ orderSet, existingOrderSet }, ({ orderSet, existingOrderSet }) => orderSet ? orderSet.id : existingOrderSet.id);
    const orderSetCreatedHook = (0, workflows_sdk_2.createHook)('orderSetCreated', {
        orderSetId
    });
    return new workflows_sdk_2.WorkflowResponse({ id: orderSetId }, {
        hooks: [orderSetCreatedHook]
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXQtYW5kLWNvbXBsZXRlLWNhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL2NhcnQvd29ya2Zsb3dzL3NwbGl0LWFuZC1jb21wbGV0ZS1jYXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFEQU1rQztBQUNsQyxxRUFBZ0Y7QUFDaEYsNERBU29DO0FBTXBDLDJEQUlnQztBQUVoQyxtREFBNEQ7QUFDNUQsdURBQTBEO0FBQzFELDZDQUFnRDtBQUVoRCxrREFBMEQ7QUFDMUQsMkRBQThFO0FBQzlFLG9DQUlpQjtBQUNqQixvQ0FLaUI7QUFNSixRQUFBLDRCQUE0QixHQUFHLElBQUEsOEJBQWMsRUFDeEQ7SUFDRSxJQUFJLEVBQUUseUJBQXlCO0lBQy9CLFVBQVUsRUFBRSxJQUFJO0NBQ2pCLEVBQ0QsVUFBVSxLQUF3QztJQUNoRCxNQUFNLGdCQUFnQixHQUFHLElBQUEsK0JBQWtCLEVBQUM7UUFDMUMsV0FBVyxFQUFFLFdBQVc7UUFDeEIsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQztRQUN6QixTQUFTLEVBQUU7WUFDVCxPQUFPLEVBQUU7Z0JBQ1AsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFO2FBQ2xCO1NBQ0Y7UUFDRCxJQUFJLEVBQUUsS0FBSztLQUNaLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFBO0lBRXRDLE1BQU0sUUFBUSxHQUFHLElBQUEsb0JBQUksRUFBQyxFQUFFLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxFQUFFLGdCQUFnQixFQUFFLEVBQUUsRUFBRTtRQUNuRSxPQUFPLENBQUMsZ0JBQWdCLENBQUE7SUFDMUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNYLE1BQU0sSUFBSSxHQUFHLElBQUEsK0JBQWtCLEVBQUM7WUFDOUIsV0FBVyxFQUFFLE1BQU07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