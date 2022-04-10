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

var _bcrypt = require("bcrypt");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

// import dotenv from 'dotenv'
// dotenv.config();
var doesCacheneedsUpdate = true;
var cache = null;

var userDirectory = _path["default"].join(process.cwd(), "/src/db/users");

var UserSchema = /*#__PURE__*/function () {
  function UserSchema() {
    (0, _classCallCheck2["default"])(this, UserSchema);
  }

  (0, _createClass2["default"])(UserSchema, [{
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
        var name, username, password, img, allUsers, ifuserexists, salt, hash, userID, userInfo, data, dest;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                name = _ref.name, username = _ref.username, password = _ref.password, img = _ref.img;
                _context.prev = 1;

                if (!(!name || !username || !password || !img)) {
                  _context.next = 4;
                  break;
                }

                throw new Error("bad input");

              case 4:
                _context.next = 6;
                return this.findAll();

              case 6:
                allUsers = _context.sent;
                ifuserexists = allUsers.some(function (item) {
                  return item.username === username;
                });

                if (!ifuserexists) {
                  _context.next = 10;
                  break;
                }

                throw new Error("this is username already exists");

              case 10:
                salt = (0, _bcrypt.genSaltSync)(9);
                hash = (0, _bcrypt.hashSync)(password, salt);
                userID = (0, _lib.UID)();
                userInfo = {
                  name: name,
                  username: username,
                  img: img,
                  _id: userID,
                  password: hash
                };
                data = JSON.stringify(userInfo);

                if (!(0, _fs.existsSync)("".concat(userDirectory, "/").concat(userID))) {
                  (0, _fs.mkdirSync)("".concat(userDirectory, "/").concat(userID));
                }

                dest = "".concat(userDirectory, "/").concat(userID, "/info.txt");
                (0, _fs.writeFileSync)(dest, data, "utf8");
                doesCacheneedsUpdate = true;
                return _context.abrupt("return", userInfo);

              case 22:
                _context.prev = 22;
                _context.t0 = _context["catch"](1);
                console.log(_context.t0);
                throw _context.t0;

              case 26:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 22]]);
      }));

      function create(_x) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "findAll",
    value: function () {
      var _findAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var x, y, result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;

                if (!(!doesCacheneedsUpdate && cache)) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", cache);

              case 3:
                x = (0, _fs.readdirSync)(userDirectory).reduce(function (acc, cur, i) {
                  return acc + "".concat(i == 0 ? "" : ",") + (0, _fs.readFileSync)(_path["default"].join(userDirectory, "/".concat(cur, "/info.txt")), {
                    encoding: "utf8"
                  });
                }, "[");
                y = "".concat(x, "]");
                result = JSON.parse(y);
                doesCacheneedsUpdate = false;
                cache = result;
                return _context2.abrupt("return", result);

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](0);
                throw _context2.t0;

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 11]]);
      }));

      function findAll() {
        return _findAll.apply(this, arguments);
      }

      return findAll;
    }()
  }, {
    key: "findById",
    value: function () {
      var _findById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_id) {
        var thisUser;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                thisUser = JSON.parse((0, _fs.readFileSync)(_path["default"].join(userDirectory, "/".concat(_id, "/info.txt")), {
                  encoding: "utf8"
                }));

                if (!(!thisUser || !thisUser._id)) {
                  _context3.next = 4;
                  break;
                }

                throw new Error("bad request");

              case 4:
                return _context3.abrupt("return", thisUser);

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                console.log("error in findbyid", _context3.t0);
                throw _context3.t0;

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 7]]);
      }));

      function findById(_x2) {
        return _findById.apply(this, arguments);
      }

      return findById;
    }()
  }, {
    key: "signup",
    value: function () {
      var _signup = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref2) {
        var name, username, password, img, thisUser;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                name = _ref2.name, username = _ref2.username, password = _ref2.password, img = _ref2.img;
                _context4.prev = 1;
                _context4.next = 4;
                return this.create({
                  name: name,
                  username: username,
                  password: password,
                  img: img
                });

              case 4:
                thisUser = _context4.sent;
                return _context4.abrupt("return", this.createToken(thisUser._id));

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](1);
                throw _context4.t0;

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 8]]);
      }));

      function signup(_x3) {
        return _signup.apply(this, arguments);
      }

      return signup;
    }()
  }, {
    key: "createToken",
    value: function createToken(_id) {
      return _jsonwebtoken["default"].sign({
        _id: _id
      }, "SECRET");
    }
  }, {
    key: "login",
    value: function () {
      var _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_ref3) {
        var username, password, thisUser;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                username = _ref3.username, password = _ref3.password;
                _context5.prev = 1;
                _context5.next = 4;
                return this.findAll();

              case 4:
                thisUser = _context5.sent.find(function (user) {
                  return user.username === username;
                });

                if (!(!thisUser || !thisUser._id)) {
                  _context5.next = 7;
                  break;
                }

                throw new Error("bad request");

              case 7:
                if ((0, _bcrypt.compareSync)(password, thisUser.password)) {
                  _context5.next = 9;
                  break;
                }

                throw new Error("password doesnt match");

              case 9:
                return _context5.abrupt("return", this.createToken(thisUser._id));

              case 12:
                _context5.prev = 12;
                _context5.t0 = _context5["catch"](1);
                throw _context5.t0;

              case 15:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1, 12]]);
      }));

      function login(_x4) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: "findByIdAndUpdate",
    value: function () {
      var _findByIdAndUpdate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(_id, data) {
        var thisUser, dest;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return this.findById(_id);

              case 3:
                thisUser = _context6.sent;
                Object.entries(data).forEach(function (_ref4) {
                  var _ref5 = (0, _slicedToArray2["default"])(_ref4, 2),
                      key = _ref5[0],
                      value = _ref5[1];

                  return thisUser[key] = value;
                });
                dest = "".concat(userDirectory, "/").concat(thisUser._id, "/info.txt");
                (0, _fs.writeFileSync)(dest, thisUser, "utf8");
                return _context6.abrupt("return", true);

              case 10:
                _context6.prev = 10;
                _context6.t0 = _context6["catch"](0);
                throw _context6.t0;

              case 13:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 10]]);
      }));

      function findByIdAndUpdate(_x5, _x6) {
        return _findByIdAndUpdate.apply(this, arguments);
      }

      return findByIdAndUpdate;
    }()
  }]);
  return UserSchema;
}();

var User = new UserSchema();
var _default = User;
exports["default"] = _default;