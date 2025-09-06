import { TenantScopedService } from '@mercurjs/framework'

import { Brand } from './models/brand'

class BrandModuleService extends TenantScopedService({
  Brand
}) {}

export default BrandModuleService
