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
