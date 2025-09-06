import { model } from '@medusajs/framework/utils'

export const Review = model.define('review', {
  id: model.id({ prefix: 'rev' }).primaryKey(),
  tenant_id: model.text().index(),
  reference: model.enum(['product', 'seller']),
  rating: model.number(),
  customer_note: model.text().nullable(),
  seller_note: model.text().nullable()
})
