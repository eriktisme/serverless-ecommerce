import '@aws-cdk/assert/jest'
import { App } from '@aws-cdk/core'
import { StackConfiguration, StackEnvConfiguration } from '../../config'
import { CorePlatformStack } from './core-platform-stack'

jest.mock('../../config/stack-env-config')

describe('Core Platform Stack', () => {
  let app: App
  let stack: CorePlatformStack

  const stackConfig: StackConfiguration = StackEnvConfiguration('jest')

  beforeEach(() => {
    app = new App()
    stack = new CorePlatformStack(
      app,
      'MyTestConstruct',
      {
        env: stackConfig.env,
      },
      stackConfig
    )
  })

  describe('an Event Bus is created', () => {
    it('has the correct name', () => {
      expect(stack).toHaveResource('AWS::Events::EventBus', {
        Name: stack.resolve(stack.eventBus.eventBusName).name,
      })
    })

    it('has an archive attached to the event bus', () => {
      expect(stack).toHaveResource('AWS::Events::Archive', {
        SourceArn: {
          'Fn::GetAtt': ['eventbus7CF8FDD5', 'Arn'],
        },
        EventPattern: {
          account: ['000000000000'],
        },
        RetentionDays: 0,
      })
    })

    it('has the Event Bus name stored in SSM', () => {
      expect(stack).toHaveResource('AWS::SSM::Parameter', {
        Name: stack.resolve(stack.eventBusNameParameter.parameterName).name,
      })
    })

    it('has the Event Bus ARN stored in SSM', () => {
      expect(stack).toHaveResource('AWS::SSM::Parameter', {
        Name: stack.resolve(stack.eventBusArnParameter.parameterName).name,
      })
    })
  })
})
