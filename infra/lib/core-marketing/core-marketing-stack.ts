import { Construct, Stack, StackProps } from '@aws-cdk/core'
import { StackConfiguration } from '../../config'
import { CfnApp } from '@aws-cdk/aws-pinpoint'
import { ParameterType, StringParameter } from '@aws-cdk/aws-ssm'

export class CoreMarketingStack extends Stack {
  public readonly pinpoint: CfnApp
  public readonly pinpointArnParameter: StringParameter

  constructor(
    scope: Construct,
    id: string,
    props: StackProps,
    stackConfig: StackConfiguration
  ) {
    super(scope, id, props)

    this.pinpoint = new CfnApp(this, 'pinpoint-project', {
      name: `${stackConfig.stage}-pinpoint`,
    })

    this.pinpointArnParameter = new StringParameter(
      this,
      'pinpoint-project-id',
      {
        parameterName: `/${stackConfig.project}/${stackConfig.stage}/marketing/pinpoint/id`,
        type: ParameterType.STRING,
        stringValue: this.pinpoint.ref,
      }
    )

    this.pinpointArnParameter = new StringParameter(
      this,
      'pinpoint-project-arn',
      {
        parameterName: `/${stackConfig.project}/${stackConfig.stage}/marketing/pinpoint/arn`,
        type: ParameterType.STRING,
        stringValue: this.pinpoint.attrArn,
      }
    )
  }
}
