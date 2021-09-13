import '@aws-cdk/assert/jest'
import { App } from '@aws-cdk/core'
import { StackConfiguration, StackEnvConfiguration } from '../../config'
import { ServiceFrontendApiStack } from './service-frontend-api-stack'

jest.mock('../../config/stack-env-config')

describe('Service Frontend Api Stack', () => {
  let app: App
  let stack: ServiceFrontendApiStack

  const stackConfig: StackConfiguration = StackEnvConfiguration('jest')

  beforeEach(() => {
    app = new App()
    stack = new ServiceFrontendApiStack(
      app,
      'service-frontend-api',
      {
        env: stackConfig.env,
      },
      stackConfig
    )
  })
})
