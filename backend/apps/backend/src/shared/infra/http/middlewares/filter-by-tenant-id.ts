import { NextFunction } from 'express'

import { AuthenticatedMedusaRequest } from '@medusajs/framework/http'

/**
 * @desc Adds the resolved tenant id to the filterable fields so that
 * resources are automatically scoped to the current tenant.
 */
export function filterByTenantId() {
  return (req: AuthenticatedMedusaRequest, _res, next: NextFunction) => {
    const tenantId = (req as any).tenant_id

    if (tenantId) {
      req.filterableFields.tenant_id = tenantId
    }

    return next()
  }
}

