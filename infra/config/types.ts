import { SubnetConfiguration } from '@aws-cdk/aws-ec2'

interface permittedIp {
  readonly name: string
  readonly ipAddress: string
}

export interface StackConfiguration {
  readonly project: string
  readonly stage: string
  readonly env: {
    readonly account: string
    readonly region: string
  }
  network: {
    vpc: {
      readonly maxAzs?: number
      readonly cidr: string
      readonly subnets: SubnetConfiguration[]
    }
    readonly permittedIps?: permittedIp[]
  }
  domain: {
    readonly domain: string
  }
}
