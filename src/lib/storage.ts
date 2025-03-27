export default class StorageUtil {
  static get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null
    const value = localStorage.getItem(key)
    try {
      return value ? (JSON.parse(value) as T) : null
    } catch {
      return null
    }
  }
  static set<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value))
  }
  static remove(key: string) {
    localStorage.removeItem(key)
  }
  static clear() {
    localStorage.clear()
  }
  static has(key: string): boolean {
    return localStorage.getItem(key) !== null
  }
}
