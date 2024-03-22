import { Request, Response, NextFunction } from 'express';
import apiRouter from './api';

describe('API Router', () => {
  let request: Request;
  let response: Response;
  let next: NextFunction;

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
});