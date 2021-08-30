import { ProdConfig } from './env-config-prod'
import { StackConfiguration } from './types'

export const IntConfig: StackConfiguration = {
  project: ProdConfig.project,
  stage: 'int',
  env: {
    account: '096007086684',
    region: 'eu-west-1',
  },
}
