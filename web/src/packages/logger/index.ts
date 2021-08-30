import { LogEvent, LoggerInterface } from './types'

const useCreateLogger = (): LoggerInterface => {
  const log = (event: LogEvent) => {
    if (typeof window === 'undefined') {
      return
    }

    // TODO: Send logs to production solution.
    if (process.env.NODE_ENV === 'live') {
      return
    }

    console.debug('Log', { ...event })
  }

  return { log }
}

export const useLogger = (): LoggerInterface => useCreateLogger()
