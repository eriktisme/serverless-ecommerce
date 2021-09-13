import { Construct, Stack, StackProps } from '@aws-cdk/core'
import { StackConfiguration } from '../../config'
import { LibServerless } from '../lib-serverless'

export class ServiceFrontendApiStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    props: StackProps,
    stackConfig: StackConfiguration
  ) {
    super(scope, id, props)

    new LibServerless(this, id, props, stackConfig)
  }
}
