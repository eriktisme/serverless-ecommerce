import '@aws-cdk/assert/jest'
import { App } from '@aws-cdk/core'
import { StackConfiguration, StackEnvConfiguration } from '../../config'
import { CoreDomainStack } from './core-domain-stack'

jest.mock('../../config/stack-env-config')

describe('Core Domain Stack', () => {
  let app: App
  let stack: CoreDomainStack

  const stackConfig: StackConfiguration = StackEnvConfiguration('jest')

  beforeEach(() => {
    app = new App()
    stack = new CoreDomainStack(
      app,
      'core-domain',
      {
        env: stackConfig.env,
      },
      stackConfig
    )
  })

  describe('an Public Hosted Zone is created', () => {
    it('has the correct zone name', () => {
      expect(stack).toHaveResource('AWS::Route53::HostedZone', {
        Name: stack.resolve(stack.publicHostedZone.zoneName).name,
      })
    })
  })
})
