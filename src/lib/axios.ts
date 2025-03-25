import axios from 'axios'
import { env } from '@/lib/env'
//axios instance 생성
const api = axios.create({
  baseURL: env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터
api.interceptors.request.use(
  config => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  error => Promise.reject(error),
)

//응답 인터셉터
api.interceptors.response.use(
  response => response,
  error => {
    console.error(`API 요청 실패:`, error)
    return Promise.reject(error)
  },
)

export default api
