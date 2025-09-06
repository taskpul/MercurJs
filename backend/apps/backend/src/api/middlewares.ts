import { defineMiddlewares } from '@medusajs/medusa'

import { adminMiddlewares } from './admin/middlewares'
import { hooksMiddlewares } from './hooks/middlewares'
import { storeMiddlewares } from './store/middlewares'
import { vendorMiddlewares } from './vendor/middlewares'
import { resolveTenant } from '../shared/infra/http/middlewares/resolve-tenant'
import {
  filterByTenantId,
  ensureTenantAccess,
} from '../shared/infra/http/middlewares'

export default defineMiddlewares({
  routes: [
    {
      matcher: '/vendor*',
      middlewares: [resolveTenant, ensureTenantAccess(), filterByTenantId()],
    },
    {
      matcher: '/store*',
      middlewares: [resolveTenant, ensureTenantAccess(), filterByTenantId()],
    },
    ...vendorMiddlewares,
    ...storeMiddlewares,
    ...adminMiddlewares,
    ...hooksMiddlewares
  ]
})
