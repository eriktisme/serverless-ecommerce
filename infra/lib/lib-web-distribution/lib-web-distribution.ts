import {
  CloudFrontAllowedCachedMethods,
  CloudFrontAllowedMethods,
  CloudFrontWebDistribution,
  LambdaEdgeEventType,
  OriginAccessIdentity,
} from '@aws-cdk/aws-cloudfront'
import { EdgeFunction } from '@aws-cdk/aws-cloudfront/lib/experimental'
import { Behavior } from '@aws-cdk/aws-cloudfront/lib/web-distribution'
import { Code, Runtime } from '@aws-cdk/aws-lambda'
import {
  AaaaRecord,
  ARecord,
  IHostedZone,
  RecordTarget,
} from '@aws-cdk/aws-route53'
import { CloudFrontTarget } from '@aws-cdk/aws-route53-targets'
import { Bucket } from '@aws-cdk/aws-s3'
import { Construct, Duration, RemovalPolicy, Stack } from '@aws-cdk/core'
import * as path from 'path'

interface LibAppProps {
  readonly domain: string
  readonly hostedZone: IHostedZone
  // readonly certificate: ICertificate
}

export class LibWebDistribution extends Construct {
  public readonly sourceBucket: Bucket
  public readonly distribution: CloudFrontWebDistribution

  constructor(scope: Stack, id: string, props: LibAppProps) {
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

    let defaultBehavior: Behavior = {
      isDefaultBehavior: true,
      pathPattern: '/*',
      allowedMethods: CloudFrontAllowedMethods.GET_HEAD_OPTIONS,
      cachedMethods: CloudFrontAllowedCachedMethods.GET_HEAD,
      forwardedValues: {
        queryString: true,

        cookies: {
          forward: 'none',
        },
      },
      minTtl: Duration.seconds(0),
      defaultTtl: Duration.seconds(60),
      maxTtl: Duration.seconds(900),
      compress: true,
    }

    const staticAssetsBehavior: Behavior = {
      pathPattern: '/*.*',
      allowedMethods: CloudFrontAllowedMethods.GET_HEAD_OPTIONS,
      cachedMethods: CloudFrontAllowedCachedMethods.GET_HEAD,
      forwardedValues: {
        queryString: false,
        cookies: {
          forward: 'none',
        },
      },
      minTtl: Duration.seconds(0),
      defaultTtl: Duration.seconds(3600),
      maxTtl: Duration.seconds(86400),
      compress: true,
    }

    this.distribution = new CloudFrontWebDistribution(
      this,
      `${id}-web-distribution`,
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: this.sourceBucket,
              originAccessIdentity,
            },
            behaviors: [defaultBehavior, staticAssetsBehavior],
            // customOriginSource: {
            //   domainName: props.domain,
            // },
          },
        ],
        // aliasConfiguration: {
        //   acmCertRef: props.certificate.certificateArn,
        //   names: [props.domain],
        // },
      }
    )

    // Create the DNS entries in route53 as an alias to the new CloudFront Distribution.
    new ARecord(this, `${id}-cloudfront-alias-a-record`, {
      zone: props.hostedZone,
      recordName: props.domain,
      target: RecordTarget.fromAlias(new CloudFrontTarget(this.distribution)),
    })

    new AaaaRecord(this, `${id}-cloudfront-alias-aaaa-record`, {
      zone: props.hostedZone,
      recordName: props.domain,
      target: RecordTarget.fromAlias(new CloudFrontTarget(this.distribution)),
    })
  }
}
