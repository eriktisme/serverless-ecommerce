import { StackConfiguration } from './types'

export const ProdConfig: StackConfiguration = {
  project: 'serverless-ecommerce',
  stage: 'prod',
  env: {
    account: '096007086684',
    region: 'eu-west-1',
  },
  network: { vpc: { cidr: '10.40.0.0/16', maxAzs: 2, subnets: [] } },
  domain: {
    domain: 'scaling.cloud',
  },
}
