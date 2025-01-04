import { Request, Response, NextFunction } from 'express';
import apiRouter from './api';

describe('API Router', () => {
  let request: Request;
  let response: Response;
  let next: NextFunction;
  const featureFlagService = require('../services/featureFlagService');

  beforeEach(() => {
    request = {} as Request;
    response = {
      send: jest.fn() // Using Jest's jest.fn() to create a spy for the send method
    } as unknown as Response;
    next = jest.fn() as unknown as NextFunction;
  });

  it('should handle GET request', () => {
    const getHandler = apiRouter.stack.find((layer: any) => layer.route && layer.route.path === '/');
    if (getHandler && getHandler.route) {
      const handler = getHandler.route.stack[0].handle;
      handler(request, response, next);
      expect(response.send).toHaveBeenCalledWith({ message: 'api works' });
    } else {
      throw new Error('GET handler not found'); // Using throw new Error() instead of fail()
    }
  });

  it('should handle GET /flags request', () => {
    const getHandler = apiRouter.stack.find((layer: any) => layer.route && layer.route.path === '/flags');
    if (getHandler && getHandler.route) {
      const handler = getHandler.route.stack[0].handle;
      handler(request, response, next);
      expect(response.send).toHaveBeenCalledTimes(1);
      expect(response.send).toHaveBeenCalledWith(featureFlagService.readFeatureFlags());
    } else {
      throw new Error('GET /flags handler not found');
    }
  });
  
  it('should handle PUT /flags request', () => {
    const putHandler = apiRouter.stack.find((layer: any) => layer.route && layer.route.path === '/flags' && layer.route.methods.put);
    if (putHandler && putHandler.route) {
      const handler = putHandler.route.stack[0].handle;
      const oldFeatureFlags = featureFlagService.readFeatureFlags();
      const newFeatureFlags = { ...oldFeatureFlags, 'New Feature': true };
      request.body = newFeatureFlags;
  
      // Spy on the writeFeatureFlags method and mock its behavior
      const writeFeatureFlagsSpy = jest.spyOn(featureFlagService, 'writeFeatureFlags');
      writeFeatureFlagsSpy.mockImplementation(() => {
        featureFlagService.readFeatureFlags = () => newFeatureFlags;
        return newFeatureFlags;
      });
  
      handler(request, response, next);
  
      expect(writeFeatureFlagsSpy).toHaveBeenCalledTimes(1);
      expect(writeFeatureFlagsSpy).toHaveBeenCalledWith(newFeatureFlags);
      expect(response.send).toHaveBeenCalledTimes(1);
      expect(response.send).toHaveBeenCalledWith(newFeatureFlags);
  
      // Restore the original method
      writeFeatureFlagsSpy.mockRestore();
    } else {
      throw new Error('PUT /flags handler not found');
    }
  });
});