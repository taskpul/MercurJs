import { defineMiddlewares } from '@medusajs/medusa'

import { adminMiddlewares } from './admin/middlewares'
import { hooksMiddlewares } from './hooks/middlewares'
import { storeMiddlewares } from './store/middlewares'
import { vendorMiddlewares } from './vendor/middlewares'
import { resolveTenant } from '../shared/infra/http/middlewares/resolve-tenant'

export default defineMiddlewares({
  routes: [
    {
      matcher: /.*/,
      middlewares: [resolveTenant]
    },
    ...vendorMiddlewares,
    ...storeMiddlewares,
    ...adminMiddlewares,
    ...hooksMiddlewares
  ]
})
