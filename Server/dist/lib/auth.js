"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = requireAuth;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../models/user"));

function requireAuth(_x) {
  return _requireAuth.apply(this, arguments);
}

function _requireAuth() {
  _requireAuth = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(user) {
    var me;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(!user || !user._id)) {
              _context.next = 2;
              break;
            }

            throw new Error("Unathorized");

          case 2:
            _context.next = 4;
            return _user["default"].findById(user._id);

          case 4:
            me = _context.sent;

            if (me) {
              _context.next = 7;
              break;
            }

            throw new Error("Unauthorized");

          case 7:
            return _context.abrupt("return", me);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _requireAuth.apply(this, arguments);
}