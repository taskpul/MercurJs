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

  if (!hostname || hostname === 'localhost') {
    return next()
  }

  try {
    const tenantService = req.scope.resolve<TenantModuleService>(TENANT_MODULE)

    // Attempt to match the incoming hostname against a tenant's domain
    let [tenant] = await tenantService.listTenants({ domain: hostname })

    // Fallback to resolving by slug (first subdomain) when no domain match exists
    if (!tenant) {
      const [slug] = hostname.split('.')
      if (slug && slug !== 'www') {
        ;[tenant] = await tenantService.listTenants({ slug })
      }
    }

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
