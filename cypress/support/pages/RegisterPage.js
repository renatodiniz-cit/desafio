const registerSelectors = require('../selectors/registerSelectors')

class RegisterPage {
  visit() {
    cy.visit('/cadastrarusuarios')
  }

  fillName(name) {
    cy.get(registerSelectors.nameInput).clear().type(name)
  }

  fillEmail(email) {
    cy.get(registerSelectors.emailInput).clear().type(email)
  }

  fillPassword(password) {
    cy.get(registerSelectors.passwordInput).clear().type(password, { log: false })
  }

  submit() {
    cy.get(registerSelectors.submitButton).click()
  }

  getAlert() {
    return cy.get(registerSelectors.alertMessage)
  }
}

module.exports = new RegisterPage()
