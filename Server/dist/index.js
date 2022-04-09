"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _runServer = _interopRequireDefault(require("./server/run-server"));

var _schema = _interopRequireDefault(require("./graphql/schema"));

var _resolver = _interopRequireDefault(require("./graphql/resolver"));

// import '@lib/global'
var typeDefs = (0, _schema["default"])();
(0, _runServer["default"])({
  typeDefs: typeDefs,
  resolvers: _resolver["default"],
  port: 80
});