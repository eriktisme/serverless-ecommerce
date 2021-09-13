import { App, Tags } from '@aws-cdk/core'
import { StackConfiguration } from '../config'
import { CorePlatformStack } from '../lib/core-platform'
import { ServiceFrontendApiStack } from '../lib/service-frontend-api'
import { ServiceProductsStack } from '../lib/service-products'
import { ServiceUsersStack } from '../lib/service-users'

export class StackBuilder {
  readonly app: App
  readonly stackConfig: StackConfiguration

  constructor(scope: App, stackConfig: StackConfiguration) {
    this.app = scope
    this.stackConfig = stackConfig
  }

  addCorePlatformStack(): CorePlatformStack {
    const envType = this.stackConfig.stage
    const stackName = `${envType}-core-platform`

    const stack = new CorePlatformStack(
      this.app,
      stackName,
      {
        stackName,
        description:
          'Stack to manage the core platform (e.g. event bridge) resources.',
        env: this.stackConfig.env,
        tags: {
          'resource-type': 'core',
          'environment-type': envType,
        },
      },
      this.stackConfig
    )

    Tags.of(stack).add('resource-type', 'core')
    Tags.of(stack).add('environment-type', envType)

    return stack
  }

  addServiceUsersStack(): ServiceUsersStack {
    const envType = this.stackConfig.stage
    const stackName = `${envType}-service-users`

    const stack = new ServiceUsersStack(
      this.app,
      stackName,
      {
        stackName,
        description:
          'Stack to manage the user service (e.g. user pool, user pool client) resources.',
        env: this.stackConfig.env,
        tags: {
          'resource-type': 'service',
          'environment-type': envType,
        },
      },
      this.stackConfig
    )

    Tags.of(stack).add('resource-type', 'service')
    Tags.of(stack).add('environment-type', envType)

    return stack
  }

  addServiceProductsStack(): ServiceProductsStack {
    const envType = this.stackConfig.stage
    const stackName = `${envType}-service-products`

    const stack = new ServiceProductsStack(
      this.app,
      stackName,
      {
        stackName,
        description:
          'Stack to manage the products service (e.g. dynamodb table) resources.',
        env: this.stackConfig.env,
        tags: {
          'resource-type': 'service',
          'environment-type': envType,
        },
      },
      this.stackConfig
    )

    Tags.of(stack).add('resource-type', 'service')
    Tags.of(stack).add('environment-type', envType)

    return stack
  }

  addServiceFrontendApiStack(): ServiceFrontendApiStack {
    const envType = this.stackConfig.stage
    const stackName = `${envType}-service-frontend-api`

    const stack = new ServiceFrontendApiStack(
      this.app,
      stackName,
      {
        stackName,
        description: 'Stack to manage the frontend api resources.',
        env: this.stackConfig.env,
        tags: {
          'resource-type': 'service',
          'environment-type': envType,
        },
      },
      this.stackConfig
    )

    Tags.of(stack).add('resource-type', 'service')
    Tags.of(stack).add('environment-type', envType)

    return stack
  }
}
