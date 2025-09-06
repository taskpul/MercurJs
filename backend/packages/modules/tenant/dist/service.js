"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const tenant_1 = require("./models/tenant");
class TenantModuleService extends (0, utils_1.MedusaService)({
    Tenant: tenant_1.Tenant,
}) {
}
exports.default = TenantModuleService;
//# sourceMappingURL=service.js.map