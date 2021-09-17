import AWS from 'aws-sdk'
import AWSMock from 'aws-sdk-mock'
import { ddbToEvent, sendEvents } from '../src'

const EVENT_BUS_NAME = 'EVENT_BUS_NAME'
const SOURCE = 'SOURCE'
const OBJECT_TYPE = 'Product'
const RESOURCE_KEY = 'PK'

describe('it transforms DynamoDB records in to events', () => {
  it('created a created event with an insert record', () => {
    const record = {
      awsRegion: 'eu-west-1',
      dynamodb: {
        Keys: {
          PK: { S: 'PRODUCT#123' },
          SK: { S: 'PRODUCT' },
        },
        NewImage: {
          productId: { S: '123' },
          name: { S: 'PlayStation 5' },
        },
        SequenceNumber: '123',
        SizeBytes: 123,
        StreamViewType: 'NEW_AND_OLD_IMAGES',
      },
      eventID: '644766b7-0d70-446f-991f-0d6ab9444cf4',
      eventName: 'INSERT',
      eventSource: 'aws:dynamodb',
      eventVersion: '1.0',
    }

    const expectedOutput = {
      Source: SOURCE,
      Resources: ['PRODUCT#123'],
      DetailType: 'ProductCreated',
      Detail: JSON.stringify({ productId: '123', name: 'PlayStation 5' }),
      EventBusName: EVENT_BUS_NAME,
    }

    const actualOutput = ddbToEvent(
      record,
      EVENT_BUS_NAME,
      SOURCE,
      OBJECT_TYPE,
      RESOURCE_KEY
    )

    expect(actualOutput).toMatchObject(expectedOutput)
  })

  it('created a deleted event with a remove record', () => {
    const record = {
      awsRegion: 'eu-west-1',
      dynamodb: {
        Keys: {
          PK: { S: 'PRODUCT#123' },
          SK: { S: 'PRODUCT' },
        },
        OldImage: {
          productId: { S: '123' },
          name: { S: 'PlayStation 5' },
        },
        SequenceNumber: '123',
        SizeBytes: 123,
        StreamViewType: 'NEW_AND_OLD_IMAGES',
      },
      eventID: '644766b7-0d70-446f-991f-0d6ab9444cf4',
      eventName: 'REMOVE',
      eventSource: 'aws:dynamodb',
      eventVersion: '1.0',
    }

    const expectedOutput = {
      Source: SOURCE,
      Resources: ['PRODUCT#123'],
      DetailType: 'ProductDeleted',
      Detail: JSON.stringify({ productId: '123', name: 'PlayStation 5' }),
      EventBusName: EVENT_BUS_NAME,
    }

    const actualOutput = ddbToEvent(
      record,
      EVENT_BUS_NAME,
      SOURCE,
      OBJECT_TYPE,
      RESOURCE_KEY
    )

    expect(actualOutput).toMatchObject(expectedOutput)
  })

  it('created a updated event with a modify record', () => {
    const record = {
      awsRegion: 'eu-west-1',
      dynamodb: {
        Keys: {
          PK: { S: 'PRODUCT#123' },
          SK: { S: 'PRODUCT' },
        },
        NewImage: {
          productId: { S: '123' },
          name: { S: 'PlayStation 5' },
          price: { N: '100' },
        },
        OldImage: {
          productId: { S: '123' },
          name: { S: 'PlayStation 5' },
          price: { N: '200' },
        },
        SequenceNumber: '123',
        SizeBytes: 123,
        StreamViewType: 'NEW_AND_OLD_IMAGES',
      },
      eventID: '644766b7-0d70-446f-991f-0d6ab9444cf4',
      eventName: 'MODIFY',
      eventSource: 'aws:dynamodb',
      eventVersion: '1.0',
    }

    const expectedOutput = {
      Source: SOURCE,
      Resources: ['PRODUCT#123'],
      DetailType: 'ProductModified',
      Detail: JSON.stringify({
        new: { productId: '123', name: 'PlayStation 5', price: 100 },
        old: { productId: '123', name: 'PlayStation 5', price: 200 },
        changed: ['price'],
      }),
      EventBusName: EVENT_BUS_NAME,
    }

    const actualOutput = ddbToEvent(
      record,
      EVENT_BUS_NAME,
      SOURCE,
      OBJECT_TYPE,
      RESOURCE_KEY
    )

    expect(actualOutput).toMatchObject(expectedOutput)
  })
})

describe('Sends Events', () => {
  it('sends events', async () => {
    const event = {
      Source: SOURCE,
      Resources: ['PRODUCT#123'],
      DetailType: 'ProductCreated',
      Detail: JSON.stringify({ productId: '123', name: 'PlayStation 5' }),
      EventBusName: EVENT_BUS_NAME,
    }

    const expectedParams = { Entries: [event] }

    AWSMock.setSDKInstance(AWS)
    AWSMock.mock('EventBridge', 'putEvents', (_, callback: Function) => {
      callback(null, expectedParams)
    })

    const spy = jest.spyOn(global.console, 'info').mockImplementation()

    const eventBridge = new AWS.EventBridge({
      apiVersion: '2015-10-07',
    })

    await sendEvents(eventBridge, [event])

    expect(console.info).toBeCalledTimes(1)

    spy.mockRestore()

    AWSMock.restore('EventBridge')
  })
})
