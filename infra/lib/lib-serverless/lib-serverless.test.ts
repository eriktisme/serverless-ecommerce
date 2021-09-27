import '@aws-cdk/assert/jest'
import { ResourcePart } from '@aws-cdk/assert'
import { App, Stack } from '@aws-cdk/core'
import { StackConfiguration, StackEnvConfiguration } from '../../config'
import { LibServerless } from './lib-serverless'

jest.mock('../../config/stack-env-config')

const mockStackName = 'fake-service'

describe('Lib Serverless', () => {
  let app: App
  let stack: Stack
  let library: LibServerless

  beforeEach(() => {
    app = new App()
    stack = new Stack(app)
    library = new LibServerless(stack, mockStackName)
  })

  describe('an s3 bucket is created for Serverless deployment artifacts', () => {
    it('has the correct name', () => {
      expect(stack).toHaveResource('AWS::S3::Bucket', {
        BucketName: stack.resolve(library.bucket.bucketName).name,
      })
    })

    it('has removal policy destroyable', () => {
      expect(stack).toHaveResourceLike(
        'AWS::S3::Bucket',
        {
          UpdateReplacePolicy: 'Delete',
          DeletionPolicy: 'Delete',
        },
        ResourcePart.CompleteDefinition
      )
    })

    it('has s3 managed encryption enabled', () => {
      expect(stack).toHaveResource('AWS::S3::Bucket', {
        BucketEncryption: {
          ServerSideEncryptionConfiguration: [
            {
              ServerSideEncryptionByDefault: {
                SSEAlgorithm: 'AES256',
              },
            },
          ],
        },
      })
    })

    it('has access permissions set to block all public access', () => {
      expect(stack).toHaveResource('AWS::S3::Bucket', {
        PublicAccessBlockConfiguration: {
          BlockPublicPolicy: true,
          RestrictPublicBuckets: true,
          BlockPublicAcls: true,
          IgnorePublicAcls: true,
        },
      })
    })

    // it('has bucket versioning disabled', () => {
    //   expect(stack).toHaveResource('AWS::S3::Bucket', {
    //     VersioningConfiguration: {
    //       Status: 'Disabled',
    //     },
    //   })
    // })
  })
})
