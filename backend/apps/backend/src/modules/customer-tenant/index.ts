import { Module, Modules } from "@medusajs/framework/utils"
import CustomerModuleService from "./service"

export default Module(Modules.CUSTOMER, {
  service: CustomerModuleService,
})
