"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = require("fs");

var _path = _interopRequireDefault(require("path"));

var dirname = _path["default"].join(process.cwd(), '/src/graphql/schema');

var _default = function _default() {
  return (0, _fs.readdirSync)(dirname) // not __dirname
  .filter(function (item) {
    return item.includes('.graphql');
  }).reduce(function (acc, cur) {
    return acc + (0, _fs.readFileSync)(_path["default"].join(dirname, "/".concat(cur)), {
      encoding: "utf8"
    });
  }, '');
};

exports["default"] = _default;