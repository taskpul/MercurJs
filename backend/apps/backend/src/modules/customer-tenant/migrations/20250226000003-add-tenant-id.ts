import { Migration } from "@mikro-orm/migrations"

export class Migration20250226000003 extends Migration {
  async up(): Promise<void> {
    this.addSql('ALTER TABLE "customer" ADD COLUMN IF NOT EXISTS "tenant_id" text;')
    this.addSql('CREATE INDEX IF NOT EXISTS "IDX_customer_tenant_id" ON "customer" (tenant_id);')
    this.addSql('UPDATE "customer" SET "tenant_id" = (SELECT id FROM tenant LIMIT 1) WHERE tenant_id IS NULL;')
  }

  async down(): Promise<void> {
    this.addSql('ALTER TABLE "customer" DROP COLUMN IF EXISTS "tenant_id";')
  }
}
