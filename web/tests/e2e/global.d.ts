declare namespace Cypress {
  interface Chainable {
    /**
     * Logs in to AWS Cognito via Amplify Auth API bypassing UI using Cypress Task
     */
    loginByCognito(username: string, password: string): Chainable<any>
  }
}
