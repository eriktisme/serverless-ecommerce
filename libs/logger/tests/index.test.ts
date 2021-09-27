import AWS from 'aws-sdk'
import AWSMock from 'aws-sdk-mock'
import { log } from '../src'

describe('Log Events', () => {
  it('logs event', async () => {
    AWSMock.setSDKInstance(AWS)
    AWSMock.mock('S3', 'upload', (_: any, callback: Function) => {
      callback(null, () => {})
    })

    const spy = jest.spyOn(global.console, 'debug').mockImplementation()

    await log('ProductManager', {
      message: 'GetProduct() called.',
      productId: '123',
    })

    expect(console.debug).toBeCalledTimes(1)

    spy.mockRestore()

    AWSMock.restore('S3')
  })
})
