import { AuthenticatedMedusaRequest, MedusaResponse } from '@medusajs/framework'
import { MedusaError } from '@medusajs/framework/utils'
import { TENANT_MODULE, TenantModuleService } from '@mercurjs/tenant'

import { VendorUpdateTenantSettingsType } from './validators'

export const GET = async (req: AuthenticatedMedusaRequest, res: MedusaResponse) => {
  const tenantService = req.scope.resolve<TenantModuleService>(TENANT_MODULE)
  const tenant = (req as any).tenant ?? (await tenantService.listTenants())[0]

  if (!tenant) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, 'Tenant not found')
  }

  res.json({ tenant })
}

export const POST = async (
  req: AuthenticatedMedusaRequest<VendorUpdateTenantSettingsType>,
  res: MedusaResponse
) => {
  const tenantService = req.scope.resolve<TenantModuleService>(TENANT_MODULE)
  const tenant = (req as any).tenant ?? (await tenantService.listTenants())[0]

  if (!tenant) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, 'Tenant not found')
  }

  const settings = { ...(tenant.settings || {}), ...req.validatedBody }

  const updated = await tenantService.updateTenants({
    id: tenant.id,
    settings
  })

  res.json({ tenant: updated })
}
