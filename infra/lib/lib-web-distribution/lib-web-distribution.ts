import { ICertificate } from '@aws-cdk/aws-certificatemanager'
import {
  CloudFrontWebDistribution,
  OriginAccessIdentity,
} from '@aws-cdk/aws-cloudfront'
import { Bucket } from '@aws-cdk/aws-s3'
import { Construct, RemovalPolicy, Stack } from '@aws-cdk/core'
import { StackConfiguration } from '../../config'

interface LibAppProps {
  readonly domain: string
  readonly certificate?: ICertificate
}

export class LibWebDistribution extends Construct {
  public readonly sourceBucket: Bucket
  public readonly distribution: CloudFrontWebDistribution

  constructor(
    scope: Stack,
    id: string,
    props: LibAppProps,
    stackConfig: StackConfiguration
  ) {
    super(scope, id)

    this.sourceBucket = new Bucket(this, `${id}-source`, {
      bucketName: `${id}-source`,
      removalPolicy: RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html',
    })

    const originAccessIdentity = new OriginAccessIdentity(
      this,
      `${id}-origin-access-identity`,
      {
        comment: 'Setup access from CloudFront to the source bucket (read).',
      }
    )

    this.sourceBucket.grantRead(originAccessIdentity)

    this.distribution = new CloudFrontWebDistribution(
      this,
      `${id}-web-distribution`,
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: this.sourceBucket,
              originAccessIdentity: originAccessIdentity,
            },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
        // aliasConfiguration: {
        //   acmCertRef: props.certificate.certificateArn,
        //   names: [`*.${stackConfig.stage}.${props.domain}`], // TODO: Change wildcard to actual domain
        // },
      }
    )

    // Create the wildcard DNS entry in route53 as an alias to the new CloudFront Distribution.
    // new ARecord(this, 'AliasRecord', {
    //   zone,
    //   recordName: subDomain,
    //   target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(cfDist)),
    // });
  }
}
