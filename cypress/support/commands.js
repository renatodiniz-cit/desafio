const loginSelectors = require('./selectors/loginSelectors')


Cypress.Commands.add('login', (email, password) => {
  cy.session([email], () => {
    cy.visit('/login')
    cy.get(loginSelectors.emailInput).type(email)
    cy.get(loginSelectors.passwordInput).type(password, { log: false })
    cy.get(loginSelectors.submitButton).click()
    cy.url().should('not.include', '/login')
  })
})

Cypress.Commands.add('getAuthToken', (email, password) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/login`,
    body: { email, password },
  }).then((response) => response.body.authorization)
})