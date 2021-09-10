// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

import Amplify, { Auth } from 'aws-amplify'

Amplify.configure(Cypress.env('awsConfig'))

Cypress.Commands.add('loginByCognito', (username: string, password: string) => {
  const log = Cypress.log({
    displayName: 'cognito login',
    message: [`🔐 Authenticating | ${username}`],
    autoEnd: false,
  })

  log.snapshot('before')

  const signIn = Auth.signIn({ username, password })

  cy.wrap(signIn, { log: false }).then((response: any) => {
    const keyPrefixWithUsername = `${response.keyPrefix}.${response.username}`
    window.localStorage.setItem(
      `${keyPrefixWithUsername}.idToken`,
      response.signInUserSession.idToken.jwtToken
    )
    window.localStorage.setItem(
      `${keyPrefixWithUsername}.accessToken`,
      response.signInUserSession.accessToken.jwtToken
    )
    window.localStorage.setItem(
      `${keyPrefixWithUsername}.refreshToken`,
      response.signInUserSession.refreshToken.token
    )
    window.localStorage.setItem(
      `${keyPrefixWithUsername}.clockDrift`,
      response.signInUserSession.clockDrift
    )
    window.localStorage.setItem(
      `${response.keyPrefix}.LastAuthUser`,
      response.username
    )

    window.localStorage.setItem('amplify-authenticator-authState', 'signedIn')

    log.snapshot('after')
    log.end()
  })

  cy.visit('/')
})

//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
