const RegisterPage = require('../../support/pages/RegisterPage')

describe('Register Page', () => {
  beforeEach(() => {
    RegisterPage.visit()
  })

  it('should register successfully with unique data', () => {
    cy.fixture('users').then(({ new: newUser }) => {
      const uniqueEmail = `cypress_${Date.now()}@qa.com`

      RegisterPage.fillName(newUser.name)
      RegisterPage.fillEmail(uniqueEmail)
      RegisterPage.fillPassword(Cypress.env('userPassword'))
      RegisterPage.submit()

      //cy.url().should('not.include', '/cadastrarusuarios')
    })
  })

  it('should display an error when registering with a duplicate email', () => {
    cy.fixture('users').then(({ new: newUser, valid }) => {
      RegisterPage.fillName(newUser.name)
      RegisterPage.fillEmail(valid.email)
      RegisterPage.fillPassword(Cypress.env('userPassword'))
      RegisterPage.submit()

      RegisterPage.getAlert().should('be.visible')
    })
  })

  it('should not submit when required fields are empty', () => {
    RegisterPage.submit()

    cy.url().should('include', '/cadastrarusuarios')
  })
})
