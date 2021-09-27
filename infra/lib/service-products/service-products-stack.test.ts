import '@aws-cdk/assert/jest'
import { ResourcePart } from '@aws-cdk/assert'
import { App, RemovalPolicy } from '@aws-cdk/core'
import { StackConfiguration, StackEnvConfiguration } from '../../config'
import { ServiceProductsStack } from './service-products-stack'

jest.mock('../../config/stack-env-config')

describe('Service Products Stack', () => {
  let app: App
  let stack: ServiceProductsStack

  const stackConfig: StackConfiguration = StackEnvConfiguration('jest')

  beforeEach(() => {
    app = new App()
    stack = new ServiceProductsStack(
      app,
      'service-products',
      {
        env: stackConfig.env,
      },
      stackConfig
    )
  })

  describe('Products Table', () => {
    it('has the correct name', () => {
      expect(stack).toHaveResourceLike('AWS::DynamoDB::Table', {
        TableName: stack.resolve(stack.productsTable.tableName).name,
      })
    })

    it('has hash+range key configured', () => {
      expect(stack).toHaveResourceLike('AWS::DynamoDB::Table', {
        AttributeDefinitions: [
          { AttributeName: 'PK', AttributeType: 'S' },
          { AttributeName: 'SK', AttributeType: 'S' },
          { AttributeName: 'GS1PK', AttributeType: 'S' },
          { AttributeName: 'GS1CATEGORY', AttributeType: 'S' },
          { AttributeName: 'GS1STATUS', AttributeType: 'S' },
        ],
        KeySchema: [
          { AttributeName: 'PK', KeyType: 'HASH' },
          { AttributeName: 'SK', KeyType: 'RANGE' },
        ],
      })
    })

    it('has removal policy set to destroy', () => {
      expect(stack).toHaveResourceLike(
        'AWS::DynamoDB::Table',
        {
          UpdateReplacePolicy: 'Delete',
          DeletionPolicy: 'Delete',
        },
        ResourcePart.CompleteDefinition
      )
    })

    it('has stream configured for new and old images', () => {
      expect(stack).toHaveResourceLike('AWS::DynamoDB::Table', {
        StreamSpecification: { StreamViewType: 'NEW_AND_OLD_IMAGES' },
      })
    })
  })
})
