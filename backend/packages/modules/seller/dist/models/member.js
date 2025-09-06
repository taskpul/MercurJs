"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Member = void 0;
const utils_1 = require("@medusajs/framework/utils");
const framework_1 = require("@mercurjs/framework");
const seller_1 = require("./seller");
exports.Member = utils_1.model.define("member", {
    id: utils_1.model.id({ prefix: "mem" }).primaryKey(),
    role: utils_1.model.enum(framework_1.MemberRole).default(framework_1.MemberRole.OWNER),
    name: utils_1.model.text().searchable(),
    email: utils_1.model.text().nullable(),
    bio: utils_1.model.text().searchable().nullable(),
    phone: utils_1.model.text().searchable().nullable(),
    photo: utils_1.model.text().nullable(),
    seller: utils_1.model.belongsTo(() => seller_1.Seller, { mappedBy: "members" }),
});
//# sourceMappingURL=member.js.map