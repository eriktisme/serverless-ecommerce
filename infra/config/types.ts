export interface StackConfiguration {
  readonly project: string
  readonly stage: string
  readonly env: {
    readonly account: string
    readonly region: string
  }
  domain: {
    readonly domain: string
  }
}
