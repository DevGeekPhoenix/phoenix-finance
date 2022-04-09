"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = startApolloServer;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _apolloServerExpress = require("apollo-server-express");

var _apolloServerCore = require("apollo-server-core");

var _http = require("http");

var _middlewares = _interopRequireDefault(require("./middlewares"));

// import './run-db'
function startApolloServer(_x) {
  return _startApolloServer.apply(this, arguments);
}

function _startApolloServer() {
  _startApolloServer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var typeDefs, resolvers, port, app, httpServer, server;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            typeDefs = _ref.typeDefs, resolvers = _ref.resolvers, port = _ref.port;
            app = (0, _express["default"])();
            (0, _middlewares["default"])(app);
            httpServer = (0, _http.createServer)(app);
            server = new _apolloServerExpress.ApolloServer({
              typeDefs: typeDefs,
              resolvers: resolvers,
              plugins: [(0, _apolloServerCore.ApolloServerPluginDrainHttpServer)({
                httpServer: httpServer
              })],
              context: function context(_ref2) {
                var req = _ref2.req;
                return {
                  user: req.user,
                  userAgent: req.headers['user-agent']
                };
              }
            });
            _context.next = 7;
            return server.start();

          case 7:
            server.applyMiddleware({
              app: app,
              path: '/graphql'
            });
            _context.next = 10;
            return new Promise(function (resolve) {
              return httpServer.listen({
                port: port
              }, resolve);
            });

          case 10:
            console.log("Server ready at http://localhost:".concat(port).concat(server.graphqlPath));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _startApolloServer.apply(this, arguments);
}