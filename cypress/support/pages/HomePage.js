const homeSelectors = require('../selectors/homeSelectors')

class HomePage {
  visit() {
    cy.visit('/home')
  }

  searchProduct(term) {
    cy.get(homeSelectors.searchInput).clear().type(term)
  }

  submitSearch() {
    cy.get(homeSelectors.searchButton).click()
  }

  addFirstProductToCart() {
    cy.get(homeSelectors.addToCartButton).first().click()
  }

  getCartButton() {
    return cy.get(homeSelectors.cartButton)
  }
}

module.exports = new HomePage()
