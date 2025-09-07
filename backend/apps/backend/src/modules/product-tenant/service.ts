import { withTenantScope } from "@mercurjs/framework"
import MedusaProductModuleService from "@medusajs/product/dist/services/product-module-service"

const ProductModuleService = withTenantScope(MedusaProductModuleService)
export default ProductModuleService
