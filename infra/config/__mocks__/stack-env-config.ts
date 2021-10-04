import { SubnetType } from '@aws-cdk/aws-ec2'
import { StackConfiguration } from '../types'

export const StackEnvConfiguration = (): StackConfiguration => ({
  project: 'test-project',
  stage: 'jest',
  env: {
    account: '000000000000',
    region: 'eu-west-1',
  },
  network: {
    vpc: {
      cidr: '10.60.0.0/16',
      maxAzs: 2,
      subnets: [
        {
          name: 'public',
          cidrMask: 24,
          subnetType: SubnetType.PUBLIC,
        },
        {
          name: 'private',
          cidrMask: 25,
          subnetType: SubnetType.PRIVATE_WITH_NAT,
        },
      ],
    },
  },
  domain: {
    domain: 'scaling.test',
  },
})
