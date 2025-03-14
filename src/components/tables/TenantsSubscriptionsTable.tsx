'use client'
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table'
import { useModal } from '@/hooks/useModal'
import { Modal } from '../ui/modal'
import Label from '../form/Label'
import Input from '../form/input/InputField'
import Button from '../ui/button/Button'
import Badge from '../ui/badge/Badge'
import Image from 'next/image'
import Pagination from './Pagination'
import { useRouter } from 'next/navigation'
import { subscribe } from 'diagnostics_channel'
import axios from 'axios'

interface Order {
  id: number
  user: {
    image: string
    name: string
    role: string
  }
  projectName: string
  team: {
    images: string[]
  }
  status: string
  budget: string
}
const ITEMS_PER_PAGE = 3 // 한 페이지에 보여줄 개수
// Define the table data using the interface
const tableData: Order[] = [
  {
    id: 1,
    user: {
      image: '/images/user/user-17.jpg',
      name: 'Lindsey Curtis',
      role: 'Web Designer',
    },
    projectName: 'Agency Website',
    team: {
      images: [
        '/images/user/user-22.jpg',
        '/images/user/user-23.jpg',
        '/images/user/user-24.jpg',
      ],
    },
    budget: '3.9K',
    status: 'Active',
  },
  {
    id: 2,
    user: {
      image: '/images/user/user-18.jpg',
      name: 'Kaiya George',
      role: 'Project Manager',
    },
    projectName: 'Technology',
    team: {
      images: ['/images/user/user-25.jpg', '/images/user/user-26.jpg'],
    },
    budget: '24.9K',
    status: 'Pending',
  },
  {
    id: 3,
    user: {
      image: '/images/user/user-17.jpg',
      name: 'Zain Geidt',
      role: 'Content Writing',
    },
    projectName: 'Blog Writing',
    team: {
      images: ['/images/user/user-27.jpg'],
    },
    budget: '12.7K',
    status: 'Active',
  },
  {
    id: 4,
    user: {
      image: '/images/user/user-20.jpg',
      name: 'Abram Schleifer',
      role: 'Digital Marketer',
    },
    projectName: 'Social Media',
    team: {
      images: [
        '/images/user/user-28.jpg',
        '/images/user/user-29.jpg',
        '/images/user/user-30.jpg',
      ],
    },
    budget: '2.8K',
    status: 'Cancel',
  },
  {
    id: 5,
    user: {
      image: '/images/user/user-21.jpg',
      name: 'Carla George',
      role: 'Front-end Developer',
    },
    projectName: 'Website',
    team: {
      images: [
        '/images/user/user-31.jpg',
        '/images/user/user-32.jpg',
        '/images/user/user-33.jpg',
      ],
    },
    budget: '4.5K',
    status: 'Active',
  },
]

// 가격 항목 정보
export interface PriceItem {
  itemTypeEnum: string
  itemValue: number
}

// 에디션 정보
export interface EditionRef {
  editionId: string
  editionName: string
}

// 개별 구독 정보
export interface Subscription {
  id: string
  systemSourceEnum: string
  subscriptionStatusDisplayName: string
  tenantId: string
  subscribedDateTimeUTC: string
  subscriberUserId: string
  subscriberUserName: string
  subscriptionStatusEnum: string
  effectiveFromDateTimeUTC: string
  effectiveToDateTimeUTC: string
  unsubscribedDateTimeUTC: string | null
  unsubscriberUserId: string | null
  priceItems: PriceItem[]
  isTrial: boolean
  isRrecurringPayment: boolean
  editionRef: EditionRef
  createdDateTimeUTC: string
  creatorUserId: string
  creatorUserName: string
  updatedDateTimeUTC: string
  updaterUserId: string
  updaterUserName: string
}

// API 응답 구조
export interface SubscriptionResponse {
  success: boolean
  status: number
  totalCount: number
  hasMore: boolean
  error: string | null
  data: Subscription[]
}

export default function TanentsSubscriptionsTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedData = tableData.slice(startIndex, endIndex)
  const totalPages = Math.ceil(tableData.length / ITEMS_PER_PAGE)
  const { isOpen, openModal, closeModal } = useModal()
  const [subscriptionsData, setSubscriptionsData] =
    useState<SubscriptionResponse | null>(null)
  useEffect(() => {
    const fetchTenantsDetailSubscriptions = async () => {
      try {
        const response = await axios.get('/data/subscriptions.json')
        //console.log('cons', response)
        if (response.status === 200 && response?.data !== subscriptionsData) {
          setSubscriptionsData(response.data)
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    }
    fetchTenantsDetailSubscriptions()
  }, [])
  console.log(subscriptionsData)
  const handleSave = () => {
    // Handle save logic here
    console.log('Saving changes...')
    closeModal()
  }

  return (
    <div className="overflow-hidden mt-4 rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1300px]">
          {/* ⬅️ 컬럼 추가로 너비 확장 */}
          <Table className="table-fixed w-full">
            {/* ⬅️ 테이블 레이아웃 고정 */}
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow className="h-[50px]">
                <TableCell isHeader className="w-[200px] px-5 py-3 text-start">
                  Plan
                </TableCell>
                <TableCell isHeader className="w-[250px] px-5 py-3 text-start">
                  Effective Period
                </TableCell>
                <TableCell isHeader className="w-[100px] px-5 py-3 text-start">
                  Validity
                </TableCell>
                <TableCell isHeader className="w-[50px] px-5 py-3 text-start">
                  Trial
                </TableCell>
                <TableCell isHeader className="w-[250px] px-5 py-3 text-start">
                  Subscribed On
                </TableCell>
                <TableCell isHeader className="w-[200px] px-5 py-3 text-start">
                  Subscribed By
                </TableCell>
                <TableCell isHeader className="w-[250px] px-5 py-3 text-start">
                  Unsubscribed On
                </TableCell>
                <TableCell isHeader className="w-[250px] px-5 py-3 text-start">
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>
            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {subscriptionsData?.data.map(order => (
                <TableRow
                  key={order.id}
                  className="h-[60px] cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <TableCell className="px-5 py-4">
                    {order?.editionRef?.editionName}
                  </TableCell>
                  <TableCell className="px-5 py-4">
                    {order?.effectiveFromDateTimeUTC} ~<br />
                    {order?.effectiveToDateTimeUTC}
                  </TableCell>
                  <TableCell className="px-5 py-4">
                    <Badge
                      size="sm"
                      color="error"
                      // color={
                      //   order.status === 'Active'
                      //     ? 'success'
                      //     : order.status === 'Pending'
                      //       ? 'warning'
                      //       : 'error'
                      // }
                    >
                      {'Expired'}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-5 py-4">X</TableCell>
                  <TableCell className="px-5 py-4">
                    {order?.subscribedDateTimeUTC}
                  </TableCell>
                  <TableCell className="px-5 py-4">
                    {order?.subscriberUserName}
                  </TableCell>
                  {/* ⬅️ 새 데이터 추가 */}
                  <TableCell className="px-5 py-4">
                    {order?.unsubscribedDateTimeUTC === null
                      ? '-'
                      : order?.unsubscribedDateTimeUTC}
                  </TableCell>
                  <TableCell className="px-5 py-4">
                    <button
                      onClick={openModal}
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                    >
                      <svg
                        className="stroke-current"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 2C5.44772 2 5 2.44772 5 3V21C5 21.5523 5.44772 22 6 22H18C18.5523 22 19 21.5523 19 21V8.82843C19 8.29799 18.7893 7.78929 18.4142 7.41421L14.5858 3.58579C14.2107 3.21071 13.702 3 13.1716 3H6Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 12H15"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 16H15"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13 3V7C13 7.55228 13.4477 8 14 8H18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      View
                    </button>
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
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Personal Information
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your details to keep your profile up-to-date.
            </p>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div>
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Social Links
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                    <Label>Facebook</Label>
                    <Input
                      type="text"
                      defaultValue="https://www.facebook.com/PimjoHQ"
                    />
                  </div>

                  <div>
                    <Label>X.com</Label>
                    <Input type="text" defaultValue="https://x.com/PimjoHQ" />
                  </div>

                  <div>
                    <Label>Linkedin</Label>
                    <Input
                      type="text"
                      defaultValue="https://www.linkedin.com/company/pimjo"
                    />
                  </div>

                  <div>
                    <Label>Instagram</Label>
                    <Input
                      type="text"
                      defaultValue="https://instagram.com/PimjoHQ"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Personal Information
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <Label>First Name</Label>
                    <Input type="text" defaultValue="Musharof" />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Last Name</Label>
                    <Input type="text" defaultValue="Chowdhury" />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Email Address</Label>
                    <Input type="text" defaultValue="randomuser@pimjo.com" />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Phone</Label>
                    <Input type="text" defaultValue="+09 363 398 46" />
                  </div>

                  <div className="col-span-2">
                    <Label>Bio</Label>
                    <Input type="text" defaultValue="Team Manager" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}
