/* eslint-disable arrow-body-style */
// https://docs.cypress.io/guides/guides/plugins-guide.html

import * as Cypress from 'cypress'
import path from 'path'

const awsConfig = require(path.join(__dirname, '../mock-aws-exports.js'))

export default function (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
) {
  // Amazon Cognito
  config.env.cognito_username =
    process.env.AWS_COGNITO_USERNAME || 'johndoe@example.org'
  config.env.cognito_password = process.env.AWS_COGNITO_PASSWORD || 'secret123'
  config.env.awsConfig = awsConfig.default

  on(
    'before:browser:launch',
    (browser: Cypress.Browser, launchOptions: Cypress.BrowserLaunchOptions) => {
      if (browser.family === 'chromium') {
        launchOptions.args.push('--disable-dev-shm-usage')
      }

      return launchOptions
    }
  )

  return Object.assign({}, config, {
    fixturesFolder: 'tests/e2e/fixtures',
    integrationFolder: 'tests/e2e/tests',
    screenshotsFolder: 'tests/e2e/screenshots',
    videosFolder: 'tests/e2e/videos',
    supportFile: 'tests/e2e/support/index.ts',
  })
}
