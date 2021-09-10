import { Archive, EventBus } from '@aws-cdk/aws-events'
import { ParameterType, StringParameter } from '@aws-cdk/aws-ssm'
import { Construct, Stack, StackProps } from '@aws-cdk/core'
import { StackConfiguration } from '../../config'

export interface CorePlatformStackProps extends StackProps {
  //
}

export class CorePlatformStack extends Stack {
  public readonly eventBus: EventBus
  public readonly eventBusNameParameter: StringParameter
  public readonly eventBusArnParameter: StringParameter

  constructor(
    scope: Construct,
    id: string,
    props: CorePlatformStackProps,
    stackConfig: StackConfiguration
  ) {
    super(scope, id, props)

    this.eventBus = new EventBus(this, 'event-bus', {
      eventBusName: `${stackConfig.stage}-${stackConfig.project}-event-bus`,
    })

    new Archive(this, 'event-bus-archive', {
      sourceEventBus: this.eventBus,
      eventPattern: {
        account: [this.account],
      },
      // retention: Duration.days(10),
    })

    this.eventBusNameParameter = new StringParameter(
      this,
      'event-bus-name-parameter',
      {
        parameterName: `/${stackConfig.project}/${stackConfig.stage}/platform/event-bus/name`,
        type: ParameterType.STRING,
        stringValue: this.eventBus.eventBusName,
      }
    )

    this.eventBusArnParameter = new StringParameter(
      this,
      'event-bus-arn-parameter',
      {
        parameterName: `/${stackConfig.project}/${stackConfig.stage}/platform/event-bus/arn`,
        type: ParameterType.STRING,
        stringValue: this.eventBus.eventBusArn,
      }
    )
  }
}
