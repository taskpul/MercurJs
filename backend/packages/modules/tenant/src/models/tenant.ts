import { model } from "@medusajs/framework/utils";

export const Tenant = model.define("tenant", {
  id: model.id().primaryKey(),
  slug: model.text().unique(),
  settings: model.json().nullable(),
});
