"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeLastCharacter = exports.removeFirstCharacter = exports.UID = void 0;

var UID = function UID() {
  return "".concat(new Date().getTime()).concat(String(Math.random()).slice(3, 9));
};

exports.UID = UID;

var removeLastCharacter = function removeLastCharacter(str) {
  return str.slice(0, str.length - 1);
};

exports.removeLastCharacter = removeLastCharacter;

var removeFirstCharacter = function removeFirstCharacter(str) {
  return str.slice(1, str.length);
};

exports.removeFirstCharacter = removeFirstCharacter;