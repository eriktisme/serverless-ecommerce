import { ICertificate } from '@aws-cdk/aws-certificatemanager'
import { PublicHostedZone } from '@aws-cdk/aws-route53'
import { Construct, Stack, StackProps } from '@aws-cdk/core'
import { StackConfiguration } from '../../config'

export class CoreDomainStack extends Stack {
  public readonly zoneName: string
  public readonly publicHostedZone: PublicHostedZone
  public readonly certificate: ICertificate

  constructor(
    scope: Construct,
    id: string,
    props: StackProps,
    stackConfig: StackConfiguration
  ) {
    super(scope, id, props)

    this.zoneName = `${stackConfig.stage}.${stackConfig.domain.domain}`

    this.publicHostedZone = new PublicHostedZone(
      this,
      `${id}-public-hosted-zone`,
      {
        zoneName: this.zoneName,
      }
    )

    // this.certificate = new DnsValidatedCertificate(
    //   this,
    //   `${id}-dns-validated-certificate`,
    //   {
    //     hostedZone: this.publicHostedZone,
    //     domainName: this.zoneName,
    //     subjectAlternativeNames: [`*.${this.zoneName}`],
    //     region: 'us-east-1', // Forcing
    //   }
    // )
  }
}
