# Next-Frontend-CCC

# 📌 Frontend Cross-Cutting Concern (CCC) 문서

## 🔹 CC / CCC 란 무엇인가?

### 1. AOP (Aspect-Oriented Programming) 관점 지향 프로그래밍

- **CC (Core Concern)**: 주 관심사항
- **CCC (Cross-Cutting Concern)**: 횡단 관심사 (예: Logging, Transaction 등)
- **공통 관심사항**: 여러 모듈에서 공통적으로 적용되는 기능들
- **CI/CD 와 관련한 내용은 포함하지 않음.**

---

## 🔹 기술 스택

| Node    | npm   | React    | Next.js    |
| ------- | ----- | -------- | ---------- |
| v19.8.0 | 9.5.1 | React 19 | Next.js 15 |

---

## 🔹 무엇을 위한 프로젝트인가?

### ✅ 생산성 향상

- **작업 속도 증가**
- **재사용성 강화**
- **접근성 개선**
  - 프론트엔드 개발자에게 친숙한가?
  - 이미 충분히 검증되었는가?

---

## 🔹 우리가 추구하는 것.

### 프레임워크 확장 레이어(Framework Extension Layer)

프레임워크를 확장하는 기능들을 미리 조합한 것

- ✅ Next.js + React의 부족한 부분을 채워주는 레이어
- ✅ SSR, 상태 관리, API 호출, 인증, 데이터 정규화 등 필수 기능을 포함

🚀 Framework Extension Layer

- "프레임워크를 더 쉽게, 더 강력하게 확장하는 계층"
- 기존 프레임워크에 직접 기능을 추가하는 커스텀 레이어

### 프론트엔드 아키텍처 패턴(Frontend Architecture Pattern)

- ✅ 이런 조합이 단순한 유틸이 아니라 하나의 "설계 패턴"으로 자리 잡음
- ✅ 모듈 간의 관계를 정의하고 개발 규칙을 만든다는 점에서 "아키텍처"와 유사
- ✅ 예: MVC 패턴, Atomic Design, Clean Architecture 처럼 하나의 설계 방식이 될 수 있음

🚀 Frontend Architecture Pattern

- "프론트엔드 개발을 체계적으로 구조화하는 패턴"
- Next.js + React 개발 시 반드시 포함해야 할 아키텍처 레이어

---

## 🔹 프레임워크 확장 레이어(Framework Extension Layer) 연구노트

- 시작일: 2025.03.19

---

## **1) 인증 / 권한 관리**

### 🚀 API 요청 공통 처리 → **Axios 사용**

#### ✅ **왜 Axios인가?**

Next.js에서 Axios를 매번 직접 호출하는 대신,
최적화된 유틸리티 함수로 개발하면 재사용성이 높아지고, 유지보수가 편리해짐.
즉, Axios 인스턴스를 만들고, API 호출을 모듈화하여 전역에서 쉽게 사용할 수 있도록 하는 것이 핵심.

#### ✅ **Axios 유틸리티 설계원칙**

1. **React + Next.js 최적화** → 서버 컴포넌트 & 클라이언트 컴포넌트 모두 사용 가능
2. **재사용성 높은 API 요청 함수** → 모든 API 요청을 공통 함수로 처리
3. **에러 핸들링 통합** → 일관된 방식으로 API 에러 처리
4. **SSR(서버사이드 렌더링) 대응** → `axios.create()` 활용
5. **인터셉터 활용** → JWT 토큰 자동 추가
6. **SWR, React Query와 쉽게 결합 가능**

#### **Axios 인스턴스 설정 (lib/axios.ts)**

```ts
import axios from 'axios'

// Axios 인스턴스 생성 (SSR, CSR 둘 다 가능)
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // 환경 변수에서 API 주소 가져오기
  timeout: 10000, // 10초 제한
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터 (Request Interceptor)
api.interceptors.request.use(
  config => {
    if (typeof window !== 'undefined') {
      // 클라이언트에서 실행될 때만 localStorage 접근
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  error => Promise.reject(error),
)

// 응답 인터셉터 (Response Interceptor)
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API 요청 실패:', error)
    return Promise.reject(error)
  },
)

export default api
```

- 모든 API 요청에 Authorization 헤더 자동 추가
- 요청 실패 시 공통 에러 핸들링 적용
- CSR(클라이언트)에서만 localStorage 사용하도록 분기 처리

#### **API 유틸리티 함수 (lib/api.ts)**

```tsx
import api from './axios'
// GET 요청 (데이터 조회)
export async function getData<T>(url: string, params?: object): Promise<T> {
  try {
    const response = await api.get<T>(url, { params })
    return response.data
  } catch (error) {
    throw error
  }
}

// POST 요청 (데이터 생성)
export async function postData<T>(url: string, data?: object): Promise<T> {
  try {
    const response = await api.post<T>(url, data)
    return response.data
  } catch (error) {
    throw error
  }
}

// PUT 요청 (데이터 수정)
export async function putData<T>(url: string, data?: object): Promise<T> {
  try {
    const response = await api.put<T>(url, data)
    return response.data
  } catch (error) {
    throw error
  }
}

// DELETE 요청 (데이터 삭제)
export async function deleteData<T>(url: string): Promise<T> {
  try {
    const response = await api.delete<T>(url)
    return response.data
  } catch (error) {
    throw error
  }
}
```

- getData(), postData(), putData(), deleteData() 함수로 API 요청을 한 곳에서 관리
- 모든 API 요청에서 공통 에러 처리가 가능
- TypeScript의 <T>를 사용해서 타입 안전성 보장

#### **React + Next.js 에서 API 유틸 사용**

```tsx
'use client'

import { useEffect, useState } from 'react'
import { getData } from '@/lib/api'

export default function UserProfile() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getData('/user')
        setUser(data)
      } catch (error) {
        console.error('유저 데이터를 가져오지 못했습니다.', error)
      }
    }
    fetchUser()
  }, [])

  if (!user) return <p>로딩 중...</p>

  return (
    <div>
      <h1>사용자 프로필</h1>
      <p>이름: {user.name}</p>
      <p>이메일: {user.email}</p>
    </div>
  )
}
```

- getData('/user') 한 줄로 쉽게 API 요청 가능
- API 응답을 자동으로 setUser()에 저장

#### **SWR 과 Axios 를 함께 사용하여 자동캐싱**

> Next.js에서는 SWR을 사용하면 API 요청을 캐싱하고, 자동으로 갱신하는 기능을 추가할 수 있음.

##### **✅ SWR 이란**?

1. SWR(또는 Stale-While-Revalidate)은 **Vercel**에서 개발한 React 훅 기반의 데이터 페칭 라이브러리입니다.
   클라이언트 측에서 데이터를 효율적으로 가져오고 캐싱하는 데 사용됩니다.
2. SWR은 "Stale-While-Revalidate" 전략을 사용하여 다음과 같은 동작을 합니다.

- Stale (오래된 데이터) 표시: 캐시된 데이터를 먼저 보여줌 (UI가 즉시 업데이트됨).
- Revalidate (재검증) 진행: 백그라운드에서 최신 데이터를 가져와서 업데이트.

3. 자동 캐싱 및 갱신: 네트워크 요청을 최소화하면서 데이터를 최신 상태로 유지.

##### **✅ SWR 주요 특징**

###### 1. 자동 캐싱 & 백그라운드 동기화

- 네트워크 요청을 최소화하고, UI를 빠르게 렌더링.
- 캐시된 데이터가 존재하면 먼저 보여주고, 이후 최신 데이터를 가져와 업데이트.

###### 2. 자동 재검증 (Revalidation)

- 데이터 변경 시, 새로고침 시, 또는 초점이 변경될 때(Focus Revalidation) 자동으로 최신 데이터를 가져옴.

###### 3. 사용자 인터랙션에 반응

- 탭을 다시 열거나 인터넷이 다시 연결되면 자동으로 최신 데이터를 가져옴.

###### 4. 로컬 상태 업데이트 (Optimistic UI)

- API 호출 전 UI를 먼저 변경하는 기능을 제공.

###### 5. 무한 스크롤 & 페이지네이션 지원

- 데이터를 연속적으로 로드하는 기능을 쉽게 구현 가능.

###### 6. TypeScript 지원

- 강력한 타입 지원으로 안전한 코드 작성 가능.

###### 7. 참고자료

> 공식 홈페이지: https://swr.vercel.app/
>
> > GitHub 저장소: https://github.com/vercel/swr

##### 코드 예시

```tsx
'use client'

import useSWR from 'swr'
import { getData } from '@/lib/api'

export default function UserProfile() {
  const { data: user, error } = useSWR('/user', getData)

  if (error) return <p>에러 발생: {error.message}</p>
  if (!user) return <p>로딩 중...</p>

  return (
    <div>
      <h1>사용자 프로필</h1>
      <p>이름: {user.name}</p>
      <p>이메일: {user.email}</p>
    </div>
  )
}
```

---

## **2) 에러 처리 (전역 에러 처리)**

- **에러 처리 파일:** `error.tsx`
- 모든 컴포넌트에서 발생하는 에러를 전역적으로 처리
- 몇가지 방법이 있지만 zustand 를 사용하고 있으므로 이를 활용하여 전역 에러처리를 하도록 함.
- 순서는 1) 전역에러상태 store 를 만들고, 2) 에러 발생 시 상태에 넣고 3) 공통 layout.tsx 에 넣어주면 됨.

#### 예시코드

```ts
// 전역 에러상태 store 만들기
// stores/errorStore.ts
import { create } from 'zustand'

type ErrorState = {
  error: string | null
  setError: (message: string) => void
  clearError: () => void
}

export const useErrorStore = create<ErrorState>(set => ({
  error: null,
  setError: message => set({ error: message }),
  clearError: () => set({ error: null }),
}))
```

```ts
// 에러발생시 상태에 넣기
// 예: api 호출 중 에러 발생했을 때
import { useErrorStore } from '@/stores/errorStore'

const fetchData = async () => {
  try {
    const res = await fetch('/api/something')
    if (!res.ok) throw new Error('서버 응답이 이상합니다.')
    const data = await res.json()
    // 데이터 처리
  } catch (err: any) {
    useErrorStore.getState().setError(err.message || '알 수 없는 오류')
  }
}
```

```tsx
// 전역 에러 공통레이아웃에 적용 (layout.tsx)
// app/layout.tsx (또는 공통 레이아웃)

'use client'

import { useErrorStore } from '@/stores/errorStore'
import { useEffect } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { error, clearError } = useErrorStore()

  useEffect(() => {
    if (error) {
      console.error('전역 에러:', error)
      // 토스트 보여주기 등
      alert(error) // 예시
      clearError() // 한 번 보여준 후 초기화
    }
  }, [error])

  return <>{children}</>
}
```

---

## **3) 전역 상태 관리**

> `Zustand` (next 15 / react 19)

- 러닝커브가 높은 Redux는 배제한다.
- Zustand vs Recoil

| 항목         | Zustand                                    | Recoil                                              |
| ------------ | ------------------------------------------ | --------------------------------------------------- |
| **설계철학** | 최소한의 `API` 로 단순하고 유연한 상태관리 | `React`의 렌더링 흐름에 최적화된 상태관리           |
| **중심개념** | 전역 상태를 `JS` 객체처럼 정의 (store)     | `아톰(Atom), 셀렉터(Selector)`로 상태를 쪼개고 조합 |
| **기반구조** | `vanilla JS`에 가까운 자유로운 구조        | `React` 내부 작동 방식과 밀접하게 연결              |

- Zustand 를 사용하여 전역에러와 전역상태를 관리한다.
- Recoil 은 nextjs 15 와 호환이 좋지 않음. (Recoil v0.7.7 확인)
- 가볍고 호환이 좋아 원하는 대로 커스텀이 가능한 zustand 를 공식적으로 채택하고 스킬업하는 것이 좋을 것으로 보임.
- Recoil이 반드시 필요한 이유에 대하여 기술적인 증명이 되지 않는 이상 상태관리는 내부적으로 통일하여 사용한다.
- Recoil 또는 Redux 를 클라이언트가 원할 경우는 예외. 이 때에는 다른 모듈의 의존성을 다시 검토하여 진행한다.
- 이미 개발 된 제품의 경우 기존 코어 모듈은 유지하며 그에 따른 의존성에 따라 모듈을 선정한다.
- 폴더 정의 (store 폴더 하위에 주제별로 하위 폴더를 구성하여도 상관없음.)
  > store/nameStore.ts

```tsx
'use client'

import { set } from 'react-hook-form'
import { create } from 'zustand'

export interface TenantContact {
  id: string
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

export interface TenantData {
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
  tenantContacts: TenantContact[]
  createdDateTimeUTC: string
  creatorUserId: string
  creatorUserName: string
  updatedDateTimeUTC: string
  updaterUserId: string
  updaterUserName: string
}

export interface TenantResponse {
  success: boolean
  status: number
  totalCount: number | null
  hasMore: boolean | null
  error: string | null
  data: TenantData
}

// ✅ Zustand 스토어 정의
interface TenantStoreState {
  tenantsIdData: TenantResponse | null
  setTenantsIdData: (data: TenantResponse | null) => void
  reset: () => void
}

export const useTenantsStore = create<TenantStoreState>(set => ({
  tenantsIdData: null,
  setTenantsIdData: data => set({ tenantsIdData: data }),
  reset: () => set({ tenantsIdData: null }),
}))
```

> [Zustand 공식문서](https://zustand.docs.pmnd.rs/getting-started/introduction)

---

## **4) API 요청 캐싱**

- React Query? 복잡한 앱 캐시전략까지 커버가능.
- SWR? vercel, 소형프로젝트에 적합. mutation 이 따로 있지 않고 직접 지정해야함.
- React-Query v5 (2025-03-25 기준)
  > npm install @tanstack/react-query
- dev tools
  > npm install @tanstack/react-query-devtools
- 공식문서
  > [ReactQuery 공식문서](https://tanstack.com/query/latest/docs/framework/react/overview)

## **5) API 응답 검증**

- 검증은 zod 로 진행
- 모든 api 를 검증해야할까? Nope! Cause 불필요한 시간소모 + 코드량 증가.
- 따라서, 기준에 따라 아래의 내용은 API 를 통해 받은 데이터를 검증한다.

| 상황                                        | 검증필요도                                                            |
| ------------------------------------------- | --------------------------------------------------------------------- |
| 서버가 외부 API 일 때                       | ✅무조건 검증                                                         |
| 백엔드랑 계약이 명확하지 않을때             | ✅ 무조건 검증                                                        |
| 로그인, 권한, 결제, 유저정보                | ✅ 무조건 검증                                                        |
| 캐시 저장 전/DB에 넣기 전                   | ❓ 검증 권장 (백엔드에서 할 것이므로 중요도에 따라 더블체크여부 결정) |
| 단순 조회 + 프론트에서만 사용하는 UI 데이터 | ❌생략가능(무조건 생략은 아님.)                                       |

- 타입스크립트는 개발중에 검증을 할 수 있다.
- zod 를 통해 하는 검증은 런타임 상황에서 말하는 것이다.
- type을 지정한 것 과 같이 작성하면 된다.
- 아래와 같이 데이터가 들어온다고 가정한다.

```json
{
  "success": true,
  "status": 200,
  "totalCount": null,
  "hasMore": null,
  "error": null,
  "data": {
    "id": "51ff5710-5a6a-49d3-88dc-71ec6e2d8043",
    "tenantName": "Blanda Group",
    "isActive": true,
    "phoneNumber": "2342342342342342222",
    "websiteUrl": "https://olga.name",
    "emailAddress": "Felix_OKeefe23@hotmail.com",
    "fullAddress": "3523 Kassandra Mission",
    "region": null,
    "district": null,
    "city": "Mariettaville",
    "address1Street": "34819 Powlowski Mountains",
    "address2House": null,
    "zipCode": "33",
    "tenantContacts": [
      {
        "id": "66d030b7d8eb62249663818c",
        "fullName": "Minjung Kim",
        "firstName": "Minjung",
        "lastName": "Kim",
        "phoneNumber": "821087958795",
        "invoiceEmailAddress": "kmj@inventis.co.kr",
        "contactTypeEnum": "Billing",
        "contactTypeDisplayName": "Billing",
        "fullAddress": "2450 massachusetts avenue n.w.",
        "zipCode": "20008",
        "city": "Washington, D.C.",
        "country": "United States of America"
      }
    ],
    "createdDateTimeUTC": "2024-08-29T08:25:36.936Z",
    "creatorUserId": "4a971da2-b165-4672-947a-6ce163660b50",
    "creatorUserName": "4a971da2-b165-4672-947a-6ce163660b50",
    "updatedDateTimeUTC": "2024-08-30T06:48:38.276Z",
    "updaterUserId": "9bec2a88-6fc1-40e6-a974-38c4732ea930",
    "updaterUserName": "dealer365 dealer365"
  }
}
```

- 해당 데이터를 타입 선언과 동일하게 작은 블록으로 나누어 선언한다.

```ts
// lib/validation/tenantIdData.ts
import { z } from 'zod'

export const TenantContact = z.object({
  id: z.string(),
  fullName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  invoiceEmailAddress: z.string().email(),
  contactTypeEnum: z.string(),
  contactTypeDisplayName: z.string(),
  fullAddress: z.string(),
  zipCode: z.string(),
  city: z.string(),
  country: z.string(),
})

export const TenantId = z.object({
  id: z.string(),
  tenantName: z.string(),
  isActive: z.boolean(),
  phoneNumber: z.string(),
  websiteUrl: z.string().url(),
  emailAddress: z.string().email(),
  fullAddress: z.string(),
  region: z.string().nullable(),
  district: z.string().nullable(),
  city: z.string(),
  address1Street: z.string(),
  address2House: z.string().nullable(),
  zipCode: z.string(),
  tenantContacts: z.array(TenantContact),
  createdDateTimeUTC: z.string().datetime(),
  creatorUserId: z.string(),
  creatorUserName: z.string(),
  updatedDateTimeUTC: z.string().datetime(),
  updaterUserId: z.string(),
  updaterUserName: z.string(),
})

export const TenantIdAll = z.object({
  success: z.boolean(),
  status: z.number(),
  totalCount: z.number().nullable(),
  hasMore: z.boolean().nullable(),
  error: z.any().nullable(), // or refine further if needed
  data: TenantId,
})
```

- 실제 적용. ( reactQuery + logger + zod )

```tsx
// /app/(admin)/(others-pages)/(tables)/tenants/detail/[id]/page.tsx
import { TenantIdAll } from '@/lib/validation/tenantIdData'
import { logger } from '@/lib/logger'
const { tenantsIdData, setTenantsIdData, reset } = useTenantsStore()
const { data, isLoading: loading } = useQuery({
  queryKey: ['tenantIdData', id],
  queryFn: () => getData<TenantResponse>(`/data/${id}.json`),
  enabled: !!id,
})
useEffect(() => {
  if (data) {
    const validation = TenantIdAll.safeParse(data)
    console.log('validation', validation?.data)
    if (!validation.success) {
      logger.error(`데이터 검증 실패`, validation.error)
    } else {
      setTenantsIdData({
        ...validation.data,
        error: validation.data.error ?? null,
      })
    }
  }
}, [data])
```

## **6) 폼 데이터 정규화 & 유효성 검사**

- yup? 리액트 훅 폼에서 공식적으로 지원해서 사용하려고 하였으나, typescript 지원이 약하기 때문에 zod 로 통합하는 것이 좋을듯?
- zod?

| **기능**                       | **Yup**                         | **Zod**                       | **T3 Env 적용**                              |
| ------------------------------ | ------------------------------- | ----------------------------- | -------------------------------------------- |
| **TypeScript 지원**            | ❌ 런타임 기반 (타입 지원 약함) | ✅ 완전한 TypeScript 지원     | ✅ Zod가 T3 Env와 완벽하게 호환됨            |
| **데이터 변환 (`preprocess`)** | ❌ 직접 처리해야 함             | ✅ `preprocess()`로 변환 가능 | ✅ `PORT`, `IS_PRODUCTION` 같은 값 변환 용이 |
| **기본값 (`default`)**         | ✅ 가능                         | ✅ 가능                       | ✅ 둘 다 사용 가능                           |
| **성능**                       | ⚡ 빠름                         | ⚡ 빠름                       | 비슷함                                       |
| **조합 (Composition)**         | ❌ 스키마 조합이 어려움         | ✅ 스키마 조합 용이           | ✅ 환경 변수 검증에 적합                     |
| **사용 편의성**                | ✅ 쉽지만 타입 지원 부족        | ✅ TypeScript와 완벽 호환     | ✅ Zod가 더 자연스러움                       |

## **7) LocalStorage 관리 (storage.ts)**

## **8) Debounce (debounce.ts)**

## **9) 날짜 포맷 변경 (date.ts)**

## **10) 객체 비교 (compare.ts)**

## **11) UUID 생성 (uuid.ts)**

## **12) Query String 변환 (query.ts)**

## **13) env**

> T3 env

- process.env를 직접 사용하면 타입 검증이 어렵고, 런타임 에러가 발생할 가능성이 높음.
- T3 Env를 사용하면 환경 변수의 타입을 정의하고, 올바른 값인지 검증 가능!
- zod 와 함께 사용
- src/lib/validation/env.ts

```ts
import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.string().url(),
  NEXT_PUBLIC_PORT: z.coerce.number(), // 문자열을 number로 강제 변환
})

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  NEXT_PUBLIC_PORT: process.env.NEXT_PUBLIC_PORT,
})

if (!parsed.success) {
  console.error(
    `유효하지 않은 않은 환경 변수: ${JSON.stringify(parsed.error.format(), null, 2)}`,
  )
  throw new Error(`환경 변수 설정 오류!`)
}

export const env = parsed.data
```

## **14) 단위, 통합테스트**

- Jest
- React Testing Library
- 설치
  > npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node
- 타입스크립트
  > npm install -D @types/jest
- config file
  > jest.config.ts / jest.setup.ts
- 단위테스트 예시 코드

```tsx
//__test__/useGlobalErrorStore.test.ts

import { useGlobalErrorStore } from '@/store/errorStore'

describe('Global Error Store (zustand)', () => {
  beforeEach(() => {
    useGlobalErrorStore.setState({ error: null }) // 초기화
  })

  it('초기 상태는 error가 null이어야 한다', () => {
    expect(useGlobalErrorStore.getState().error).toBeNull()
  })

  it('setGlobalError 호출 시 error 값이 설정된다', () => {
    useGlobalErrorStore.getState().setGlobalError('예상치 못한 에러')
    expect(useGlobalErrorStore.getState().error).toBe('예상치 못한 에러')
  })

  it('clearError 호출 시 error가 null로 초기화된다', () => {
    useGlobalErrorStore.getState().setGlobalError('에러 발생')
    useGlobalErrorStore.getState().clearError()
    expect(useGlobalErrorStore.getState().error).toBeNull()
  })
})
```

---

## **15) e2e test : Playwright (next.js[공식추천]) / Cypress**

- Playwright? (next.js) 선택! 왜 cypress 가 아니라 playwright 를 채택 했나?
- Cypress?
  > Playwright install 및 playwright.config.ts 작성.
- 예시코드 작성.
- playwright.config.ts

```ts
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './src/app/tests', // 테스트 폴더
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  use: {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 0,
    ignoreHTTPSErrors: true,
  },
  webServer: {
    command: 'npm run dev',
    port: Number(process.env.NEXT_PUBLIC_PORT),
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
})
```

- login.spec.ts(common)

```ts
import { test as setup, expect } from '@playwright/test'
import fs from 'fs'
import path from 'path'
setup('로그인 후 세션 저장.', async ({ page }) => {
  // 1.로그인 페이지 진입
  await page.goto('/')

  // 2. 이메일이랑 비밀번호 입력
  await page.getByPlaceholder('userId').fill('admin')
  await page.getByPlaceholder('password').fill('1234')

  // 3. 로그인 버튼을 클릭한다.
  await page.locator('button[type="submit"]').click()

  // 4. 루트페이지로 이동
  await expect(page).toHaveURL('/')

  // 5. 세션 저장.
  const storageState = await page.context().storageState()

  // 경로 생성 + 파일 저장
  const authDir = path.join(process.cwd(), 'playwright/.auth')
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true })
  }
  // 스냅샷으로 저장.
  fs.writeFileSync('playwright/.auth/admin.json', JSON.stringify(storageState))
})
```

- tenants.spec.ts (카테고리 , 기능 등 주제별로 e2e 테스트 시나리오를 정하고 진행.)

```ts
import { test } from '@playwright/test'
import path from 'path'

//저장 된 세션을 가져와서 사용한다.
test.use({
  storageState: path.join(process.cwd(), 'playwright/.auth/admin.json'),
})

test('테넌트 페이지', async ({ page }) => {
  await page.goto('/tenants')
})
```

- e2e 테스트 방법론
- 불필요한 테스트로 인한 시간 낭비를 방지한다.
- 테스트의 목표는 아래와 같아야 한다.

| 목적                    | 설명                                                          |
| ----------------------- | ------------------------------------------------------------- |
| **실제 유저 흐름 검증** | 사용자가 UI 에서 어떤 행동을 할 때 시스템이 제대로 동작하는지 |
| 보안 흐름 체크          | 로그인, 접근제한, 권한 처리 등                                |
| 통합 시나리오           | 여러페이지, 여러기능 간의 흐름이 연결되어 잘 동작하는지       |
| 회귀방지                | 변경 시 기존 기능이 꺠지지 않았는지 자동으로 확인             |

- 디렉토리 구조는 아래 와 같이 한다.

```bash
📁 src
└── 📁 app
    └── 📁 tests
        ├── 📁 auth             # 로그인/회원가입 흐름
        │   └── login.spec.ts
        ├── 📁 tenants          # 테넌트 관리 흐름
        │   └── tenants.spec.ts
        ├── 📁 users            # 유저 관리 흐름
        ├── 📁 dashboard        # 대시보드 시나리오
        └── 📄 setup.ts         # 로그인 세션 저장용
```

- 테스트 네이밍은 아래와 같은 규칙을 참고하여 진행한다.
- 새로운 네이밍 규칙이 생길 경우 추가하고 교체할 경우 전체 네이밍 수정을 하여 일관성을 유지한다.

| 파일명                   | 예시설명명                                                |
| ------------------------ | --------------------------------------------------------- |
| login.spec.ts            | 로그인 기능 단독 일 경우. (XXXX.spec.ts)                  |
| login-to-tenants.spec.ts | 로그인->테넌트로 이동시나리오 (XXXX-to-XXXXX.spec.ts)     |
| tenant-crud.spec.ts      | 테넌트 등록, 수정, 삭제 통합 시나리오 (XXXX-crud.spec.ts) |

---

## **16) Logger (console)**

- pino? (next 공식추천)
- winston?
- nextjs 에서 추천하고 여러 보일러플레이트에서 사용중인 모듈이기 때문에 채택. 프론트에서 로깅 자체는 크게 의미를 부여하기 어렵고 console 의 대체 정도로 생각하면 될 것.
- 설치
  > npm i pino pino-pretty
- install 후 'pino/browser' 엔트리를 사용하면 되는데 기본적으로 타입에러가 발생하고 이 부분은 모듈에 대한 타입을 declare 해주면 된다.
  > types/custom.d.ts

```ts
declare module 'pino/browser' {
  import type { LoggerOptions } from 'pino'
  export function browser(opts?: LoggerOptions): import('pino').Logger
}
```

- lib/logger.ts 작성.
- 추가 옵션은 필요에 따라 추가.

```ts
import { browser } from 'pino/browser'

export const logger = browser({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
})
```

-적용예시

```ts
import { logger } from '@/lib/logger'
//console.error(`API 요청 실패:`, error)
logger.error(`API 요청 실패:`, error)
```

- 웹팩과 계속하여 충돌.
- 타입스크립트를 지원하지 않아 모듈에서 지속적으로 충돌발생으로 인해 사용중지. (2025-03-26, v9.6.0)
- console 을 대체할 logger 를 만들도록 한다.
- 예시코드

```ts
type LogLevel = 'info' | 'warn' | 'error' | 'debug'

export const logger = {
  log: (level: LogLevel, ...args: unknown[]) => {
    const prefix = `[${level.toUpperCase()}]`
    if (level === 'debug' && process.env.NODE_ENV !== 'development') {
      return
    }
    console[level](prefix, ...args)
  },
  info: (...args: unknown[]) => logger.log('info', ...args),
  warn: (...args: unknown[]) => logger.log('warn', ...args),
  error: (...args: unknown[]) => logger.log('error', ...args),
  debug: (...args: unknown[]) => logger.log('debug', ...args),
}
```

- 사용예시는 동일.

```ts
import { logger } from '@/lib/logger'
//console.error(`API 요청 실패:`, error)
logger.error(`API 요청 실패:`, error)
```

## **17) Sitemap.xml and robot.txt**

## **18) Error monitoring**

## **19) Multi-language(i18n)**

> next-intl

- 번역 연동이 필요하다면? Crowdin (유료)

## **20) Authentication**

> clerk? / **keycloak**?

- passwordless login : magic link,passkeys,Optimistic
- multi-factor Authentication (다중인증)
- TOTP, SMS, Email, Hardware security keys
- Social Auth (SNS)

| **기능**                             | **Clerk**                                      | **Keycloak**                                  |
| ------------------------------------ | ---------------------------------------------- | --------------------------------------------- |
| **설치 방식**                        | ✅ 클라우드 기반 (SaaS)                        | ❌ 자체 서버에 설치해야 함 (Self-hosted)      |
| **운영 방식**                        | ✅ Clerk이 모든 인증을 관리                    | ✅ 온프레미스(자체 서버)에서 직접 관리 가능   |
| **OAuth / Social Login**             | ✅ Google, GitHub, Apple, Facebook 등 지원     | ✅ 지원 (직접 설정 필요)                      |
| **MFA (다중 인증)**                  | ✅ 기본 제공                                   | ✅ 직접 설정해야 함                           |
| **User Management**                  | ✅ 클라우드 대시보드 제공                      | ✅ 관리 콘솔 제공 (설정이 복잡)               |
| **SSO (Single Sign-On)**             | ✅❌ **엔터프라이즈 플랜에서 지원**            | ✅ 기본 제공 (OIDC, SAML 지원)                |
| **API & Webhooks**                   | ✅ 간단한 API 제공                             | ✅ REST API 및 Admin API 제공                 |
| **데이터 저장 위치**                 | ❌ Clerk 서버에 저장 (SaaS 방식)               | ✅ 자체 DB에 저장 가능 (PostgreSQL, MySQL 등) |
| **사용자 맞춤 설정 (Customization)** | ✅ UI 커스터마이징 가능                        | ✅ 완전한 커스터마이징 가능                   |
| **OpenID Connect (OIDC)**            | ❌ 지원하지 않음                               | ✅ OIDC 표준 지원                             |
| **Role-based Access Control (RBAC)** | ✅ 기본 제공                                   | ✅ 강력한 RBAC 지원                           |
| **호환성**                           | ✅ Next.js, React, Vue 등과 간편하게 연동 가능 | ✅ 모든 플랫폼과 연동 가능 (설정이 복잡)      |
| **무료 플랜**                        | ✅ 무료 제공 (기본 기능)                       | ✅ 100% 무료 (오픈소스)                       |
| **유료 플랜**                        | ✅ 있음 (추가 기능 사용 시)                    | ❌ 없음 (자체 운영 비용 필요)                 |
| **보안 관리**                        | ✅ Clerk이 보안 관리 (SaaS)                    | ✅ 직접 보안 관리 필요 (설정이 중요)          |

## **21) 테스트 자동검증 (필수X)**

- Codecov? 일부유료

## **22) 성능, 접근성, SEO 최적화 (필수X)**

> Perfect Lighthouse Score

## **23) 번들크기 분석**

> Bundle analyzer plugin

- CI/CD 연동시 PR 마다 번들 크기를 자동으로 체크 가능.

## **24) 코드 Formatter**

- Prettier
  > .prettierrc.json

```json
{
  "singleQuote": true,
  "semi": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "arrowParens": "avoid",
  "jsxSingleQuote": false
}
```

## **25) Linter**

> ESLint

## **26) 정규식(lib/regexUtils.ts)**

> 글로벌 환경에서 사용할 수 있는 정규식

```ts
export const regexUtils = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // 국제 이메일 형식
  phone: /^\+?\d{1,4}?[-.\s]?(\d{1,4}[-.\s]?){1,4}\d{1,4}$/, // 국제 전화번호 형식
  url: /^(https?:\/\/)?([\w\d-]+\.)+\w{2,}(\/.*)?$/, // 국제 도메인 URL 검증
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // 영문+숫자+특수문자 8자 이상
  username: /^[a-zA-Z0-9_-]{3,16}$/, // 글로벌 사용자명 (3~16자, 영문+숫자+언더바+하이픈 허용)
  hexColor: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/, // HEX 색상 코드
  slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/, // URL 슬러그 (예: my-page-title)
  number: /^\d+$/, // 숫자만 허용
  ipv4: /^(?:\d{1,3}\.){3}\d{1,3}$/, // IPv4 주소 검증
  ipv6: /^([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}$/, // IPv6 주소 검증
  noSpecialChars: /^[\p{L}\p{N}]+$/u, // 모든 언어의 문자 & 숫자만 허용 (국제화 지원)
}
```
