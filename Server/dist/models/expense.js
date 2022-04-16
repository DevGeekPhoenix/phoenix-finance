"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _fs = require("fs");

var _path = _interopRequireDefault(require("path"));

var _lib = require("../lib");

var _tag = _interopRequireDefault(require("./tag"));

var userDirectory = _path["default"].join(process.cwd(), "/src/db/users");

var ExpenseSchema = /*#__PURE__*/function () {
  function ExpenseSchema() {
    (0, _classCallCheck2["default"])(this, ExpenseSchema);
  }

  (0, _createClass2["default"])(ExpenseSchema, [{
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
        var amount, tags, geo, userId, date, data, userTags, cache, doIContinue, dest;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                amount = _ref.amount, tags = _ref.tags, geo = _ref.geo, userId = _ref.userId, date = _ref.date;
                _context.prev = 1;

                if (!(!amount || !tags || !Array.isArray(tags) || !geo || !geo.lat || !geo.lon || !userId)) {
                  _context.next = 4;
                  break;
                }

                throw new Error("bad input");

              case 4:
                data = {
                  amount: amount,
                  tags: tags,
                  geo: geo,
                  date: date,
                  _id: (0, _lib.UID)()
                };
                _context.next = 7;
                return _tag["default"].findUserTags(userId);

              case 7:
                userTags = _context.sent;
                cache = {};
                userTags.forEach(function (item) {
                  return cache[item._id] = item;
                });
                doIContinue = tags.every(function (item) {
                  return !!cache[item];
                });

                if (doIContinue) {
                  _context.next = 13;
                  break;
                }

                throw new Error("invalid tags");

              case 13:
                dest = "".concat(userDirectory, "/").concat(userId, "/expenses");

                if (!(0, _fs.existsSync)(dest)) {
                  (0, _fs.mkdirSync)(dest);
                }

                (0, _fs.writeFileSync)("".concat(dest, "/").concat(data._id, ".txt"), JSON.stringify(data), "utf8");
                return _context.abrupt("return", data);

              case 19:
                _context.prev = 19;
                _context.t0 = _context["catch"](1);
                throw _context.t0;

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 19]]);
      }));

      function create(_x) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "findUserExpenses",
    value: function () {
      var _findUserExpenses = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_id) {
        var x, y, result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;

                if ((0, _fs.existsSync)("".concat(userDirectory, "/").concat(_id, "/expenses"))) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", []);

              case 3:
                x = (0, _fs.readdirSync)("".concat(userDirectory, "/").concat(_id, "/expenses")).reduce(function (acc, cur, i) {
                  return acc + "".concat(i == 0 ? "" : ",") + (0, _fs.readFileSync)(_path["default"].join("".concat(userDirectory, "/").concat(_id, "/expenses"), "/".concat(cur)), {
                    encoding: "utf8"
                  });
                }, "[");
                y = "".concat(x, "]");
                result = JSON.parse(y);
                return _context2.abrupt("return", result);

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](0);
                throw _context2.t0;

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 9]]);
      }));

      function findUserExpenses(_x2) {
        return _findUserExpenses.apply(this, arguments);
      }

      return findUserExpenses;
    }()
  }, {
    key: "findById",
    value: function () {
      var _findById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref2) {
        var _id, userId, x;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _id = _ref2._id, userId = _ref2.userId;
                _context3.prev = 1;
                x = (0, _fs.readFileSync)(_path["default"].join(userDirectory, "/".concat(userId, "/expenses/").concat(_id, ".txt")), {
                  encoding: "utf8"
                });
                return _context3.abrupt("return", JSON.parse(x));

              case 6:
                _context3.prev = 6;
                _context3.t0 = _context3["catch"](1);
                throw _context3.t0;

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 6]]);
      }));

      function findById(_x3) {
        return _findById.apply(this, arguments);
      }

      return findById;
    }()
  }]);
  return ExpenseSchema;
}();

var Expense = new ExpenseSchema();
var _default = Expense;
exports["default"] = _default;