import { ICertificate } from '@aws-cdk/aws-certificatemanager'
import { Construct, Stack, StackProps } from '@aws-cdk/core'
import { StackConfiguration } from '../../config'
import { LibServerless } from '../lib-serverless'
import { LibWebDistribution } from '../lib-web-distribution'

interface AppWebStackProps extends StackProps {
  readonly certificate: ICertificate | undefined
}

export class AppWebStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    props: AppWebStackProps,
    stackConfig: StackConfiguration
  ) {
    super(scope, id, props)

    new LibServerless(this, 'app-web')

    new LibWebDistribution(
      this,
      'app-web-app',
      {
        certificate: props.certificate,
        domain: `web.${stackConfig.stage}.${stackConfig.domain.domain}`,
      },
      stackConfig
    )
  }
}
