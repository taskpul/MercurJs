import { MedusaService } from "@medusajs/framework/utils";

import { Tenant } from "./models/tenant";

class TenantModuleService extends MedusaService({
  Tenant,
}) {
  async updateTenant(
    id: string,
    data: {
      domain?: string
      primary_color?: string
      secondary_color?: string
      logo?: string
      settings?: Record<string, unknown>
    }
  ) {
    return await this.updateTenants({ id, ...data })
  }
}

export default TenantModuleService;
