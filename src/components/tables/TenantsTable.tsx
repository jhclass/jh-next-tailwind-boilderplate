'use client'
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table'
import Badge from '../ui/badge/Badge'
import Pagination from './Pagination'
import { useRouter } from 'next/navigation'
import axios from 'axios'
interface TenantContact {
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

interface Tenant {
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
  tenantContacts?: TenantContact[]
  createdDateTimeUTC: string
  creatorUserId: string
  creatorUserName: string
  updatedDateTimeUTC: string
  updaterUserId: string
  updaterUserName: string
}

interface ItenantsData {
  success?: boolean
  status?: number
  totalCount?: number
  hasMore?: boolean
  error?: unknown // 필요하면 `error?: string | null;` 로 변경 가능
  data?: Tenant[]
}

export default function TanentsTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 3
  const router = useRouter()
  const [tenantsData, setTenantsData] = useState<ItenantsData | null>(null)
  const [isError, setIsError] = useState<unknown>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchtenantsAllData = async () => {
      try {
        const response = await axios.get('/data/tenants.json')

        if (response.status === 200 && response.data !== tenantsData) {
          setTenantsData(response.data)
          setLoading(false)
        }
      } catch (err) {
        console.error(err)
        setLoading(false)
        if (err instanceof Error) {
          setIsError(err.message)
        } else {
          setIsError('Unknown error occurred')
        }
      }
    }
    fetchtenantsAllData()
  }, [])
  const totalPages = tenantsData?.totalCount
    ? Math.ceil(tenantsData?.totalCount / ITEMS_PER_PAGE)
    : 1
  return loading ? (
    <div className="flex justify-center items-center py-10">
      <Badge>Loading...</Badge>
    </div>
  ) : (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1400px]">
          {/* ⬅️ 컬럼 추가로 너비 확장 */}
          <Table className="table-fixed w-full">
            {/* ⬅️ 테이블 레이아웃 고정 */}
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow className="h-[50px]">
                <TableCell isHeader className="w-[250px] px-5 py-3 text-start">
                  id
                </TableCell>
                <TableCell isHeader className="w-[200px] px-5 py-3 text-start">
                  Tenant name
                </TableCell>
                <TableCell isHeader className="w-[200px] px-5 py-3 text-start">
                  Activation
                </TableCell>
                <TableCell isHeader className="w-[250px] px-5 py-3 text-start">
                  Email
                </TableCell>
                <TableCell isHeader className="w-[250px] px-5 py-3 text-start">
                  Phone Number
                </TableCell>
                <TableCell isHeader className="w-[250px] px-5 py-3 text-start">
                  Created On {/* ⬅️ 새 컬럼 추가 */}
                </TableCell>
                <TableCell isHeader className="w-[250px] px-5 py-3 text-start">
                  Modified On {/* ⬅️ 새 컬럼 추가 */}
                </TableCell>
              </TableRow>
            </TableHeader>
            {/* Table Body */}

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tenantsData?.data?.map((order: Tenant) => (
                <TableRow
                  key={order.id}
                  onClick={() => router.push(`/tenants/detail/${order.id}`)}
                  className="h-[60px] cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <TableCell className="px-5 py-4">{order.id}</TableCell>
                  <TableCell className="px-5 py-4">
                    {order.tenantName}
                  </TableCell>
                  <TableCell className="px-5 py-4">
                    <div className="flex -space-x-2">
                      <Badge
                        size="sm"
                        color={order.isActive ? 'success' : 'error'}
                      >
                        {order.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-4">
                    {order?.emailAddress}
                  </TableCell>
                  <TableCell className="px-5 py-4">
                    {order.phoneNumber}
                  </TableCell>
                  <TableCell className="px-5 py-4">
                    {order.createdDateTimeUTC}
                  </TableCell>
                  {/* ⬅️ 새 데이터 추가 */}
                  <TableCell className="px-5 py-4">
                    {order.updatedDateTimeUTC}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex justify-end p-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  )
}
