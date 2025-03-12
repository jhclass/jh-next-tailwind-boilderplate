'use client'
import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table'
import { useModal } from '@/hooks/useModal'
import { Modal } from '../ui/modal'
import Label from '../form/Label'
import Input from '../form/input/InputField'
import Button from '../ui/button/Button'
import Badge from '../ui/badge/Badge'
import Image from 'next/image'
import Pagination from './Pagination'

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

export default function TanentsContactsTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedData = tableData.slice(startIndex, endIndex)
  const totalPages = Math.ceil(tableData.length / ITEMS_PER_PAGE)

  const { isOpen, openModal, closeModal } = useModal()
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
                  User
                </TableCell>
                <TableCell isHeader className="w-[160px] px-5 py-3 text-start">
                  Project Name
                </TableCell>
                <TableCell isHeader className="w-[200px] px-5 py-3 text-start">
                  Team
                </TableCell>
                <TableCell isHeader className="w-[120px] px-5 py-3 text-start">
                  Status
                </TableCell>
                <TableCell isHeader className="w-[120px] px-5 py-3 text-start">
                  Budget
                </TableCell>
                <TableCell isHeader className="w-[140px] px-5 py-3 text-start">
                  Deadline {/* ⬅️ 새 컬럼 추가 */}
                </TableCell>
                <TableCell isHeader className="w-[120px] px-5 py-3 text-start">
                  Priority {/* ⬅️ 새 컬럼 추가 */}
                </TableCell>
              </TableRow>
            </TableHeader>
            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {paginatedData.map(order => (
                <TableRow
                  key={order.id}
                  className="h-[60px] cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <TableCell className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Image
                        width={40}
                        height={40}
                        src={order.user.image}
                        alt={order.user.name}
                      />
                      <div>
                        <span className="block font-medium">
                          {order.user.name}
                        </span>
                        <span className="block text-sm text-gray-500">
                          {order.user.role}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-4">
                    {order.projectName}
                  </TableCell>
                  <TableCell className="px-5 py-4">
                    <div className="flex -space-x-2">
                      {order.team.images.map((img, idx) => (
                        <Image
                          key={idx}
                          width={24}
                          height={24}
                          src={img}
                          alt={`Team member ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-4">
                    <Badge
                      size="sm"
                      color={
                        order.status === 'Active'
                          ? 'success'
                          : order.status === 'Pending'
                            ? 'warning'
                            : 'error'
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-5 py-4">{order.budget}</TableCell>
                  <TableCell className="px-5 py-4">{order.deadline}</TableCell>
                  {/* ⬅️ 새 데이터 추가 */}
                  <TableCell className="px-5 py-4">
                    <button
                      onClick={openModal}
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                    >
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                          fill=""
                        />
                      </svg>
                      Edit
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-end p-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
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
