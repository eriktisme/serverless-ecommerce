import { IHostedZone } from '@aws-cdk/aws-route53'
import { App, Tags } from '@aws-cdk/core'
import { StackConfiguration } from '../config'
import { AppAppStack } from '../lib/app-app'
import { AppWebStack } from '../lib/app-web'
import { CoreDomainStack } from '../lib/core-domain'
import { CoreNetworkStack } from '../lib/core-network'
import { CorePlatformStack } from '../lib/core-platform'
import { ServiceFrontendApiStack } from '../lib/service-frontend-api'
import { ServiceProductsStack } from '../lib/service-products'
import { ServiceUsersStack } from '../lib/service-users'
import { CoreMarketingStack } from '../lib/core-marketing'
import { CfnApp } from '@aws-cdk/aws-pinpoint'

export class StackBuilder {
  readonly app: App
  readonly stackConfig: StackConfiguration

  constructor(scope: App, stackConfig: StackConfiguration) {
    this.app = scope
    this.stackConfig = stackConfig
  }

  addCoreDomainStack(): CoreDomainStack {
    const envType = this.stackConfig.stage
    const resourceType = 'core'
    const stackName = `${envType}-core-domain`

    const stack = new CoreDomainStack(
      this.app,
      stackName,
      {
        stackName,
        description:
          'Stack to manage the core domain (e.g. public hosted zone, certificate) resources.',
        env: this.stackConfig.env,
        tags: {
          'resource-type': resourceType,
          'environment-type': envType,
        },
      },
      this.stackConfig
    )

    Tags.of(stack).add('resource-type', resourceType)
    Tags.of(stack).add('environment-type', envType)

    return stack
  }

  addCoreNetworkStack(): CoreNetworkStack {
    const envType = this.stackConfig.stage
    const resourceType = 'core'
    const stackName = `${envType}-core-network`

    const stack = new CoreNetworkStack(
      this.app,
      stackName,
      {
        stackName,
        description:
          'Stack to manage the core network (e.g. vpc, subnets, bastion) resources.',
        env: this.stackConfig.env,
        tags: {
          'resource-type': resourceType,
          'environment-type': envType,
        },
      },
      this.stackConfig
    )

    Tags.of(stack).add('resource-type', resourceType)
    Tags.of(stack).add('environment-type', envType)

    return stack
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

  addCoreMarketingStack(): CoreMarketingStack {
    const envType = this.stackConfig.stage
    const resourceType = 'core'
    const stackName = `${envType}-core-marketing`

    const stack = new CoreMarketingStack(
      this.app,
      stackName,
      {
        // certificate,
        description: 'Stack to manage the marketing (e.g. pinpoint) resources.',
        env: this.stackConfig.env,
        tags: {
          'resource-type': resourceType,
          'environment-type': envType,
        },
      },
      this.stackConfig
    )

    Tags.of(stack).add('resource-type', resourceType)
    Tags.of(stack).add('environment-type', envType)

    return stack
  }

  addServiceUsersStack(pinpoint: CfnApp): ServiceUsersStack {
    const envType = this.stackConfig.stage
    const stackName = `${envType}-service-users`

    const stack = new ServiceUsersStack(
      this.app,
      stackName,
      {
        pinpointProject: pinpoint,
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

    const stack = new ServiceFrontendApiStack(this.app, stackName, {
      stackName,
      description: 'Stack to manage the frontend api resources.',
      env: this.stackConfig.env,
      tags: {
        'resource-type': 'service',
        'environment-type': envType,
      },
    })

    Tags.of(stack).add('resource-type', 'service')
    Tags.of(stack).add('environment-type', envType)

    return stack
  }

  addAppWebStack(
    // certificate: ICertificate,
    hostedZone: IHostedZone
  ): AppWebStack {
    const envType = this.stackConfig.stage
    const resourceType = 'app'
    const stackName = `${envType}-app-web`

    const stack = new AppWebStack(
      this.app,
      stackName,
      {
        // certificate,
        hostedZone,
        stackName,
        description: 'Stack to manage the web (e.g. cloudfront) resources.',
        env: this.stackConfig.env,
        tags: {
          'resource-type': resourceType,
          'environment-type': envType,
        },
      },
      this.stackConfig
    )

    Tags.of(stack).add('resource-type', resourceType)
    Tags.of(stack).add('environment-type', envType)

    return stack
  }

  addAppAppStack(
    // certificate: ICertificate,
    hostedZone: IHostedZone
  ): AppAppStack {
    const envType = this.stackConfig.stage
    const resourceType = 'app'
    const stackName = `${envType}-app-app`

    const stack = new AppAppStack(
      this.app,
      stackName,
      {
        // certificate,
        hostedZone,
        stackName,
        description: 'Stack to manage the app (e.g. cloudfront) resources.',
        env: this.stackConfig.env,
        tags: {
          'resource-type': resourceType,
          'environment-type': envType,
        },
      },
      this.stackConfig
    )

    Tags.of(stack).add('resource-type', resourceType)
    Tags.of(stack).add('environment-type', envType)

    return stack
  }
}
