import '@aws-cdk/assert/jest'
import { PublicHostedZone } from '@aws-cdk/aws-route53'
import { App, Stack } from '@aws-cdk/core'
import { LibWebDistribution } from './lib-web-distribution'

jest.mock('../../config/stack-env-config')

const mockStackName = 'fake-service'

describe('Lib Web Distribution', () => {
  let app: App
  let stack: Stack
  let library: LibWebDistribution

  beforeEach(() => {
    app = new App()
    stack = new Stack(app)
    library = new LibWebDistribution(stack, mockStackName, {
      domain: 'scaling.test',
      hostedZone: new PublicHostedZone(new Stack(app, 'FakeConstructApp2'), 'FakeConstruct', {
        zoneName: 'scaling.test',
      }),
      ssr: false,
    })
  })

  describe('an s3 bucket is created for Web distribution source', () => {
    it('has the correct name', () => {
      expect(stack).toHaveResource('AWS::S3::Bucket', {
        BucketName: stack.resolve(library.sourceBucket.bucketName).name,
      })
    })
  })

  describe('a CloudFront Distribution', () => {
    xit('has the correct domain name', () => {
      expect(stack).toHaveResource('AWS::CloudFront::Distribution', {
        //
      })
    })

    xit('has configured lambda@edge', () => {})
  })
})
