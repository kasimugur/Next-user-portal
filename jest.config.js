// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.js',
    '<rootDir>/mocks/setup-tests.ts',
  ],

  testEnvironment: 'jsdom',

  // ESM paketleri için transform yapılsın
  transformIgnorePatterns: [
    'node_modules/(?!(msw|@mswjs|until-async|graphql|cookie-es|strict-event-emitter)/)',
  ],
};

// ASYNC wrapper - Next.js'in config'ini override etmek için
module.exports = async (...args) => {
  const config = await createJestConfig(customJestConfig)(...args);

  // Next.js'in transformIgnorePatterns'ını eziyoruz
  config.transformIgnorePatterns = [
    '/node_modules/(?!(msw|@mswjs|until-async|graphql|cookie-es|strict-event-emitter)/)',
  ];

  return config;
};