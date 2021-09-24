import AWS from 'aws-sdk'
import AWSMock from 'aws-sdk-mock'
import { recordMetricEvent } from '../src'

describe('Record Metric Events', () => {
  it('record event', async () => {
    AWSMock.setSDKInstance(AWS)
    AWSMock.mock('S3', 'upload', (_: any, callback: Function) => {
      callback(null, () => {})
    })

    const spy = jest.spyOn(global.console, 'info').mockImplementation()

    const start = new Date().getTime()
    const end = new Date().getTime()

    await recordMetricEvent(
      'ProductManager',
      'GetProduct',
      end - start,
      'products-service'
    )

    expect(console.info).toBeCalledTimes(1)

    spy.mockRestore()

    AWSMock.restore('S3')
  })
})
