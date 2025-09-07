import { defineLink } from '@medusajs/framework/utils'
import CustomerModule from '@medusajs/medusa/customer'

import ReviewModule from '@mercurjs/reviews'

export default defineLink(CustomerModule.linkable.customer, {
  // Cast as any as the module lacks typed linkables
  linkable: (ReviewModule as any).linkable.review,
  isList: true
})
