'use client'
import TenantsInfoCard from '@/components/user-profile/TenantsInfoCard'
import Button from '@/components/ui/button/Button'
import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import UserTableCard from '@/components/user-profile/UsertableCard'
import TenantsSystemInfoCard from '@/components/user-profile/TenantsSystemInfoCard'
import { useModal } from '@/hooks/useModal'
import { Modal } from '@/components/ui/modal'
import Label from '@/components/form/Label'
import Input from '@/components/form/input/InputField'
import axios from 'axios'
import Badge from '@/components/ui/badge/Badge'
import { useTenantsStore } from '@/store/tenantsStore'
import { useForm, Controller } from 'react-hook-form'

export default function TenantsDetail() {
  const params = useParams()
  const id = params.id
  //const [tenantsIdData, setTenantsIdData] = useState<TenantResponse | null>()
  const { tenantsIdData, setTenantsIdData, reset } = useTenantsStore()
  const router = useRouter()
  const [activeCard, setActiveCard] = useState(1)
  const { isOpen, openModal, closeModal } = useModal()
  const [isError, setIsError] = useState<unknown>(null)
  const [loading, setLoading] = useState(true)
  const {
    control,
    reset: resetForm,
    setValue,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    defaultValues: {
      tenantName: tenantsIdData?.data?.tenantName || undefined,
      phoneNumber: tenantsIdData?.data?.phoneNumber || undefined,
      email: tenantsIdData?.data?.emailAddress || undefined,
      websiteUrl: tenantsIdData?.data?.websiteUrl || undefined,
    },
  })
  useEffect(() => {
    if (tenantsIdData?.data) {
      resetForm({
        tenantName: tenantsIdData?.data?.tenantName || '',
        phoneNumber: tenantsIdData?.data?.phoneNumber || '',
        email: tenantsIdData?.data?.emailAddress || '',
        websiteUrl: tenantsIdData?.data?.websiteUrl || '',
      })
    }
  }, [tenantsIdData, reset])
  {
    /** 폼데이터 */
  }
  const onSubmit = data => {
    if (Object.keys(dirtyFields).length === 0) {
      alert('수정내용이 없습니다.')
    }
    console.log(data)
    closeModal()
  }
  {
    /**appRouter */
  }

  {
    /** 아이디값을 path parameter 에 담아서 전송*/
  }
  useEffect(() => {
    const fetchTenantsData = async () => {
      try {
        const response = await axios.get(`/data/${id}.json`)

        if (response?.status === 200 && response?.data !== tenantsIdData) {
          setTenantsIdData(response?.data)
          setLoading(false)
        }
      } catch (err) {
        console.error(err)
        reset()
        setLoading(false)
        if (err instanceof Error) {
          setIsError(err.message)
        } else {
          setIsError('Unknown error occurred')
        }
      }
    }
    fetchTenantsData()
  }, [id])
  console.log('Existing Data', tenantsIdData?.data)
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
            <span>Tenants Detail</span>
          </h3>
          <div>
            <Button size="md" variant="outline" onClick={() => router.back()}>
              <svg
                className="stroke-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.25 4.5L6.75 9L11.25 13.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back
            </Button>
            &nbsp;&nbsp;
            <Button size="md" variant="primary" onClick={openModal}>
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
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {/*<UserMetaCard />*/}
          {/** basic information*/}
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <Badge>Loading...</Badge>
            </div>
          ) : (
            <TenantsInfoCard
              tenantsName={tenantsIdData?.data?.tenantName}
              phoneNumber={tenantsIdData?.data?.phoneNumber}
              email={tenantsIdData?.data?.emailAddress}
              websiteUrl={tenantsIdData?.data?.websiteUrl}
              address={tenantsIdData?.data?.fullAddress}
              activation={tenantsIdData?.data?.isActive}
            />
          )}
          {/*System Information*/}
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <Badge>Loading...</Badge>
            </div>
          ) : (
            <TenantsSystemInfoCard
              createOn={tenantsIdData?.data?.createdDateTimeUTC}
              creatorUserId={tenantsIdData?.data?.creatorUserId}
              lastModified={tenantsIdData?.data?.updatedDateTimeUTC}
              updaterUserId={tenantsIdData?.data?.updaterUserId}
            />
          )}
          {/** 탭 버튼  */}
          <div className="flex items-center gap-5">
            <Button
              size="sm"
              variant={activeCard === 1 ? 'primary' : 'outline'}
              onClick={() => setActiveCard(1)}
            >
              Contacts
            </Button>
            <Button
              size="sm"
              variant={activeCard === 2 ? 'primary' : 'outline'}
              onClick={() => setActiveCard(2)}
            >
              Users
            </Button>
            <Button
              size="sm"
              variant={activeCard === 3 ? 'primary' : 'outline'}
              onClick={() => setActiveCard(3)}
            >
              Subscriptions
            </Button>
          </div>
          {/** 탭 콘텐츠  Contacts, Users, Subscriptions*/}
          {activeCard === 1 && <UserTableCard tabName="Contacts" />}
          {activeCard === 2 && <UserTableCard tabName="Users" />}
          {activeCard === 3 && <UserTableCard tabName="Subscriptions" />}
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Tenant
            </h4>
            {/* <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your details to keep your profile up-to-date.
            </p> */}
          </div>
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div>
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Basic Infomation
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1">
                  <div>
                    <Label>Tenant name*</Label>
                    <Controller
                      name="tenantName"
                      control={control}
                      rules={{ required: 'Tenant name  is required.' }}
                      render={({ field }) => (
                        <Input
                          type="text"
                          {...field}
                          defaultValue={tenantsIdData?.data?.tenantName}
                          errorMessage={errors?.tenantName?.message}
                        />
                      )}
                    />
                  </div>

                  <div>
                    <Label>Phone Number</Label>
                    <Controller
                      name="phoneNumber"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="text"
                          {...field}
                          defaultValue={tenantsIdData?.data?.phoneNumber}
                        />
                      )}
                    />
                  </div>

                  <div>
                    <Label>Email</Label>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="text"
                          {...field}
                          defaultValue={tenantsIdData?.data?.emailAddress}
                        />
                      )}
                    />
                  </div>

                  <div>
                    <Label>Website Url</Label>
                    <Controller
                      name="websiteUrl"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="text"
                          {...field}
                          defaultValue={tenantsIdData?.data?.websiteUrl}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}
