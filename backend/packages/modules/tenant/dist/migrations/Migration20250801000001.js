"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250801000001 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250801000001 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table if exists "tenant" add column if not exists "domain" text null, add column if not exists "primary_color" text null, add column if not exists "secondary_color" text null, add column if not exists "logo" text null;');
        this.addSql('alter table if exists "tenant" add constraint "tenant_domain_unique" unique ("domain");');
    }
    async down() {
        this.addSql('alter table if exists "tenant" drop constraint if exists "tenant_domain_unique";');
        this.addSql('alter table if exists "tenant" drop column if exists "domain";');
        this.addSql('alter table if exists "tenant" drop column if exists "primary_color";');
        this.addSql('alter table if exists "tenant" drop column if exists "secondary_color";');
        this.addSql('alter table if exists "tenant" drop column if exists "logo";');
    }
}
exports.Migration20250801000001 = Migration20250801000001;
//# sourceMappingURL=Migration20250801000001.js.map

