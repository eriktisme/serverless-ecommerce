import { ICertificate } from '@aws-cdk/aws-certificatemanager'
import { Construct, Stack, StackProps } from '@aws-cdk/core'
import { StackConfiguration } from '../../config'
import { LibRoute53HostedZone } from '../lib-route53-hosted-zone'

export class CoreDomainStack extends Stack {
  public readonly certificate: ICertificate | undefined

  constructor(
    scope: Construct,
    id: string,
    props: StackProps,
    stackConfig: StackConfiguration
  ) {
    super(scope, id, props)

    const { certificate } = new LibRoute53HostedZone(
      this,
      `${id}-hosted-zone`,
      stackConfig
    )

    this.certificate = certificate
  }
}
