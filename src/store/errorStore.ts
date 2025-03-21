import { create } from 'zustand'
type TglobalError = {
  error: unknown | null
  setGlobalError: (message: unknown) => void
  clearError: () => void
}
export const useGlobalErrorStore = create<TglobalError>(set => {
  return {
    error: null,
    setGlobalError: message => set({ error: message }),
    clearError: () => set({ error: null }),
  }
})
