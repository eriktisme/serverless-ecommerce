import {
  BlockPublicAccess,
  Bucket,
  BucketEncryption,
  IBucket,
} from '@aws-cdk/aws-s3'
import { Construct, RemovalPolicy, Stack } from '@aws-cdk/core'

export class LibServerless extends Construct {
  public readonly bucket: IBucket

  constructor(scope: Stack, id: string) {
    super(scope, id)

    this.bucket = new Bucket(this, id, {
      bucketName: `${id}-deployment`,
      removalPolicy: RemovalPolicy.DESTROY,
      versioned: false,
      encryption: BucketEncryption.S3_MANAGED,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      publicReadAccess: false,
    })
  }
}
