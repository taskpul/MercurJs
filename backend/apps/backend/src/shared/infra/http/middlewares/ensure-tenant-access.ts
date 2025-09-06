import { NextFunction } from 'express'
import { AuthenticatedMedusaRequest } from '@medusajs/framework/http'

/**
 * Ensures the authenticated vendor admin only accesses
 * resources belonging to their tenant. If the tenant id
 * encoded in the auth context doesn't match the tenant
 * resolved from the request, a 403 is returned.
 */
export function ensureTenantAccess() {
  return (req: AuthenticatedMedusaRequest, res, next: NextFunction) => {
    const authTenant = (req.auth_context as any)?.tenant_id
    const requestTenant = (req as any).tenant_id

    if (authTenant && requestTenant && authTenant !== requestTenant) {
      res.status(403).json({ message: 'Unauthorized tenant access' })
      return
    }

    return next()
  }
}
