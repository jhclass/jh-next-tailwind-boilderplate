import { Metadata } from 'next'
import TenantsClientPage from './TenantsClientPage'

export const metadata: Metadata = {
  title: 'Tenants',
  description:
    'This is Next.js Basic Table page for TailAdmin Tailwind CSS Admin Dashboard Template',
}

export default function BasicTables() {
  return <TenantsClientPage />
}
