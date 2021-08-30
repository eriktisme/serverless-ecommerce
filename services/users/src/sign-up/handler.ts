import { EventBridge } from 'aws-sdk'
import { PutEventsRequestEntry } from 'aws-sdk/clients/eventbridge'

export function instances() {
  return {
    eventBridge: new EventBridge({
      apiVersion: '2015-10-07',
    }),
  }
}

export async function consumer(event: any, _, callback) {
  console.debug({
    message: 'Input event',
    event: JSON.stringify(event),
  })

  // Do not auto confirm users
  event['response'] = {
    autoConfirmUser: false,
    autoVerifyPhone: false,
    autoVerifyEmail: false,
  }

  if (
    !['PreSignUp_SignUp', 'PreSignUp_AdminCreateUser'].includes(
      event.triggerSource
    )
  ) {
    console.warn({
      message: 'Invalid triggerSource',
      triggerSource: event.triggerSource,
    })

    return callback(null, event)
  }

  const processedRequest = processRequest(event)

  console.debug({
    message: 'Processed request',
    event: processedRequest,
  })

  await sendEvent(processedRequest)

  callback(null, event)
}

/**
 * Transform the input request into an EventBridge event.
 *
 * @param {Object} event
 * @return PutEventsRequestEntry
 */
export function processRequest(event: any): PutEventsRequestEntry {
  return {
    Time: new Date(),
    Detail: JSON.stringify({
      userId: event.userName,
      email: event.request.userAttributes.email,
    }),
    Source: `${process.env.PROJECT}.users`,
    Resources: [event.userName],
    DetailType: 'UserCreated',
    EventBusName: process.env.EVENT_BUS_NAME,
  }
}

/**
 * Put event into the event bus.
 *
 * @param {PutEventsRequestEntry} event
 */
export async function sendEvent(event: PutEventsRequestEntry) {
  return await instances()
    .eventBridge.putEvents({
      Entries: [event],
    })
    .promise()
}
