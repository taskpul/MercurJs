import { withTenantScope } from "@mercurjs/framework"
import { ProductModuleService as MedusaProductModuleService } from "@medusajs/product"

const ProductModuleService = withTenantScope(MedusaProductModuleService)
export default ProductModuleService
