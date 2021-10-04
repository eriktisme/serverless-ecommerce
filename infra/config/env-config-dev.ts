import { SubnetType } from '@aws-cdk/aws-ec2'
import { ProdConfig } from './env-config-prod'
import { StackConfiguration } from './types'

export const DevConfig: StackConfiguration = {
  project: ProdConfig.project,
  stage: 'dev',
  env: {
    account: '096007086684',
    region: 'eu-west-1',
  },
  network: {
    vpc: {
      cidr: '10.0.0.0/16',
      subnets: [
        {
          cidrMask: 24,
          name: 'public',
          subnetType: SubnetType.PUBLIC,
        },
      ],
    },
    permittedIps: [
      {
        name: 'Home Office',
        ipAddress: '84.126.215.36/32',
      },
    ],
  },
  domain: ProdConfig.domain,
}
