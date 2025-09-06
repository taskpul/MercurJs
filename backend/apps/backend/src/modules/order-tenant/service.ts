import { withTenantScope } from "@mercurjs/framework"
import { OrderModuleService as MedusaOrderModuleService } from "@medusajs/medusa/dist/modules/order"

const OrderModuleService = withTenantScope(MedusaOrderModuleService)
export default OrderModuleService
