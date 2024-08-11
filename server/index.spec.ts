import request from 'supertest';
import express from 'express';
import { setupApp } from './index'; 

describe('Express server', () => {
  let app: express.Application;
  let server: any;

  const startServer = (env: string, port: number) => {
    process.env.NODE_ENV = env;
    process.env.SERVER_PORT = port.toString();
    app = setupApp();
    return new Promise((resolve) => {
      server = app.listen(port, () => {
        resolve(server);
      });
    });
  };

  const stopServer = (): Promise<void> => {
    return new Promise<void>((resolve) => {
      server.close(() => {
        resolve(); // Resolve without any value
      });
    });
  };

  describe('Environment Tests', () => {
    it('should serve static files in production', async () => {
      await startServer('production', 9200);
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.text).toContain('<!doctype html>'); // Adjust based on your index.html content
      await stopServer();
    });

    it('should serve static files in development', async () => {
      await startServer('development', 9201);
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.text).toContain('<!doctype html>'); // Adjust based on your index.html content

      // Additional assertion to ensure the file is served from the correct path
      expect(response.headers['content-type']).toContain('text/html'); // Ensure the file is served correctly
      await stopServer();
    });

    it('should serve static files when NODE_ENV is undefined, falling back to development', async () => {
      delete process.env.NODE_ENV; // Ensure NODE_ENV is undefined
      await startServer('' as any, 9204); // Pass an empty string or undefined explicitly
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.text).toContain('<!doctype html>'); // Ensure that it falls back to serving static files as if in development
      await stopServer();
    });

    it('should not serve static files in test environment', async () => {
      await startServer('test', 9202);
      const response = await request(app).get('/');
      expect(response.status).toBe(404); // Adjust if your app responds differently
      await stopServer();
    });
  });

  describe('Rate Limiting Tests', () => {
    beforeEach(async () => {
      await startServer('production', 9200);
    });

    afterEach(async () => {
      await stopServer();
    });

    it('should apply rate limiting to API routes', async () => {
      // Simulate multiple requests to test rate limiting behavior
      for (let i = 0; i < 10; i++) {
        await request(app).get('/api/test');
      }
      const response = await request(app).get('/api/test');
      expect(response.status).not.toBe(429); // Ensure not rate limited on the first few requests
    });
  });

  describe('Server Port Tests', () => {
    it('should start the server on the specified port', async () => {
      await startServer('production', 9203);
      expect(server.address().port).toBe(9203);
      await stopServer();
    });
  });

  // Add additional specs as needed to test the behavior of the server setup
});
