"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _fs = require("fs");

var _path = _interopRequireDefault(require("path"));

var _lib = require("../lib");

var userDirectory = _path["default"].join(process.cwd(), "/src/db/users");

var TagSchema = /*#__PURE__*/function () {
  function TagSchema() {
    (0, _classCallCheck2["default"])(this, TagSchema);
  }

  (0, _createClass2["default"])(TagSchema, [{
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
        var userId, name, color, data, dest;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                userId = _ref.userId, name = _ref.name, color = _ref.color;
                _context.prev = 1;

                if (!(!userId || !name || !color)) {
                  _context.next = 4;
                  break;
                }

                throw new Error("bad input");

              case 4:
                data = {
                  userId: userId,
                  name: name,
                  color: color,
                  _id: (0, _lib.UID)()
                };
                dest = "".concat(userDirectory, "/").concat(userId, "/tags");

                if (!(0, _fs.existsSync)(dest)) {
                  (0, _fs.mkdirSync)(dest);
                }

                (0, _fs.writeFileSync)("".concat(dest, "/").concat(data._id, ".txt"), JSON.stringify(data), "utf8");
                return _context.abrupt("return", data);

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](1);
                throw _context.t0;

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 11]]);
      }));

      function create(_x) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "findUserTags",
    value: function () {
      var _findUserTags = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_id) {
        var x, y, result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;

                if ((0, _fs.existsSync)("".concat(userDirectory, "/").concat(_id, "/tags"))) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", []);

              case 3:
                x = (0, _fs.readdirSync)("".concat(userDirectory, "/").concat(_id, "/tags")).reduce(function (acc, cur, i) {
                  return acc + "".concat(i == 0 ? "" : ",") + (0, _fs.readFileSync)(_path["default"].join("".concat(userDirectory, "/").concat(_id, "/tags"), "/".concat(cur)), {
                    encoding: "utf8"
                  });
                }, "[");
                y = "".concat(x, "]");
                result = JSON.parse(y);
                return _context2.abrupt("return", result);

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](0);
                console.log(_context2.t0);
                return _context2.abrupt("return", []);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 9]]);
      }));

      function findUserTags(_x2) {
        return _findUserTags.apply(this, arguments);
      }

      return findUserTags;
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
                x = (0, _fs.readFileSync)(_path["default"].join(userDirectory, "/".concat(userId, "/tags/").concat(_id, ".txt")), {
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
  }, {
    key: "findByIdAndUpdate",
    value: function () {
      var _findByIdAndUpdate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref3) {
        var _id, userId, data, realData, thatTag;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _id = _ref3._id, userId = _ref3.userId, data = _ref3.data;
                _context4.prev = 1;
                realData = {
                  name: data.name,
                  color: data.color
                };
                _context4.next = 5;
                return this.findById({
                  _id: _id,
                  userId: userId
                });

              case 5:
                thatTag = _context4.sent;

                if (!(!thatTag || !thatTag._id)) {
                  _context4.next = 8;
                  break;
                }

                throw new Error("bad request");

              case 8:
                Object.entries(realData).forEach(function (_ref4) {
                  var _ref5 = (0, _slicedToArray2["default"])(_ref4, 2),
                      key = _ref5[0],
                      value = _ref5[1];

                  return thatTag[key] = value;
                });
                (0, _fs.writeFileSync)("".concat(userDirectory, "/").concat(userId, "/tags/").concat(_id, ".txt"), JSON.stringify(thatTag), "utf8");
                return _context4.abrupt("return", true);

              case 13:
                _context4.prev = 13;
                _context4.t0 = _context4["catch"](1);
                throw _context4.t0;

              case 16:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 13]]);
      }));

      function findByIdAndUpdate(_x4) {
        return _findByIdAndUpdate.apply(this, arguments);
      }

      return findByIdAndUpdate;
    }()
  }]);
  return TagSchema;
}();

var Tag = new TagSchema();
var _default = Tag;
exports["default"] = _default;