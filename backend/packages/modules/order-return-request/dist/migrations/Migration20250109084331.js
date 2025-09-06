"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250109084331 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250109084331 extends migrations_1.Migration {
    async up() {
        this.addSql('create table if not exists "order_return_request" ("id" text not null, "customer_id" text not null, "customer_note" text not null, "vendor_reviewer_id" text null, "vendor_reviewer_note" text null, "vendor_review_date" timestamptz null, "admin_reviewer_id" text null, "admin_reviewer_note" text null, "admin_review_date" timestamptz null, "status" text check ("status" in (\'pending\', \'refunded\', \'withdrawn\', \'escalated\', \'canceled\')) not null default \'pending\', "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "order_return_request_pkey" primary key ("id"));');
        this.addSql('CREATE INDEX IF NOT EXISTS "IDX_order_return_request_deleted_at" ON "order_return_request" (deleted_at) WHERE deleted_at IS NULL;');
        this.addSql('create table if not exists "order_return_request_line_item" ("id" text not null, "line_item_id" text not null, "quantity" integer not null, "return_request_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "order_return_request_line_item_pkey" primary key ("id"));');
        this.addSql('CREATE INDEX IF NOT EXISTS "IDX_order_return_request_line_item_return_request_id" ON "order_return_request_line_item" (return_request_id) WHERE deleted_at IS NULL;');
        this.addSql('CREATE INDEX IF NOT EXISTS "IDX_order_return_request_line_item_deleted_at" ON "order_return_request_line_item" (deleted_at) WHERE deleted_at IS NULL;');
        this.addSql('alter table if exists "order_return_request_line_item" add constraint "order_return_request_line_item_return_request_id_foreign" foreign key ("return_request_id") references "order_return_request" ("id") on update cascade;');
    }
    async down() {
        this.addSql('alter table if exists "order_return_request_line_item" drop constraint if exists "order_return_request_line_item_return_request_id_foreign";');
        this.addSql('drop table if exists "order_return_request" cascade;');
        this.addSql('drop table if exists "order_return_request_line_item" cascade;');
    }
}
exports.Migration20250109084331 = Migration20250109084331;
//# sourceMappingURL=Migration20250109084331.js.map