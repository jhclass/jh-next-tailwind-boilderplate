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
