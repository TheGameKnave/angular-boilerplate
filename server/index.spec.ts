import request from 'supertest';
import express from 'express';

import { setupApp } from './index'; 

describe('Express server', () => {
  let app: express.Application;
  process.env.NODE_ENV = 'production';
  process.env.SERVER_PORT = '9200';
  var server: any;

  beforeEach(function(done) {
    app = setupApp(); // Use the helper function to set up the Express application

    server = app.listen(process.env.SERVER_PORT || 3000, () => {
      console.log('Express server is running on ' + (process.env.SERVER_PORT || 3000))
      done();
    });
  });

  afterEach(() => {
    server.close();
  });

  describe('GET /', function() {
    it('serves the index file for the root path', async () => {
      // const response = await request(app).get('/');
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