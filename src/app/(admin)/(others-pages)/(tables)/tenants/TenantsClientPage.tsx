'use client'

import ComponentCard from '@/components/common/ComponentCard'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import TanentsTable from '@/components/tables/TenantsTable'
import { useTranslations } from 'next-intl' // 필요하면 추가

export default function TenantsClientPage() {
  const t = useTranslations() // 번역 사용 예시

  return (
    <div>
      <PageBreadcrumb pageTitle={`Tenants : ${t('greeting')}`} />
      <div className="space-y-6">
        <ComponentCard title="Tenants Table">
          <TanentsTable />
        </ComponentCard>
      </div>
    </div>
  )
}
