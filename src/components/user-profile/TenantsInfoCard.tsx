'use client'
import React, { useState } from 'react'

export default function TenantsInfoCard() {
  const [cardUnd, setCardUnd] = useState(false)

  return (
    <div
      className={`p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 ${cardUnd ? 'h-[150px] overflow-hidden' : ''}`}
    >
      <button
        className="flex w-full mb-4 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:w-auto"
        onClick={() => setCardUnd(!cardUnd)}
      >
        {/**carot up */}
        {!cardUnd && (
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 15L12 9L18 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {/**carot down */}
        {cardUnd && (
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {cardUnd ? 'Expand' : 'Collapse'}
      </button>
      <div className="flex flex-col gap-6 ">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Basic Information
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                First Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                Musharof
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Last Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                Chowdhury
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Email address
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                randomuser@pimjo.com
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Phone
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                +09 363 398 46
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Bio
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                Team Manager
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
