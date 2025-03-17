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
import axios from 'axios'

interface ITanantsDetailUsers<T> {
  success: boolean
  status: number
  totalCount: number
  hasMore: boolean
  error: string | null
  data: T[]
}
export default function TenantsUsersTable<T>() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 3
  const { isOpen, openModal, closeModal } = useModal()
  const [userData, setUserData] = useState<ITanantsDetailUsers<T> | null>(null)
  const handleSave = () => {
    // Handle save logic here
    console.log('Saving changes...')
    closeModal()
  }
  useEffect(() => {
    const fetchTenantsDetailUsers = async () => {
      try {
        const response = await axios.get('/data/users.json')

        if (response?.status === 200 && userData !== response?.data) {
          setUserData(response?.data)
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message)
        }
      }
    }
    fetchTenantsDetailUsers()
  }, [])
  console.log(userData)
  return userData?.totalCount === 0 ? (
    <div className="dark:text-white">No Data</div>
  ) : (
    <div className="overflow-hidden mt-4 rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1300px]">
          {/* ⬅️ 컬럼 추가로 너비 확장 */}
          <Table className="table-fixed w-full">
            {/* ⬅️ 테이블 레이아웃 고정 */}
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow className="h-[50px]">
                <TableCell
                  isHeader
                  className="w-[250px] px-5 py-3 text-start dark:text-white"
                >
                  User Name
                </TableCell>
                <TableCell
                  isHeader
                  className="w-[250px] px-5 py-3 text-start dark:text-white"
                >
                  Name
                </TableCell>
                <TableCell
                  isHeader
                  className="w-[250px] px-5 py-3 text-start dark:text-white"
                >
                  Roles
                </TableCell>
                <TableCell
                  isHeader
                  className="w-[250px] px-5 py-3 text-start dark:text-white"
                >
                  Active
                </TableCell>
                <TableCell
                  isHeader
                  className="w-[250px] px-5 py-3 text-start dark:text-white"
                >
                  Created On
                </TableCell>
              </TableRow>
            </TableHeader>
            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {userData?.data?.map((order, index) => (
                <TableRow
                  key={index}
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-end p-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
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
