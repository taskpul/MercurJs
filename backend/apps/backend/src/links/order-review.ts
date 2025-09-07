import { defineLink } from '@medusajs/framework/utils'
import OrderModule from '@medusajs/medusa/order'

import ReviewModule from '@mercurjs/reviews'

export default defineLink(OrderModule.linkable.order, {
  // Cast to any for untyped linkable
  linkable: (ReviewModule as any).linkable.review,
  isList: true
})
