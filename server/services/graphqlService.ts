import { createHandler } from 'graphql-http/lib/use/express';
import { buildSchema } from 'graphql';
import express from 'express';

// Define GraphQL schema
const schema = buildSchema(`
  type Query {
    hello: String
    add(a: Int!, b: Int!): Int
  }
`);

// Define resolvers
const root = {
  hello: () => 'Hello, world!',
  add: ({ a, b }: { a: number; b: number }) => a + b,
};

// Create a middleware function for GraphQL
export function graphqlMiddleware() {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.method === 'POST') {
      express.json()(req, res, () => {
        createHandler({ schema, rootValue: root })(req, res, next);
      });
    } else {
      next();
    }
  };
}
