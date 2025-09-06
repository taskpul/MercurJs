"use server"

import { sdk } from "../config"
import { cache } from "react"

export type Tenant = {
  domain?: string
  primary_color?: string
  secondary_color?: string
  logo?: string
  settings?: {
    store_name?: string
    store_description?: string
  }
}

export const retrieveTenant = cache(async (slug: string): Promise<Tenant | null> => {
  if (!slug) return null

  return sdk.client
    .fetch<{ tenant: Tenant }>(`/store/tenant/${slug}`, {
      method: "GET",
      next: { revalidate: 60, tags: [`tenant-${slug}`] },
      cache: "force-cache",
    })
    .then(({ tenant }) => tenant)
    .catch(() => null)
})
