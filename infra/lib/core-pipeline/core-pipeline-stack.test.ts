import '@aws-cdk/assert/jest'
import { App } from '@aws-cdk/core'
import { StackConfiguration, StackEnvConfiguration } from '../../config'
import { CorePipelineStack } from './core-pipeline-stack'

jest.mock('../../config/stack-env-config')

const mockStackName = 'jest'

describe('Core Pipeline Stack', () => {
  let app: App
  let stack: CorePipelineStack

  const stackConfig: StackConfiguration = StackEnvConfiguration(mockStackName)

  beforeEach(() => {
    app = new App()
    stack = new CorePipelineStack(
      app,
      'MyTestConstruct',
      {
        env: stackConfig.env,
      },
      stackConfig
    )
  })

  describe('GitHub Actions', () => {
    it('a user is created', () => {
      expect(stack).toHaveResource('AWS::IAM::User', {
        UserName: stack.resolve(stack.user.userName).name,
      })
    })

    it('a group is created', () => {
      expect(stack).toHaveResource('AWS::IAM::Group', {
        GroupName: stack.resolve(stack.group.groupName).name,
      })
    })

    it('a user is attached to the group', () => {
      expect(stack).toHaveResource('AWS::IAM::User', {
        Groups: [
          {
            Ref: 'githubactionsgroup8C219C09',
          },
        ],
        UserName: stack.resolve(stack.user.userName).name,
      })
    })
  })

  describe('Infra Policy', () => {
    it('has a named managed policy', () => {
      expect(stack).toHaveResourceLike('AWS::IAM::ManagedPolicy', {
        ManagedPolicyName: stack.resolve(stack.managedPolicy.managedPolicyName)
          .name,
        Description: stack.resolve(stack.managedPolicy.description).name,
      })
    })

    it('has a named managed policy attached to group', () => {
      expect(stack).toHaveResourceLike('AWS::IAM::ManagedPolicy', {
        Groups: [stack.resolve(stack.group.groupName)],
      })
    })

    it('has permissions for effective infrastructure management', () => {
      expect(stack).toHaveResource('AWS::IAM::ManagedPolicy', {
        PolicyDocument: {
          Statement: [
            {
              Action: [
                'iam:CreateInstanceProfile',
                'iam:AddRoleToInstanceProfile',
                'iam:ListInstanceProfilesForRole',
                'iam:RemoveRoleFromInstanceProfile',
                'iam:DeleteInstanceProfile',
                'iam:GetInstanceProfile',
                'iam:CreateRole',
                'iam:GetRole',
                'iam:DeleteRole',
                'iam:PassRole',
                'iam:TagRole',
                'iam:AttachRolePolicy',
                'iam:DetachRolePolicy',
                'iam:CreatePolicy',
                'iam:GetPolicy',
                'iam:DeletePolicy',
                'iam:CreateServiceLinkedRole',
                'iam:CreatePolicyVersion',
                'iam:ListPolicyVersions',
                'iam:DeletePolicyVersion',
              ],
              Effect: 'Allow',
              Resource: '*',
            },
          ],
          Version: '2012-10-17',
        },
      })
    })
  })
})
