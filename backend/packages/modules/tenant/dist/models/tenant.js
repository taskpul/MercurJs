"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tenant = void 0;
const utils_1 = require("@medusajs/framework/utils");
exports.Tenant = utils_1.model.define("tenant", {
    id: utils_1.model.id().primaryKey(),
    slug: utils_1.model.text().unique(),
    settings: utils_1.model.json().nullable(),
});
//# sourceMappingURL=tenant.js.map