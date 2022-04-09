"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _expense = _interopRequireDefault(require("../../models/expense"));

var _auth = _interopRequireDefault(require("../../lib/auth"));

var _tag = _interopRequireDefault(require("../../models/tag"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var _default = {
  root: {
    Me: {
      myExpenses: function () {
        var _myExpenses = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, data, _ref) {
          var user, thisUser;
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  user = _ref.user;
                  _context.prev = 1;
                  _context.next = 4;
                  return (0, _auth["default"])(user);

                case 4:
                  thisUser = _context.sent;
                  return _context.abrupt("return", _expense["default"].findUserExpenses(thisUser._id));

                case 8:
                  _context.prev = 8;
                  _context.t0 = _context["catch"](1);
                  return _context.abrupt("return", []);

                case 11:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[1, 8]]);
        }));

        function myExpenses(_x, _x2, _x3) {
          return _myExpenses.apply(this, arguments);
        }

        return myExpenses;
      }(),
      myTags: function () {
        var _myTags = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_, data, _ref2) {
          var user, thisUser;
          return _regenerator["default"].wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  user = _ref2.user;
                  _context2.prev = 1;
                  _context2.next = 4;
                  return (0, _auth["default"])(user);

                case 4:
                  thisUser = _context2.sent;
                  _context2.next = 7;
                  return _tag["default"].findUserTags(thisUser._id);

                case 7:
                  return _context2.abrupt("return", _context2.sent);

                case 10:
                  _context2.prev = 10;
                  _context2.t0 = _context2["catch"](1);
                  return _context2.abrupt("return", []);

                case 13:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, null, [[1, 10]]);
        }));

        function myTags(_x4, _x5, _x6) {
          return _myTags.apply(this, arguments);
        }

        return myTags;
      }()
    },
    Expense: {
      tags: function () {
        var _tags2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref3, _, _ref4) {
          var _tags, user, thisUser, userTags;

          return _regenerator["default"].wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _tags = _ref3.tags;
                  user = _ref4.user;
                  _context3.prev = 2;
                  _context3.next = 5;
                  return (0, _auth["default"])(user);

                case 5:
                  thisUser = _context3.sent;
                  _context3.next = 8;
                  return _tag["default"].findUserTags(thisUser._id);

                case 8:
                  userTags = _context3.sent;
                  return _context3.abrupt("return", _tags.map(function (_id) {
                    return userTags.find(function (item) {
                      return item._id == _id;
                    });
                  }));

                case 12:
                  _context3.prev = 12;
                  _context3.t0 = _context3["catch"](2);
                  throw _context3.t0;

                case 15:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, null, [[2, 12]]);
        }));

        function tags(_x7, _x8, _x9) {
          return _tags2.apply(this, arguments);
        }

        return tags;
      }()
    }
  },
  Query: {},
  Mutation: {
    create_expense: function () {
      var _create_expense = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_, _ref5, _ref6) {
        var data, user, thisUser;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                data = _ref5.data;
                user = _ref6.user;
                _context4.prev = 2;
                _context4.next = 5;
                return (0, _auth["default"])(user);

              case 5:
                thisUser = _context4.sent;
                _context4.next = 8;
                return _expense["default"].create(_objectSpread({
                  userId: thisUser._id
                }, data));

              case 8:
                return _context4.abrupt("return", {
                  status: 200,
                  msg: 'ok'
                });

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4["catch"](2);
                throw _context4.t0;

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[2, 11]]);
      }));

      function create_expense(_x10, _x11, _x12) {
        return _create_expense.apply(this, arguments);
      }

      return create_expense;
    }()
  }
};
exports["default"] = _default;