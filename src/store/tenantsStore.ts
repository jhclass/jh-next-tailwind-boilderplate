'use client'

import { set } from 'react-hook-form'
import { create } from 'zustand'

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

// ✅ Zustand 스토어 정의
interface TenantStoreState {
  tenantsIdData: TenantResponse | null
  setTenantsIdData: (data: TenantResponse | null) => void
  reset: () => void
}

export const useTenantsStore = create<TenantStoreState>(set => ({
  tenantsIdData: null,
  setTenantsIdData: data => set({ tenantsIdData: data }),
  reset: () => set({ tenantsIdData: null }),
}))
