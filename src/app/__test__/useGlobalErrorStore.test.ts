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
