import { withTenantScope } from "@mercurjs/framework"
import { CustomerModuleService as MedusaCustomerModuleService } from "@medusajs/medusa/dist/modules/customer"

const CustomerModuleService = withTenantScope(MedusaCustomerModuleService)
export default CustomerModuleService
