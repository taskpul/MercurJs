"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const seller_order_1 = __importDefault(require("../../links/seller-order"));
const workflows_1 = require("../cart/workflows");
const workflows_2 = require("../commission/workflows");
workflows_1.splitAndCompleteCartWorkflow.hooks.orderSetCreated(async ({ orderSetId }, { container }) => {
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: [set] } = await query.graph({
        entity: 'order_set',
        fields: ['orders.id'],
        filters: {
            id: orderSetId
        }
    });
    const ordersCreated = set.orders.map((o) => o.id);
    for (const order_id of ordersCreated) {
        const { data: [seller] } = await query.graph({
            entity: seller_order_1.default.entryPoint,
            fields: ['seller_id'],
            filters: {
                order_id: order_id
            }
        });
        if (!seller) {
            return;
        }
        await workflows_2.calculateCommissionWorkflow.run({
            input: {
                order_id: order_id,
                seller_id: seller.seller_id
            },
            container
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItc2V0LWNyZWF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL2hvb2tzL29yZGVyLXNldC1jcmVhdGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscURBQXFFO0FBRXJFLDRFQUFrRDtBQUNsRCxpREFBZ0U7QUFDaEUsdURBQXFFO0FBRXJFLHdDQUE0QixDQUFDLEtBQUssQ0FBQyxlQUFlLENBQ2hELEtBQUssRUFBRSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUN0QyxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRWhFLE1BQU0sRUFDSixJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFDWixHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztRQUNwQixNQUFNLEVBQUUsV0FBVztRQUNuQixNQUFNLEVBQUUsQ0FBQyxXQUFXLENBQUM7UUFDckIsT0FBTyxFQUFFO1lBQ1AsRUFBRSxFQUFFLFVBQVU7U0FDZjtLQUNGLENBQUMsQ0FBQTtJQUVGLE1BQU0sYUFBYSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7SUFFakQsS0FBSyxNQUFNLFFBQVEsSUFBSSxhQUFhLEVBQUUsQ0FBQztRQUNyQyxNQUFNLEVBQ0osSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQ2YsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDcEIsTUFBTSxFQUFFLHNCQUFXLENBQUMsVUFBVTtZQUM5QixNQUFNLEVBQUUsQ0FBQyxXQUFXLENBQUM7WUFDckIsT0FBTyxFQUFFO2dCQUNQLFFBQVEsRUFBRSxRQUFRO2FBQ25CO1NBQ0YsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ1osT0FBTTtRQUNSLENBQUM7UUFFRCxNQUFNLHVDQUEyQixDQUFDLEdBQUcsQ0FBQztZQUNwQyxLQUFLLEVBQUU7Z0JBQ0wsUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLFNBQVMsRUFBRSxNQUFNLENBQUMsU0FBUzthQUM1QjtZQUNELFNBQVM7U0FDVixDQUFDLENBQUE7SUFDSixDQUFDO0FBQ0gsQ0FBQyxDQUNGLENBQUEifQ==