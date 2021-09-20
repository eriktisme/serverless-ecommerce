import { DnsValidatedCertificate } from '@aws-cdk/aws-certificatemanager'
import { PublicHostedZone } from '@aws-cdk/aws-route53'
import { Construct, Stack } from '@aws-cdk/core'
import { StackConfiguration } from '../../config'

export class LibRoute53HostedZone extends Construct {
  public readonly zoneName: string
  public readonly publicHostedZone: PublicHostedZone
  public readonly certificate: DnsValidatedCertificate | undefined

  constructor(scope: Stack, id: string, stackConfig: StackConfiguration) {
    super(scope, id)

    this.zoneName = `${stackConfig.stage}.${stackConfig.domain.domain}`

    this.publicHostedZone = new PublicHostedZone(
      this,
      `${id}-public-hosted-zone`,
      {
        zoneName: this.zoneName,
      }
    )

    // this.certificate = new DnsValidatedCertificate(this, `${id}-certificate`, {
    //   domainName: `*.${this.zoneName}`,
    //   hostedZone: this.publicHostedZone,
    // })
  }
}
