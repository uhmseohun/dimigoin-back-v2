import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import schema from '../schema';
import Token from '../resources/Token';

const path = '/graphql';

export default ({ app }: { app: express.Application }) => {
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const token = req.headers.authorization
        ? req.headers.authorization.replace('Bearer ', '')
        : null;
      if (token !== 'null') {
        if (token != null) {
          const user = await Token.verify(token);
          return { user, isLogin: true };
        }
      }
      return { user: null, isLogin: false };
    },
  });
  server.applyMiddleware({ app, path });
};
