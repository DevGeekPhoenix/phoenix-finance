"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _userResolver = _interopRequireDefault(require("./user-resolver"));

var _tagResolver = _interopRequireDefault(require("./tag-resolver"));

var _expenseResolver = _interopRequireDefault(require("./expense-resolver"));

var _graphqlUpload = require("graphql-upload");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var _default = _objectSpread(_objectSpread(_objectSpread(_objectSpread({
  Upload: _graphqlUpload.GraphQLUpload
}, _userResolver["default"].root), _tagResolver["default"].root), _expenseResolver["default"].root), {}, {
  Query: _objectSpread(_objectSpread(_objectSpread({}, _userResolver["default"].Query), _tagResolver["default"].Query), _expenseResolver["default"].Query),
  Mutation: _objectSpread(_objectSpread(_objectSpread({}, _userResolver["default"].Mutation), _tagResolver["default"].Mutation), _expenseResolver["default"].Mutation)
});

exports["default"] = _default;