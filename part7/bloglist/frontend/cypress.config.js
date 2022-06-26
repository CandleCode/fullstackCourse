const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: './cypress/integration',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
