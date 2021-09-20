import { StackConfiguration } from '../types'

export const StackEnvConfiguration = (): StackConfiguration => ({
  project: 'test-project',
  stage: 'jest',
  env: {
    account: '000000000000',
    region: 'eu-west-1',
  },
  domain: {
    domain: 'scaling.test',
  },
})
