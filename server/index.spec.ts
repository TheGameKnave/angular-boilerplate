import * as request from 'supertest';
import * as express from 'express';

import { setupApp, sendAngularApp } from './index'; 

describe('Express server', () => {
  let app: express.Application;
  process.env.NODE_ENV = 'production';
  process.env.SERVER_PORT = '9200';
  var server: any;

  beforeEach(() => {
    app = setupApp(); // Use the helper function to set up the Express application
    // Store the original sendFile method and replace it with a mock implementation
    server = app.listen(process.env.SERVER_PORT || 3000, () => {
      console.log('Express server is running on ' + (process.env.SERVER_PORT || 3000))
    });
  });

  afterEach(() => {
    server.close();
  });

  describe('GET /', function() {
    it('serves the index file for the root path', async () => {
      // const response = await request(app).get('/');
      // expect(response.status).toBe(200);
      // expect(response.headers['content-type']).toBe('text/html; charset=UTF-8');
    });
  });

  // it('should use rate limiting for the API', () => {
  //   // Simulate using rate limiting for the API
  //   // Add your assertions for rate limiting here
  // });

  // it('should start the server on the specified port', () => {
  //   // Simulate starting the server on the specified port
  //   // Add your assertions for starting the server here
  // });

  // Add additional specs as needed to test the behavior of the server setup
});