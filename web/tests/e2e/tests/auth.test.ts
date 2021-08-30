describe('User sign up and log in', () => {
  it('should redirect unauthenticated users to log in page', () => {
    cy.visit('/dashboard')
    cy.location('pathname').should('equal', '/login')
  })

  it('should redirect authenticated users to dashboard', () => {
    cy.loginByCognito(
      Cypress.env('cognito_username'),
      Cypress.env('cognito_password')
    )

    cy.visit('/login')
    cy.location('pathname').should('equal', '/dashboard')
  })
})
