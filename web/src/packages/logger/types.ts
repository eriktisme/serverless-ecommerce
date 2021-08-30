export interface LogEvent {
  message: string
}

export type LogFunction = (event: LogEvent) => void

export interface LoggerInterface {
  log: LogFunction
}
