import '@aws-cdk/assert/jest'
import { App } from '@aws-cdk/core'
import { StackConfiguration, StackEnvConfiguration } from '../../config'
import { CoreMarketingStack } from './core-marketing-stack'

jest.mock('../../config/stack-env-config')

describe('Core Marketing Stack', () => {
  let app: App
  let stack: CoreMarketingStack

  const stackConfig: StackConfiguration = StackEnvConfiguration('jest')

  beforeEach(() => {
    app = new App()
    stack = new CoreMarketingStack(
      app,
      'MyTestConstruct',
      {
        env: stackConfig.env,
      },
      stackConfig
    )
  })

  describe('an PinPoint project is created', () => {
    it('has the correct name', () => {
      expect(stack).toHaveResource('AWS::Pinpoint::App', {
        Name: stack.resolve(stack.pinpoint.name).name,
      })
    })

    it('has the PinPoint project ID in SSM', () => {
      expect(stack).toHaveResource('AWS::SSM::Parameter', {
        Name: stack.resolve(stack.pinpoint.ref).name,
      })
    })

    it('has the PinPoint project ARN in SSM', () => {
      expect(stack).toHaveResource('AWS::SSM::Parameter', {
        Name: stack.resolve(stack.pinpoint.attrArn).name,
      })
    })
  })
})
