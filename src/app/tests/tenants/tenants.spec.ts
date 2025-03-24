import { test } from '@playwright/test'
import path from 'path'

//저장 된 세션을 가져와서 사용한다.
test.use({
  storageState: path.join(process.cwd(), 'playwright/.auth/admin.json'),
})

test('테넌트 페이지', async ({ page }) => {
  await page.goto('/tenants')
})
