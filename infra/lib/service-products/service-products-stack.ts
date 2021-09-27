import {
  AttributeType,
  BillingMode,
  ProjectionType,
  StreamViewType,
  Table,
} from '@aws-cdk/aws-dynamodb'
import { ParameterType, StringParameter } from '@aws-cdk/aws-ssm'
import { Construct, RemovalPolicy, Stack, StackProps } from '@aws-cdk/core'
import { StackConfiguration } from '../../config'
import { LibServerless } from '../lib-serverless'

export class ServiceProductsStack extends Stack {
  public readonly productsTable: Table
  public readonly productsTableNameParameter: StringParameter
  public readonly productsTableArnParameter: StringParameter
  public readonly productsTableStreamArnParameter: StringParameter | undefined

  constructor(
    scope: Construct,
    id: string,
    props: StackProps,
    stackConfig: StackConfiguration
  ) {
    super(scope, id, props)

    new LibServerless(this, id)

    this.productsTable = new Table(
      this,
      `${stackConfig.stage}-products-table`,
      {
        tableName: `${stackConfig.stage}-products`,
        billingMode: BillingMode.PAY_PER_REQUEST,
        stream: StreamViewType.NEW_AND_OLD_IMAGES,
        partitionKey: {
          name: 'PK',
          type: AttributeType.STRING,
        },
        sortKey: {
          name: 'SK',
          type: AttributeType.STRING,
        },
        removalPolicy: RemovalPolicy.DESTROY,
      }
    )

    this.productsTable.addGlobalSecondaryIndex({
      indexName: 'GS1PK',
      partitionKey: {
        name: 'GS1PK',
        type: AttributeType.STRING,
      },
      projectionType: ProjectionType.ALL,
    })

    // https://github.com/aws/aws-cdk/issues/12246
    this.productsTable.addGlobalSecondaryIndex({
      indexName: 'GS1CATEGORY',
      partitionKey: {
        name: 'GS1CATEGORY',
        type: AttributeType.STRING,
      },
      projectionType: ProjectionType.ALL,
    })

    this.productsTable.addGlobalSecondaryIndex({
      indexName: 'GS1STATUS',
      partitionKey: {
        name: 'GS1STATUS',
        type: AttributeType.STRING,
      },
      projectionType: ProjectionType.ALL,
    })

    this.productsTableNameParameter = new StringParameter(
      this,
      'products-table-name-parameter',
      {
        parameterName: `/${stackConfig.project}/${stackConfig.stage}/products/table/name`,
        type: ParameterType.STRING,
        stringValue: this.productsTable.tableName,
      }
    )

    this.productsTableArnParameter = new StringParameter(
      this,
      'products-table-arn-parameter',
      {
        parameterName: `/${stackConfig.project}/${stackConfig.stage}/products/table/arn`,
        type: ParameterType.STRING,
        stringValue: this.productsTable.tableArn,
      }
    )

    if (this.productsTable.tableStreamArn) {
      this.productsTableStreamArnParameter = new StringParameter(
        this,
        'products-table-stream-arn-parameter',
        {
          parameterName: `/${stackConfig.project}/${stackConfig.stage}/products/table/stream-arn`,
          type: ParameterType.STRING,
          stringValue: this.productsTable.tableStreamArn,
        }
      )
    }
  }
}
