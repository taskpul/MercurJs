import { defineLink } from '@medusajs/framework/utils'

import RequestsModule from '@mercurjs/requests'
import SellerModule from '@mercurjs/seller'

export default defineLink(SellerModule.linkable.seller, {
  linkable: (RequestsModule as any).linkable.request,
  isList: true
})
