import { defineLink } from '@medusajs/framework/utils'
import CustomerModule from '@medusajs/medusa/customer'

import TenantModule from '@mercurjs/tenant'

export default defineLink(TenantModule.linkable.tenant, {
  linkable: CustomerModule.linkable.customer,
  isList: true,
})
