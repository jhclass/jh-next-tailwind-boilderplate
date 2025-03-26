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
