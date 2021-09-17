import { DynamoDB, DynamoDBStreams, EventBridge } from 'aws-sdk'
import { PutEventsRequestEntry } from 'aws-sdk/clients/eventbridge'

interface DynamoDbRecordData {}

/**
 * Transforming a DynamoDB Streams record into an EventBridge event.
 */
export function ddbToEvent(
  record: DynamoDBStreams.Record,
  eventBusName: string,
  source: string,
  objectType: string,
  resourceKey: string,
  traceId?: string | null
): PutEventsRequestEntry {
  if (record.dynamodb === undefined) {
    throw new Error('No DynamoDB object available in the DynamoDB event')
  }

  if (record.dynamodb.Keys === undefined) {
    throw new Error('No keys are available in the DynamoDB event')
  }

  const event: PutEventsRequestEntry = {
    Time: new Date(),
    Source: source,
    Resources: [
      String(DynamoDB.Converter.output(record.dynamodb.Keys[resourceKey])),
    ],
    EventBusName: eventBusName,
  }

  // Inject X-Ray trace ID
  if (traceId) {
    event['TraceHeader'] = traceId
  }

  // Created event
  if (record.eventName === 'INSERT') {
    event['DetailType'] = `${objectType}Created`

    let details = {}
    if (record.dynamodb.NewImage) {
      details = DynamoDB.Converter.unmarshall(record.dynamodb.NewImage)
    }

    event['Detail'] = JSON.stringify(details)
  }

  // Deleted event
  else if (record.eventName === 'REMOVE') {
    event['DetailType'] = `${objectType}Deleted`

    let details = {}
    if (record.dynamodb.OldImage) {
      details = DynamoDB.Converter.unmarshall(record.dynamodb.OldImage)
    }

    event['Detail'] = JSON.stringify(details)
  }

  // Updated event
  else if (record.eventName === 'MODIFY') {
    let newValues: DynamoDbRecordData = {}
    if (record.dynamodb.NewImage) {
      newValues = DynamoDB.Converter.unmarshall(record.dynamodb.NewImage)
    }

    let oldValues: DynamoDbRecordData = {}
    if (record.dynamodb.OldImage) {
      oldValues = DynamoDB.Converter.unmarshall(record.dynamodb.OldImage)
    }

    const changed: string[] = []
    Object.keys(oldValues).forEach((key) => {
      if (!newValues[key as keyof DynamoDbRecordData]) {
        changed.push(key)
      } else if (
        oldValues[key as keyof DynamoDbRecordData] !==
        newValues[key as keyof DynamoDbRecordData]
      ) {
        changed.push(key)
      }
    })

    event['DetailType'] = `${objectType}Modified`
    event['Detail'] = JSON.stringify({
      new: newValues,
      old: oldValues,
      changed,
    })
  } else {
    throw new Error(
      `Wrong eventName value for DynamoDB event: ${record.eventName}`
    )
  }

  return event
}

/**
 * Send events to the EventBridge.
 *
 * @param {EventBridge} eventBridge
 * @param {PutEventsRequestEntry} events
 */
export async function sendEvents(
  eventBridge: EventBridge,
  events: PutEventsRequestEntry[]
) {
  console.info({
    message: `Sending ${events.length} events to the EventBridge`,
  })

  const batchSize = 10

  // EventBridge only supports batches of up to 10 events
  for (let i = 0; i < events.length; i += batchSize) {
    await eventBridge
      .putEvents({
        Entries: events.slice(i, i + batchSize),
      })
      .promise()
  }
}
