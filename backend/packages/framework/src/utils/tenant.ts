import { MedusaService } from "@medusajs/framework/utils"

/**
 * Tenant scoped service ensures that all read and write operations
 * are automatically filtered by the current tenant id. The tenant
 * id must be provided in the context object passed to the methods.
 */
export const TenantScopedService = (models: any) =>
  class extends MedusaService(models) {
    getTenant(context: any): string | undefined {
      return context?.tenant_id ?? context?.tenantId
    }

    async list(selector: any = {}, config: any = {}, context: any = {}) {
      const tenantId = this.getTenant(context)
      return (MedusaService.prototype as any).list.call(
        this,
        { ...selector, tenant_id: tenantId },
        config,
        context
      )
    }

    async retrieve(id: string, config: any = {}, context: any = {}) {
      const tenantId = this.getTenant(context)
      const filters = { ...(config?.filters || {}), tenant_id: tenantId }
      return (MedusaService.prototype as any).retrieve.call(
        this,
        id,
        { ...config, filters },
        context
      )
    }

    async create(data: any, context: any = {}) {
      const tenantId = this.getTenant(context)
      const applyTenant = (obj: any) => ({ ...obj, tenant_id: tenantId })
      const payload = Array.isArray(data) ? data.map(applyTenant) : applyTenant(data)
      return (MedusaService.prototype as any).create.call(
        this,
        payload,
        context
      )
    }
  }

/**
 * Higher order function that augments an existing service class so that
 * read and write operations are automatically scoped to the provided
 * tenant id. This is useful when extending core Medusa services.
 */
export const withTenantScope = <T extends new (...args: any[]) => any>(
  Base: T
) =>
  class extends Base {
    getTenant(context: any): string | undefined {
      return context?.tenant_id ?? context?.tenantId
    }

    async list(selector: any = {}, config: any = {}, context: any = {}) {
      const tenantId = this.getTenant(context)
      return super.list({ ...selector, tenant_id: tenantId }, config, context)
    }

    async retrieve(id: string, config: any = {}, context: any = {}) {
      const tenantId = this.getTenant(context)
      const filters = { ...(config?.filters || {}), tenant_id: tenantId }
      return super.retrieve(id, { ...config, filters }, context)
    }

    async create(data: any, context: any = {}) {
      const tenantId = this.getTenant(context)
      const applyTenant = (obj: any) => ({ ...obj, tenant_id: tenantId })
      const payload = Array.isArray(data) ? data.map(applyTenant) : applyTenant(data)
      return super.create(payload, context)
    }
  }
