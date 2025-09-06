import { defineLink } from '@medusajs/framework/utils'
import OrderModule from '@medusajs/medusa/order'

import TenantModule from '@mercurjs/tenant'

export default defineLink(TenantModule.linkable.tenant, {
  linkable: OrderModule.linkable.order,
  isList: true,
})
