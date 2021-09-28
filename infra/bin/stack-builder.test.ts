import '@aws-cdk/assert/jest'
import { App } from '@aws-cdk/core'
import { StackEnvConfiguration } from '../config'
import { StackBuilder } from './stack-builder'

describe('Stack Builder', () => {
  let stackBuilder: StackBuilder
  let app: App

  beforeEach(() => {
    app = new App()
    const stackConfig = StackEnvConfiguration('int')

    stackBuilder = new StackBuilder(app, stackConfig)
  })

  it('ensure tags are added to the core network stack resources', () => {
    expect(stackBuilder.addServiceProductsStack()).toHaveResource(
      'AWS::S3::Bucket',
      {
        Tags: [
          {
            Key: 'environment-type',
            Value: 'int',
          },
          {
            Key: 'resource-type',
            Value: 'service',
          },
        ],
      }
    )
  })
})
