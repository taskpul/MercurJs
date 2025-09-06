import { TenantScopedService } from "@mercurjs/framework";

import { Request } from "./models";

class RequestsModuleService extends TenantScopedService({
  Request,
}) {}

export default RequestsModuleService;
