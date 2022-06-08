"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "useCheckbox", {
  enumerable: true,
  get: function get() {
    return _checkbox.useCheckbox;
  }
});
Object.defineProperty(exports, "useForm", {
  enumerable: true,
  get: function get() {
    return _Form["default"];
  }
});
Object.defineProperty(exports, "useInput", {
  enumerable: true,
  get: function get() {
    return _input.useInput;
  }
});
Object.defineProperty(exports, "useSelect", {
  enumerable: true,
  get: function get() {
    return _select.useSelect;
  }
});

var _input = require("./validations/input");

var _checkbox = require("./validations/checkbox");

var _select = require("./validations/select");

var _Form = _interopRequireDefault(require("./hooks/Form"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }