import { IHostedZone } from '@aws-cdk/aws-route53'
import { Construct, Stack, StackProps } from '@aws-cdk/core'
import { StackConfiguration } from '../../config'
import { LibWebDistribution } from '../lib-web-distribution'

interface AppWebStackProps extends StackProps {
  readonly hostedZone: IHostedZone
  // readonly certificate: ICertificate
}

export class AppWebStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    props: AppWebStackProps,
    stackConfig: StackConfiguration
  ) {
    super(scope, id, props)

    new LibWebDistribution(this, 'app-web-app', {
      domain: `web.${stackConfig.stage}.${stackConfig.domain.domain}`,
      hostedZone: props.hostedZone,
      // certificate: props.certificate,
    })
  }
}
