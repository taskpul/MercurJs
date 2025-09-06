import { TenantScopedService } from '@mercurjs/framework'

import { Review } from './models/review'

class ReviewModuleService extends TenantScopedService({
  Review,
}) {}

export default ReviewModuleService
