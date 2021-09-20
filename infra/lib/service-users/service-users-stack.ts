import {
  CfnUserPoolGroup,
  UserPool,
  UserPoolClient,
} from '@aws-cdk/aws-cognito'
import { ParameterType, StringParameter } from '@aws-cdk/aws-ssm'
import { Construct, RemovalPolicy, Stack, StackProps } from '@aws-cdk/core'
import { StackConfiguration } from '../../config'
import { LibServerless } from '../lib-serverless'

export class ServiceUsersStack extends Stack {
  public readonly userPool: UserPool
  public readonly userPoolClient: UserPoolClient
  public readonly userPoolIdParameter: StringParameter
  public readonly userPoolArnParameter: StringParameter
  public readonly userPoolAdminGroup: CfnUserPoolGroup

  constructor(
    scope: Construct,
    id: string,
    props: StackProps,
    stackConfig: StackConfiguration
  ) {
    super(scope, id, props)

    new LibServerless(this, id)

    this.userPool = new UserPool(this, 'user-pool', {
      userPoolName: `${stackConfig.stage}-${stackConfig.project}-user-pool`,
      removalPolicy: RemovalPolicy.DESTROY,
      selfSignUpEnabled: true,
      autoVerify: {
        email: true,
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: false,
        requireUppercase: false,
        requireDigits: false,
        requireSymbols: false,
      },
      standardAttributes: {
        email: {
          required: true,
          mutable: true,
        },
      },
    })

    this.userPoolClient = new UserPoolClient(this, 'user-pool-web-client', {
      userPool: this.userPool,
      userPoolClientName: 'web',
      generateSecret: false,
      // refreshTokenValidity: Duration.days(30),
    })

    this.userPoolAdminGroup = new CfnUserPoolGroup(
      this,
      'user-pool-group-admin',
      {
        userPoolId: this.userPool.userPoolId,
        groupName: 'admin',
        description: 'The administrators group',
      }
    )

    this.userPoolIdParameter = new StringParameter(
      this,
      'user-pool-id-parameter',
      {
        parameterName: `/${stackConfig.project}/${stackConfig.stage}/users/user-pool/id`,
        type: ParameterType.STRING,
        stringValue: this.userPool.userPoolId,
      }
    )

    this.userPoolArnParameter = new StringParameter(
      this,
      'user-pool-arn-parameter',
      {
        parameterName: `/${stackConfig.project}/${stackConfig.stage}/users/user-pool/arn`,
        type: ParameterType.STRING,
        stringValue: this.userPool.userPoolArn,
      }
    )
  }
}
