const { setup } = require('jest-playwright-preset');
const cookieSession = require('cookie-session');

module.exports = async function () {
  process.env.NODE_ENV = 'test';
  // Your custom setup
  // For example, setting up a cookie session for tests
  // This will be called once before all test suites

  // If you need to apply middleware globally for e2e tests, 
  // you might need to mock the NestJS app creation or use a test-specific app instance.
  // For now, let's assume we'll directly configure supertest agent for session handling where needed.
  // However, to address the `session.userId` issue, we need to ensure the cookie-session middleware is active.

  // Jest setup might not be the right place to apply express middleware directly to a NestJS app for e2e tests.
  // Instead, we should modify the test setup in `auth.e2e-spec.ts` and `app.e2e-spec.ts`
  // to include the cookie-session middleware in the test application factory.
};
