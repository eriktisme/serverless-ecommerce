import '@aws-cdk/assert/jest'
import { App } from '@aws-cdk/core'
import { DefaultInstanceTenancy } from '@aws-cdk/aws-ec2'
import { StackConfiguration, StackEnvConfiguration } from '../../config'
import { CoreNetworkStack } from './core-network-stack'

jest.mock('../../config/stack-env-config')

describe('Core Network Stack', () => {
  let app: App
  let stack: CoreNetworkStack

  const stackConfig: StackConfiguration = StackEnvConfiguration('jest')
  beforeEach(() => {
    app = new App()
    stack = new CoreNetworkStack(
      app,
      'jest',
      {
        env: stackConfig.env,
      },
      stackConfig
    )
  })

  it('has a Virtual Private Network (vpc)', () => {
    expect(stack).toHaveResource('AWS::EC2::VPC')
  })

  it('has cidr range as per stack configuration', () => {
    expect(stack).toHaveResource('AWS::EC2::VPC', {
      CidrBlock: stackConfig.network.vpc.cidr,
    })
  })

  it('has maximum number of AZs to use in this region as per stack config', () => {
    expect(stack.vpc.availabilityZones.length).toBe(
      stackConfig.network.vpc.maxAzs
    )
  })

  it('has DNS support enabled to support DNS resolution for the VPC', () => {
    expect(stack).toHaveResource('AWS::EC2::VPC', {
      EnableDnsSupport: true,
    })
  })

  it('has DNS Host name support enabled for instances launched to allow public DNS hostnames', () => {
    expect(stack).toHaveResource('AWS::EC2::VPC', {
      EnableDnsHostnames: true,
    })
  })

  it('has default tenancy of instances launched into the VPC', () => {
    expect(stack).toHaveResource('AWS::EC2::VPC', {
      InstanceTenancy: DefaultInstanceTenancy.DEFAULT,
    })
  })

  describe('Flow Logs', () => {
    it('is enabled and points to CloudWatch Logs', () => {
      expect(stack).toHaveResourceLike('AWS::EC2::FlowLog', {
        TrafficType: 'ALL',
        LogDestinationType: 'cloud-watch-logs',
      })
    })
  })

  describe('Bastion Host', () => {
    expect(stack).toHaveResourceLike('AWS::EC2::Instance', {
      InstanceType: 't3.nano',
    })
  })
})
