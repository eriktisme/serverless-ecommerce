import { ProdConfig } from './env-config-prod'
import { StackConfiguration } from './types'

export const DevConfig: StackConfiguration = {
  project: ProdConfig.project,
  stage: 'dev',
  env: {
    account: '096007086684',
    region: 'eu-west-1',
  },
}
