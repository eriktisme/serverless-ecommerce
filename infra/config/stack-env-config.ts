import { DevConfig } from './env-config-dev'
import { IntConfig } from './env-config-int'
import { ProdConfig } from './env-config-prod'
import { StackConfiguration } from './types'

interface ConfigurationsContext {
  [key: string]: StackConfiguration
}

const configurationsContext: ConfigurationsContext = {
  int: IntConfig,
  dev: DevConfig,
  prod: ProdConfig,
}

export const StackEnvConfiguration = (
  configContext: string
): StackConfiguration => {
  if (
    !Object.prototype.hasOwnProperty.call(configurationsContext, configContext)
  ) {
    throw new Error(
      'Missing configuration context. Provide a configuration context using eg: `--context config=int`'
    )
  }

  return configurationsContext[configContext]
}
