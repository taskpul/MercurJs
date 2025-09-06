import { NextFunction } from 'express'
import {
  MedusaRequest,
  MedusaResponse,
} from '@medusajs/framework'
import { TENANT_MODULE, TenantModuleService } from '@mercurjs/tenant'
import { asValue } from 'awilix'

/**
 * Resolves the tenant based on the request host and stores it on the request
 * context so that downstream handlers and services can access it.
 */
export async function resolveTenant(
  req: MedusaRequest,
  _res: MedusaResponse,
  next: NextFunction
) {
  const host = req.headers.host || ''
  const hostname = host.split(':')[0]
  const [slug] = hostname.split('.')

  if (!slug || slug === 'www' || slug === 'localhost') {
    return next()
  }

  try {
    const tenantService = req.scope.resolve<TenantModuleService>(TENANT_MODULE)
    const [tenant] = await tenantService.listTenants({ slug })

    if (tenant) {
      ;(req as any).tenant = tenant
      ;(req as any).tenant_id = tenant.id
      ;(req as any).tenantId = tenant.id

      if (req.scope && typeof req.scope.register === 'function') {
        req.scope.register({
          tenant: asValue(tenant),
          tenant_id: asValue(tenant.id),
          tenantId: asValue(tenant.id),
        })
      }
    }
  } catch (e) {
    // ignore errors and continue without tenant
  }

  next()
}
