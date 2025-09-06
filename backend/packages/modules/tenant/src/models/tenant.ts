import { model } from "@medusajs/framework/utils";

export const Tenant = model.define("tenant", {
  id: model.id().primaryKey(),
  slug: model.text().unique(),
  domain: model.text().unique().nullable(),
  primary_color: model.text().nullable(),
  secondary_color: model.text().nullable(),
  logo: model.text().nullable(),
  settings: model.json().nullable(),
});
