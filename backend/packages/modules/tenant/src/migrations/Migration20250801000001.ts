import { Migration } from '@mikro-orm/migrations'

export class Migration20250801000001 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table if exists "tenant" add column if not exists "domain" text null, add column if not exists "primary_color" text null, add column if not exists "secondary_color" text null, add column if not exists "logo" text null;'
    )
    this.addSql(
      'alter table if exists "tenant" add constraint "tenant_domain_unique" unique ("domain");'
    )
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table if exists "tenant" drop constraint if exists "tenant_domain_unique";'
    )
    this.addSql(
      'alter table if exists "tenant" drop column if exists "domain";'
    )
    this.addSql(
      'alter table if exists "tenant" drop column if exists "primary_color";'
    )
    this.addSql(
      'alter table if exists "tenant" drop column if exists "secondary_color";'
    )
    this.addSql(
      'alter table if exists "tenant" drop column if exists "logo";'
    )
  }
}
