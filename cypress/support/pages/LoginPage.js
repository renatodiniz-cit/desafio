const loginSelectors = require('../selectors/loginSelectors')

class LoginPage {
  visit() {
    cy.visit('/login')
  }

  fillEmail(email) {
    cy.get(loginSelectors.emailInput).clear().type(email)
  }

  fillPassword(password) {
    cy.get(loginSelectors.passwordInput).clear().type(password, { log: false })
  }

  submit() {
    cy.get(loginSelectors.submitButton).click()
  }

  getAlert() {
    return cy.get(loginSelectors.alertMessage)
  }

  clickRegisterLink() {
    cy.get(loginSelectors.registerLink).click()
  }
}

module.exports = new LoginPage()
