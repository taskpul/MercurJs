import { Module, Modules } from "@medusajs/framework/utils"
import OrderModuleService from "./service"

export default Module(Modules.ORDER, {
  service: OrderModuleService,
})
