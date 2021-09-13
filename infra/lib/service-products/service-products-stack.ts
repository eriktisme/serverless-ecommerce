import { AttributeType, BillingMode, ProjectionType, StreamViewType, Table } from '@aws-cdk/aws-dynamodb'
import { ParameterType, StringParameter } from '@aws-cdk/aws-ssm'
import { Construct, RemovalPolicy, Stack, StackProps } from '@aws-cdk/core'
import { StackConfiguration } from '../../config'
import { LibServerless } from '../lib-serverless'

export class ServiceProductsStack extends Stack {
  public readonly productsTable: Table
  public readonly productsTableNameParameter: StringParameter

  constructor(
    scope: Construct,
    id: string,
    props: StackProps,
    stackConfig: StackConfiguration
  ) {
    super(scope, id, props)

    new LibServerless(this, id, props, stackConfig)

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
      readCapacity: 1,
      writeCapacity: 1,
    })

    // https://github.com/aws/aws-cdk/issues/12246
    this.productsTable.addGlobalSecondaryIndex({
      indexName: 'GS1SK',
      partitionKey: {
        name: 'GS1SK',
        type: AttributeType.STRING,
      },
      projectionType: ProjectionType.ALL,
      readCapacity: 1,
      writeCapacity: 1,
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
  }
}
