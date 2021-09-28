import '@aws-cdk/assert/jest'
import { App } from '@aws-cdk/core'
import { StackConfiguration, StackEnvConfiguration } from '../../config'
import { DevPermissionsStack } from './dev-permissions-stack'

jest.mock('../../config/stack-env-config')

describe('Dev Permissions Stack', () => {
  let app: App
  let stack: DevPermissionsStack

  const stackConfig: StackConfiguration = StackEnvConfiguration('jest')

  beforeEach(() => {
    app = new App()
    stack = new DevPermissionsStack(
      app,
      'MyTestConstruct',
      {
        env: stackConfig.env,
      },
      stackConfig
    )
  })

  describe('a developer role is created with the necessary permissions', () => {
    it('the role is created assumed by the account principal', () => {
      expect(stack).toHaveResourceLike('AWS::IAM::Role', {
        AssumeRolePolicyDocument: {
          Statement: [
            {
              Effect: 'Allow',
              Action: 'sts:AssumeRole',
              Condition: {
                Bool: {
                  'aws:MultiFactorAuthPresent': true,
                },
              },
              Principal: {
                AWS: {
                  'Fn::Join': [
                    '',
                    [
                      'arn:',
                      {
                        Ref: 'AWS::Partition',
                      },
                      ':iam::000000000000:root',
                    ],
                  ],
                },
              },
            },
          ],
        },
      })
    })
  })
})
