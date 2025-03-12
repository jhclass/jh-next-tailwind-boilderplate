'use client'
import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table'

import Badge from '../ui/badge/Badge'
import Image from 'next/image'
import Pagination from './Pagination'
import { useRouter } from 'next/navigation'

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

export default function TanentsTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedData = tableData.slice(startIndex, endIndex)
  const totalPages = Math.ceil(tableData.length / ITEMS_PER_PAGE)
  const router = useRouter()

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
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
                  onClick={() => router.push(`/tenants/detail/${order.id}`)}
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
                    <span
                      className={`px-3 py-1 rounded-md text-white ${
                        order.priority === 'High'
                          ? 'bg-red-500'
                          : order.priority === 'Medium'
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                      }`}
                    >
                      {order.priority}
                    </span>
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
    </div>
  )
}
