import { Migration } from "@mikro-orm/migrations"

export class Migration20250226000001 extends Migration {
  async up(): Promise<void> {
    this.addSql('ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "tenant_id" text;')
    this.addSql('CREATE INDEX IF NOT EXISTS "IDX_product_tenant_id" ON "product" (tenant_id);')
    this.addSql('UPDATE "product" SET "tenant_id" = (SELECT id FROM tenant LIMIT 1) WHERE tenant_id IS NULL;')
  }

  async down(): Promise<void> {
    this.addSql('ALTER TABLE "product" DROP COLUMN IF EXISTS "tenant_id";')
  }
}
