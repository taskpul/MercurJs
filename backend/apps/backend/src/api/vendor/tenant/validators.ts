import { z } from 'zod'

export const colorRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/

export type VendorUpdateTenantSettingsType = z.infer<typeof VendorUpdateTenantSettings>

export const VendorUpdateTenantSettings = z
  .object({
    logo: z.string().url().optional(),
    primary_color: z.string().regex(colorRegex).optional(),
    secondary_color: z.string().regex(colorRegex).optional(),
    store_name: z.string().optional(),
    store_description: z.string().optional()
  })
  .strict()
