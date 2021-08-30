import { StackEnvConfiguration } from './stack-env-config'

describe('Stack environment configuration', () => {
  it('throws an error when the configuration context does not match predefined contexts', () => {
    expect(() => {
      StackEnvConfiguration('undefined')
    }).toThrow()
  })

  it('returns int stack configuration given context=int', () => {
    const stackConfig = StackEnvConfiguration('int')

    expect(stackConfig).toMatchSnapshot()
  })

  it('returns int stack configuration given context=dev', () => {
    const stackConfig = StackEnvConfiguration('dev')

    expect(stackConfig).toMatchSnapshot()
  })

  it('returns prod stack configuration given context=prod', () => {
    const stackConfig = StackEnvConfiguration('prod')

    expect(stackConfig).toMatchSnapshot()
  })
})
