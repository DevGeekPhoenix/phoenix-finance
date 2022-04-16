import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { createServer } from "http";
// import './run-db'

import _applyMiddlewares from "./middlewares";

export default async function startApolloServer({ typeDefs, resolvers, port }) {
  const app = express();

  app.get("/", (req, res) => res.send("<h1>hello from financetor</h1>"));
  _applyMiddlewares(app);

  const httpServer = createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req }) => ({
      user: req.user,
      userAgent: req.headers["user-agent"],
    }),
  });
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
  await new Promise((resolve) => httpServer.listen({ port }, resolve));
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
}
