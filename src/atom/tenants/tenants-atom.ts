'use client'
import { atom } from 'recoil'

export interface TenantContact {
  id: string
  fullName: string
  firstName: string
  lastName: string
  phoneNumber: string
  invoiceEmailAddress: string
  contactTypeEnum: string
  contactTypeDisplayName: string
  fullAddress: string
  zipCode: string
  city: string
  country: string
}

export interface TenantData {
  id: string
  tenantName: string
  isActive: boolean
  phoneNumber: string
  websiteUrl: string
  emailAddress: string
  fullAddress: string
  region: string | null
  district: string | null
  city: string
  address1Street: string
  address2House: string | null
  zipCode: string
  tenantContacts: TenantContact[]
  createdDateTimeUTC: string
  creatorUserId: string
  creatorUserName: string
  updatedDateTimeUTC: string
  updaterUserId: string
  updaterUserName: string
}

export interface TenantResponse {
  success: boolean
  status: number
  totalCount: number | null
  hasMore: boolean | null
  error: string | null
  data: TenantData
}
export const tenantsIdDataState = atom<TenantResponse | null>({
  key: 'tenantsIdDataState',
  default: null,
})
