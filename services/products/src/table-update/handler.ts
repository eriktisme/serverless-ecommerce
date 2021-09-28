import { EventBridge } from 'aws-sdk'
import { ddbToEvent, sendEvents } from '@libs/event-bridge'

export function instances() {
  return {
    eventBridge: new EventBridge({
      apiVersion: '2015-10-07',
    }),
  }
}

export async function consumer(event: any) {
  console.debug({
    message: 'Input event',
    event: JSON.stringify(event),
  })

  const records: any[] = event['Records'] ?? []
  console.debug({
    message: 'Records received',
    records: records,
  })

  const events = records.map((record) =>
    ddbToEvent(
      record,
      String(process.env.EVENT_BUS_NAME),
      `${process.env.PROJECT}.products`,
      'Product',
      'productId',
      process.env._X_AMZN_TRACE_ID ?? null
    )
  )

  console.info({
    message: `Received ${events.length} event(s)`,
  })

  console.debug({
    message: 'Events processed from records',
    events,
  })

  await sendEvents(instances().eventBridge, events)
}
