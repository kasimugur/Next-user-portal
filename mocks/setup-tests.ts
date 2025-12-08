// mocks/setup-tests.ts
import { server } from './server';

// MSW server lifecycle
beforeAll(() => {
  console.log('🚀 MSW Server starting...');
  server.listen({ 
    onUnhandledRequest: 'warn' // 'bypass' yerine 'warn' kullan
  });
  console.log('✅ MSW Server started');
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  console.log('🛑 MSW Server closing...');
  server.close();
});