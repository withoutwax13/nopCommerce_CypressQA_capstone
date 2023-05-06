const { defineConfig } = require("cypress");
const { defineConfig } = require("cypress")

module.exports = defineConfig({
  defaultCommandTimeout: 8000,
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
