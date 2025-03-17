import ComponentCard from '@/components/common/ComponentCard'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import TanentsTable from '@/components/tables/TenantsTable'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Tenants',
  description:
    'This is Next.js Basic Table  page for TailAdmin  Tailwind CSS Admin Dashboard Template',
  // other metadata
}

export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Tenants" />
      <div className="space-y-6">
        <ComponentCard title="Tenants Table">
          <TanentsTable />
        </ComponentCard>
      </div>
    </div>
  )
}
