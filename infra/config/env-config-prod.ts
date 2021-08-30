import { StackConfiguration } from './types'

export const ProdConfig: StackConfiguration = {
  project: 'serverless-ecommerce',
  stage: 'prod',
  env: {
    account: '096007086684',
    region: 'eu-west-1',
  },
}
