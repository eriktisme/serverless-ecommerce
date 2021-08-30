import './commands'

beforeEach(() => {
  // cy.intercept middleware to remove 'if-none-match' headers from all requests
  // to prevent the server from returning cached responses of API requests
  cy.intercept(
    { url: 'http://localhost:8080/**', middleware: true },
    (req) => delete req.headers['if-none-match']
  )
})
