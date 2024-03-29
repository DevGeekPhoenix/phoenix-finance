"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../../models/user"));

var _tag = _interopRequireDefault(require("../../models/tag"));

var _fs = require("fs");

var _path = _interopRequireDefault(require("path"));

var _auth = _interopRequireDefault(require("../../lib/auth"));

var _promises = require("stream/promises");

_path["default"].join(process.cwd(), "/src/db/users");

var _default = {
  root: {},
  Query: {
    me: function () {
      var _me = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, data, _ref) {
        var user, thisuser;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                user = _ref.user;
                _context.prev = 1;
                _context.next = 4;
                return (0, _auth["default"])(user);

              case 4:
                thisuser = _context.sent;
                return _context.abrupt("return", thisuser);

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);
                console.log(_context.t0);
                throw _context.t0;

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 8]]);
      }));

      function me(_x, _x2, _x3) {
        return _me.apply(this, arguments);
      }

      return me;
    }()
  },
  Mutation: {
    signup: function () {
      var _signup = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_, data) {
        var token;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _user["default"].signup(data);

              case 3:
                token = _context2.sent;
                return _context2.abrupt("return", {
                  token: token
                });

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                throw _context2.t0;

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 7]]);
      }));

      function signup(_x4, _x5) {
        return _signup.apply(this, arguments);
      }

      return signup;
    }(),
    login: function () {
      var _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_, data) {
        var token;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _user["default"].login(data);

              case 3:
                token = _context3.sent;
                return _context3.abrupt("return", {
                  token: token
                });

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                throw _context3.t0;

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 7]]);
      }));

      function login(_x6, _x7) {
        return _login.apply(this, arguments);
      }

      return login;
    }(),
    editMe: function () {
      var _editMe = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_, _ref2, _ref3) {
        var name, img, user, thisuser, _yield$img, createReadStream, mimetype, wtf, stream, out;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                name = _ref2.name, img = _ref2.img;
                user = _ref3.user;
                console.log("************");
                console.log(img);
                console.log(name);
                _context4.prev = 5;
                _context4.next = 8;
                return (0, _auth["default"])(user);

              case 8:
                thisuser = _context4.sent;

                if (!img) {
                  _context4.next = 23;
                  break;
                }

                _context4.next = 12;
                return img;

              case 12:
                _yield$img = _context4.sent;
                createReadStream = _yield$img.createReadStream;
                mimetype = _yield$img.mimetype;
                wtf = mimetype.split("/")[1];

                if (!(wtf !== "jpeg" && wtf !== "jpg" && wtf !== "png")) {
                  _context4.next = 18;
                  break;
                }

                throw new Error("bad request: Invalid file type");

              case 18:
                stream = createReadStream(); // await storeImageUpload({ stream, userId: thisuser._id });

                out = (0, _fs.createWriteStream)(_path["default"].join(process.cwd(), "/src/db/users/".concat(thisuser._id, "/profile.").concat(wtf)));
                stream.pipe(out);
                _context4.next = 23;
                return (0, _promises.finished)(out);

              case 23:
                console.log("salamasadsad");
                _context4.next = 26;
                return _user["default"].findByIdAndUpdate(thisuser._id, {
                  name: name
                });

              case 26:
                return _context4.abrupt("return", {
                  status: 200,
                  msg: "ok!"
                });

              case 29:
                _context4.prev = 29;
                _context4.t0 = _context4["catch"](5);
                throw _context4.t0;

              case 32:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[5, 29]]);
      }));

      function editMe(_x8, _x9, _x10) {
        return _editMe.apply(this, arguments);
      }

      return editMe;
    }()
  }
};
exports["default"] = _default;