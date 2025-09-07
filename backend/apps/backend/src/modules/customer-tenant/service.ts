import { withTenantScope } from "@mercurjs/framework"
import { CustomerModuleService as MedusaCustomerModuleService } from "@medusajs/customer/dist/services"

const CustomerModuleService = withTenantScope(MedusaCustomerModuleService)
export default CustomerModuleService
