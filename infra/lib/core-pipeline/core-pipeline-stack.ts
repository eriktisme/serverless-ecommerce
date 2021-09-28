import {
  Effect,
  Group,
  IGroup,
  ManagedPolicy,
  PolicyStatement,
  User,
} from '@aws-cdk/aws-iam'
import { Construct, Stack, StackProps } from '@aws-cdk/core'
import { StackConfiguration } from '../../config'

export class CorePipelineStack extends Stack {
  public readonly group: IGroup
  public readonly user: User
  public readonly managedPolicy: ManagedPolicy

  constructor(
    scope: Construct,
    id: string,
    props: StackProps,
    stackConfig: StackConfiguration
  ) {
    super(scope, id, props)

    this.group = new Group(this, 'github-actions-group', {
      groupName: `${stackConfig.stage}-github-actions-group`,
    })

    this.user = new User(this, 'github-actions-user', {
      userName: `${stackConfig.stage}-github-actions-user`,
      groups: [this.group],
    })

    this.managedPolicy = new ManagedPolicy(this, 'infra-policy', {
      managedPolicyName: `${stackConfig.stage}-infra-policy`,
      description: 'The infrastructure resources management policy.',
      groups: [this.group],
      statements: [
        new PolicyStatement({
          resources: ['*'],
          effect: Effect.ALLOW,
          actions: [
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
        }),
      ],
    })
  }
}
