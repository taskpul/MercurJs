import { defineLink } from '@medusajs/framework/utils'
import ProductModule from '@medusajs/medusa/product'

import BrandModule from '@mercurjs/brand'

export default defineLink(
  {
    linkable: (ProductModule.linkable as any).product,
    isList: true
  },
  (BrandModule as any).linkable.brand
)
