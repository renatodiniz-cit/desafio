const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
  baseUrl: 'https://front.serverest.dev',
  specPattern: 'cypress/tests/**/*.cy.{js,ts}',
  env: {
    apiUrl: 'https://serverest.dev',
  },
  setupNodeEvents(on, config) {},
  },
})
