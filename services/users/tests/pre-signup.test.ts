import {
  consumer,
  instances,
  processRequest,
  sendEvent,
} from '../src/sign-up/handler'
import AWSMock from 'aws-sdk-mock'
import AWS from 'aws-sdk'

const input = {
  version: 2,
  triggerSource: 'PreSignUp_SignUp',
  region: 'eu-west-1',
  userPoolId: 'abcd123',
  userName: 'myNameIsJohnDoe',
  callerContext: {
    awsSdkVersion: '1',
    clientId: 'abcdefg',
  },
  request: {
    userAttributes: {
      email: 'john.doe@example.com',
    },
  },
  response: {},
}

const output = {
  Source: 'jest.users',
  Resources: [input['userName']],
  DetailType: 'UserCreated',
  Detail: JSON.stringify({
    userId: input['userName'],
    email: input['request']['userAttributes']['email'],
  }),
  EventBusName: undefined,
}

const context = {
  awsRequestId: '',
  callbackWaitsForEmptyEventLoop: false,
  functionName: '',
  functionVersion: '',
  invokedFunctionArn: '',
  logGroupName: '',
  logStreamName: '',
  memoryLimitInMB: '',
  done(error?: Error, result?: any): void {},
  fail(error: Error | string): void {},
  getRemainingTimeInMillis(): number {
    return 0
  },
  succeed(messageOrObject: any, object?: any): void {},
}

describe('Pre SignUp', () => {
  beforeEach(() => {
    process.env.PROJECT = 'jest'
  })

  it('processes requests', () => {
    expect(processRequest(input)).toMatchObject(output)
  })

  it('sends events', async () => {
    const event = output

    AWSMock.setSDKInstance(AWS)
    AWSMock.mock('EventBridge', 'putEvents', (params, callback: Function) => {
      callback(null, expectedParams)
    })

    instances().eventBridge = new AWS.EventBridge({
      apiVersion: '2015-10-07',
    })

    const expectedParams = { Entries: [event] }

    expect(await sendEvent(event)).toStrictEqual(expectedParams)

    AWSMock.restore('EventBridge')
  })

  it('it warns when an incorrect event is given', async () => {
    const spy = jest.spyOn(global.console, 'warn').mockImplementation()
    const spy2 = jest.spyOn(global.console, 'debug').mockImplementation()

    await consumer(
      {
        triggerSource: 'WRONG_EVENT',
      },
      context,
      () => {}
    )

    expect(console.debug).toBeCalledTimes(1)
    expect(console.warn).toBeCalledTimes(1)

    spy.mockRestore()
    spy2.mockRestore()
  })

  it('consumes cognito trigger', async () => {
    AWSMock.setSDKInstance(AWS)
    AWSMock.mock('EventBridge', 'putEvents', (params, callback: Function) => {
      callback(null, [])
    })

    const spy = jest.spyOn(global.console, 'debug').mockImplementation()

    instances().eventBridge = new AWS.EventBridge({
      apiVersion: '2015-10-07',
    })

    const callback = jest.fn()

    await consumer(input, context, callback)

    expect(callback).toBeCalled()
    expect(console.debug).toBeCalledTimes(2)

    spy.mockRestore()

    AWSMock.restore('EventBridge')
  })
})
