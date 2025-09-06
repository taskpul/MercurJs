"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20241207151814 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20241207151814 extends migrations_1.Migration {
    async up() {
        this.addSql('create table if not exists "order_set" ("id" text not null, "display_id" serial, "sales_channel_id" text not null, "cart_id" text not null, "customer_id" text null, "payment_collection_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "order_set_pkey" primary key ("id"));');
        this.addSql('CREATE INDEX IF NOT EXISTS "IDX_order_set_deleted_at" ON "order_set" (deleted_at) WHERE deleted_at IS NULL;');
    }
    async down() {
        this.addSql('drop table if exists "order_set" cascade;');
    }
}
exports.Migration20241207151814 = Migration20241207151814;
//# sourceMappingURL=Migration20241207151814.js.map