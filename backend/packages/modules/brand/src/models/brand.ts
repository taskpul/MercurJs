import { model } from '@medusajs/framework/utils'

export const Brand = model.define('brand', {
  id: model.id().primaryKey(),
  tenant_id: model.text().index(),
  name: model.text()
})
