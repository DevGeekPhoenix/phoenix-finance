"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../../models/user"));

var _tag = _interopRequireDefault(require("../../models/tag"));

var _auth = _interopRequireDefault(require("../../lib/auth"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var _default = {
  root: {},
  Query: {},
  Mutation: {
    create_tag: function () {
      var _create_tag = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var data, user, thisUser;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                data = _ref.data;
                user = _ref2.user;
                _context.prev = 2;
                _context.next = 5;
                return (0, _auth["default"])(user);

              case 5:
                thisUser = _context.sent;
                _context.next = 8;
                return _tag["default"].create(_objectSpread({
                  userId: thisUser._id
                }, data));

              case 8:
                return _context.abrupt("return", {
                  status: 200,
                  msg: 'ok'
                });

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](2);
                throw _context.t0;

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 11]]);
      }));

      function create_tag(_x, _x2, _x3) {
        return _create_tag.apply(this, arguments);
      }

      return create_tag;
    }(),
    edit_tag: function () {
      var _edit_tag = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_, _ref3, _ref4) {
        var _id, data, user, thisUser;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _id = _ref3._id, data = _ref3.data;
                user = _ref4.user;
                _context2.prev = 2;
                _context2.next = 5;
                return (0, _auth["default"])(user);

              case 5:
                thisUser = _context2.sent;
                _context2.next = 8;
                return _tag["default"].findByIdAndUpdate({
                  _id: _id,
                  userId: thisUser._id,
                  data: data
                });

              case 8:
                return _context2.abrupt("return", {
                  msg: 'ok',
                  status: 200
                });

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](2);
                throw _context2.t0;

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2, 11]]);
      }));

      function edit_tag(_x4, _x5, _x6) {
        return _edit_tag.apply(this, arguments);
      }

      return edit_tag;
    }()
  }
};
exports["default"] = _default;