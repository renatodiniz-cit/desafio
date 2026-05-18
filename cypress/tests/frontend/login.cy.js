const LoginPage = require('../../support/pages/LoginPage')

describe('Login Page', () => {
  beforeEach(() => {
    LoginPage.visit()
  })

  it('should login successfully with valid credentials', () => {
    cy.fixture('users').then(({ valid }) => {
      LoginPage.fillEmail(valid.email)
      LoginPage.fillPassword(Cypress.env('userPassword'))
      LoginPage.submit()

      cy.url().should('not.include', '/login')
    })
  })

  it('should display an error message with invalid credentials', () => {
    cy.fixture('users').then(({ invalid }) => {
      LoginPage.fillEmail(invalid.email)
      LoginPage.fillPassword('senha_invalida')
      LoginPage.submit()

      LoginPage.getAlert().should('be.visible')
    })
  })

  it('should navigate to the register page when clicking the register link', () => {
    LoginPage.clickRegisterLink()

    cy.url().should('include', '/cadastrarusuarios')
  })
})
