// lib/validation/tenantIdData.ts
import { z } from 'zod'

export const TenantContact = z.object({
  id: z.string(),
  fullName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  invoiceEmailAddress: z.string().email(),
  contactTypeEnum: z.string(),
  contactTypeDisplayName: z.string(),
  fullAddress: z.string(),
  zipCode: z.string(),
  city: z.string(),
  country: z.string(),
})

export const TenantId = z.object({
  id: z.string(),
  tenantName: z.string(),
  isActive: z.boolean(),
  phoneNumber: z.string(),
  websiteUrl: z.string().url(),
  emailAddress: z.string().email(),
  fullAddress: z.string(),
  region: z.string().nullable(),
  district: z.string().nullable(),
  city: z.string(),
  address1Street: z.string(),
  address2House: z.string().nullable(),
  zipCode: z.string(),
  tenantContacts: z.array(TenantContact),
  createdDateTimeUTC: z.string().datetime(),
  creatorUserId: z.string(),
  creatorUserName: z.string(),
  updatedDateTimeUTC: z.string().datetime(),
  updaterUserId: z.string(),
  updaterUserName: z.string(),
})

export const TenantIdAll = z.object({
  success: z.boolean(),
  status: z.number(),
  totalCount: z.number().nullable(),
  hasMore: z.boolean().nullable(),
  error: z.any().nullable(), // or refine further if needed
  data: TenantId,
})
