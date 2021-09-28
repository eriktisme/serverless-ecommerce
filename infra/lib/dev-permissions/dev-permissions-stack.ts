import {
  AccountPrincipal,
  Effect,
  Group,
  ManagedPolicy,
  PolicyStatement,
  Role,
} from '@aws-cdk/aws-iam'
import { Construct, Stack, StackProps } from '@aws-cdk/core'
import { StackConfiguration } from '../../config'

export class DevPermissionsStack extends Stack {
  readonly developerRole: Role

  constructor(
    scope: Construct,
    id: string,
    props: StackProps,
    stackConfig: StackConfiguration
  ) {
    super(scope, id, props)

    const accountPrincipal = new AccountPrincipal(Stack.of(this).account)

    const developerRoleName = `${stackConfig.stage}-developer-role`
    this.developerRole = new Role(this, developerRoleName, {
      roleName: developerRoleName,
      assumedBy: accountPrincipal.withConditions({
        Bool: { 'aws:MultiFactorAuthPresent': true },
      }),
    })

    // TODO: Revisit actions and resources for stricter security
    const developerPolicyName = `${stackConfig.stage}-developer-role-policy`
    new ManagedPolicy(this, developerPolicyName, {
      managedPolicyName: developerPolicyName,
      roles: [this.developerRole],
      statements: [
        new PolicyStatement({
          sid: 'Admin',
          effect: Effect.ALLOW,
          actions: ['*'],
          resources: ['*'],
        }),
      ],
    })

    const developerGroupName = `${stackConfig.stage}-developer-group`
    const developerGroup = new Group(this, developerGroupName, {
      groupName: developerGroupName,
    })
    const developerGroupPolicyName = `${stackConfig.stage}-developer-group-policy`
    new ManagedPolicy(this, developerGroupPolicyName, {
      managedPolicyName: developerGroupPolicyName,
      groups: [developerGroup],
      statements: [
        new PolicyStatement({
          sid: 'AssumeRole',
          effect: Effect.ALLOW,
          actions: ['sts:AssumeRole'],
          resources: [this.developerRole.roleArn],
        }),
      ],
    })
  }
}
