import { Migration } from "@mikro-orm/migrations"

export class Migration20250226000002 extends Migration {
  async up(): Promise<void> {
    this.addSql('ALTER TABLE "order" ADD COLUMN IF NOT EXISTS "tenant_id" text;')
    this.addSql('CREATE INDEX IF NOT EXISTS "IDX_order_tenant_id" ON "order" (tenant_id);')
    this.addSql('UPDATE "order" SET "tenant_id" = (SELECT id FROM tenant LIMIT 1) WHERE tenant_id IS NULL;')
  }

  async down(): Promise<void> {
    this.addSql('ALTER TABLE "order" DROP COLUMN IF EXISTS "tenant_id";')
  }
}
