"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withTenantScope = exports.TenantScopedService = void 0;
const utils_1 = require("@medusajs/framework/utils");
/**
 * Tenant scoped service ensures that all read and write operations
 * are automatically filtered by the current tenant id. The tenant
 * id must be provided in the context object passed to the methods.
 */
const TenantScopedService = (models) => class extends (0, utils_1.MedusaService)(models) {
    getTenant(context) {
        return context?.tenant_id ?? context?.tenantId;
    }
    async list(selector = {}, config = {}, context = {}) {
        const tenantId = this.getTenant(context);
        return utils_1.MedusaService.prototype.list.call(this, { ...selector, tenant_id: tenantId }, config, context);
    }
    async retrieve(id, config = {}, context = {}) {
        const tenantId = this.getTenant(context);
        const filters = { ...(config?.filters || {}), tenant_id: tenantId };
        return utils_1.MedusaService.prototype.retrieve.call(this, id, { ...config, filters }, context);
    }
    async create(data, context = {}) {
        const tenantId = this.getTenant(context);
        const applyTenant = (obj) => ({ ...obj, tenant_id: tenantId });
        const payload = Array.isArray(data) ? data.map(applyTenant) : applyTenant(data);
        return utils_1.MedusaService.prototype.create.call(this, payload, context);
    }
};
exports.TenantScopedService = TenantScopedService;
/**
 * Higher order function that augments an existing service class so that
 * read and write operations are automatically scoped to the provided
 * tenant id. This is useful when extending core Medusa services.
 */
const withTenantScope = (Base) => class extends Base {
    getTenant(context) {
        return context?.tenant_id ?? context?.tenantId;
    }
    async list(selector = {}, config = {}, context = {}) {
        const tenantId = this.getTenant(context);
        return super.list({ ...selector, tenant_id: tenantId }, config, context);
    }
    async retrieve(id, config = {}, context = {}) {
        const tenantId = this.getTenant(context);
        const filters = { ...(config?.filters || {}), tenant_id: tenantId };
        return super.retrieve(id, { ...config, filters }, context);
    }
    async create(data, context = {}) {
        const tenantId = this.getTenant(context);
        const applyTenant = (obj) => ({ ...obj, tenant_id: tenantId });
        const payload = Array.isArray(data) ? data.map(applyTenant) : applyTenant(data);
        return super.create(payload, context);
    }
};
exports.withTenantScope = withTenantScope;
//# sourceMappingURL=tenant.js.map