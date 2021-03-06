#!/usr/bin/env node
import 'source-map-support/register'
import { App } from '@aws-cdk/core'

import { StackEnvConfiguration } from '../config'
import { StackBuilder } from './stack-builder'

const app = new App()

const configContext = app.node.tryGetContext('config') || process.env.CONFIG
const stackConfig = StackEnvConfiguration(configContext)

const stackBuilder = new StackBuilder(app, stackConfig)

switch (stackConfig.stage) {
  case 'dev':
  case 'int': {
    stackBuilder.addCorePlatformStack()
    const { pinpoint } = stackBuilder.addCoreMarketingStack()
    stackBuilder.addServiceUsersStack(pinpoint)
    stackBuilder.addServiceProductsStack()
    stackBuilder.addServiceFrontendApiStack()

    const { publicHostedZone } = stackBuilder.addCoreDomainStack()
    stackBuilder.addAppWebStack(publicHostedZone)
    stackBuilder.addAppAppStack(publicHostedZone)

    break
  }
  case 'live': {
    //
  }
}
