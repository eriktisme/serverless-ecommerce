import { Construct, Stack, StackProps } from '@aws-cdk/core'
import { LibServerless } from '../lib-serverless'

export class ServiceFrontendApiStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props)

    new LibServerless(this, id)
  }
}
