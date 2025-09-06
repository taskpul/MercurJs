import { defineLink } from '@medusajs/framework/utils'
import ProductModule from '@medusajs/medusa/product'

import TenantModule from '@mercurjs/tenant'

export default defineLink(TenantModule.linkable.tenant, {
  linkable: ProductModule.linkable.product,
  isList: true,
})
