import { EventBridge } from 'aws-sdk'
import { PutEventsRequestEntry } from 'aws-sdk/clients/eventbridge'
import { sendEvents } from '@libs/event-bridge'

export function instances() {
  return {
    eventBridge: new EventBridge({
      apiVersion: '2015-10-07',
    }),
  }
}

// TODO: Send analytical event to Amazon Pinpoint to trigger campaign (with welcome message)

export async function consumer(event: any) {
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

    return event
  }

  const processedRequest = processRequest(event)

  console.debug({
    message: 'Processed request',
    event: processedRequest,
  })

  await sendEvents(instances().eventBridge, [processedRequest])

  return event
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
