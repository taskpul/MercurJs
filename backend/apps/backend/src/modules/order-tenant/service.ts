import { withTenantScope } from "@mercurjs/framework"
import { OrderModuleService as MedusaOrderModuleService } from "@medusajs/order/dist/services"

const OrderModuleService = withTenantScope(MedusaOrderModuleService)
export default OrderModuleService
