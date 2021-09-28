import '@aws-cdk/assert/jest'
import { App, Stack } from '@aws-cdk/core'
import { StackConfiguration, StackEnvConfiguration } from '../../config'
import { ServiceUsersStack } from './service-users-stack'
import { CfnApp } from '@aws-cdk/aws-pinpoint'

jest.mock('../../config/stack-env-config')

describe('Service Users Stack', () => {
  let app: App
  let stack: ServiceUsersStack

  const stackConfig: StackConfiguration = StackEnvConfiguration('jest')

  beforeEach(() => {
    app = new App()
    stack = new ServiceUsersStack(
      app,
      'service-users',
      {
        env: stackConfig.env,
        pinpointProject: new CfnApp(
          new Stack(app, 'MyFakeStack2', {
            env: stackConfig.env,
          }),
          'my-fake-pinpoint-project',
          { name: 'fake-pinpoint-project' }
        ),
      },
      stackConfig
    )
  })

  describe('an User Pool is created', () => {
    it('has the correct name', () => {
      expect(stack).toHaveResource('AWS::Cognito::UserPool', {
        UserPoolName: stack.resolve(stack.userPool.userPoolProviderName).name,
      })
    })

    it('has a user pool web client attached', () => {
      expect(stack).toHaveResource('AWS::Cognito::UserPoolClient', {
        UserPoolId: stack.resolve(stack.userPool.userPoolId),
        ClientName: stack.resolve(stack.userPoolClient.userPoolClientName).name,
      })
    })

    // TODO: Add specific tests for user pool configuration

    it('has the User Pool ID stored in SSM', () => {
      expect(stack).toHaveResource('AWS::SSM::Parameter', {
        Name: stack.resolve(stack.userPool.userPoolId).name,
      })
    })

    it('has the User Pool ARN stored in SSM', () => {
      expect(stack).toHaveResource('AWS::SSM::Parameter', {
        Name: stack.resolve(stack.userPool.userPoolArn).name,
      })
    })
  })
})
