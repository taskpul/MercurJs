"use server"

import { sdk } from "../config"
import { cache } from "react"

export type TenantSettings = {
  settings?: {
    primary_color?: string
    secondary_color?: string
    logo?: string
    store_name?: string
    store_description?: string
  }
}

export const retrieveTenant = cache(async (slug: string): Promise<TenantSettings | null> => {
  if (!slug) return null

  return sdk.client
    .fetch<{ tenant: TenantSettings }>(`/store/tenant/${slug}`, {
      method: "GET",
      next: { revalidate: 60, tags: [`tenant-${slug}`] },
      cache: "force-cache",
    })
    .then(({ tenant }) => tenant)
    .catch(() => null)
})
