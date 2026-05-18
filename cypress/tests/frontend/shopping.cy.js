const HomePage = require('../../support/pages/HomePage')

describe('Shopping Cart', () => {
  beforeEach(() => {
    cy.fixture('users').then(({ valid }) => {
      cy.login(valid.email, Cypress.env('userPassword'))
    })
    HomePage.visit()
  })

  it('should add the first product on the list to the cart', () => {
    HomePage.addFirstProductToCart()

    HomePage.getCartButton().should('be.visible')
  })
})
