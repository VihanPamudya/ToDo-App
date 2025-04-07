import { defineConfig } from "cypress";

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/integration/**/*.{js,ts}',
    supportFile: false,
  },
});
