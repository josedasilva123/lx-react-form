"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useInput = void 0;

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var validations = {
  email: {
    regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    error: "Digite um endereço de e-mail válido."
  },
  cep: {
    regex: /^\d{5}-\d{3}$/,
    error: "Digite um CEP válido."
  },
  senha: {
    regex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
    message: "A senha precisa ter no mínimo 8 caracteres, pelo menos 1 número, uma 1 letra maiúscula e 1 minúscula."
  },
  telefone: {
    regex: /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/,
    error: "Digite um telefone ou celular válido"
  }
};
var masks = {
  cep: {
    expressions: [{
      regex: /\D/g,
      replace: ""
    }, {
      regex: /^(\d{5})(\d)/,
      replace: "$1-$2"
    }] // clear: /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g,

  },
  cpf: {
    expressions: [{
      regex: /\D/g,
      replace: ""
    }, {
      regex: /(\d{3})(\d)/,
      replace: "$1.$2"
    }, {
      regex: /(\d{3})(\d)/,
      replace: "$1.$2"
    }, {
      regex: /(\d{3})(\d{1,2})$/,
      replace: "$1-$2"
    }] // clear: /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g,

  },
  cnpj: {
    expressions: [{
      regex: /\D/g,
      replace: ""
    }, {
      regex: /^(\d{2})(\d)/,
      replace: "$1.$2"
    }, {
      regex: /^(\d{2})\.(\d{3})(\d)/,
      replace: "$1.$2.$3"
    }, {
      regex: /\.(\d{3})(\d)/,
      replace: "$1/$2"
    }, {
      regex: /(\d{4})(\d)/,
      replace: "$1-$2"
    }] // clear: /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g,

  },
  telefone: {
    expressions: [{
      regex: /\D/g,
      replace: ""
    }, {
      regex: /^(\d{2})(\d)/g,
      replace: "($1) $2"
    }, {
      regex: /(\d)(\d{4})$/,
      replace: "$1-$2"
    }] // clear: /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g,

  },
  inteiros: {
    expressions: [{
      regex: /\D/g,
      replace: ""
    }, {
      regex: /(\d)$/,
      replace: "$1"
    }] // clear: /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g,

  }
};
/**
 * @param {Object} props - Configurações do input
 * @param {boolean} props.optional - É opcional ou não (false por padrão)
 * @param {string} props.name - Nome do campo
 * @param {string} props.initialValue - Valor inicial
 * @param {string} props.validation - Tipo de validação do campo  (email, cep, senha ou telefone)
 * @param {string} props.mask - Máscara do campo (cep, cpf, cnpj, telefone, inteiros)
 * @param {Object} props.customValidation - Validação personalizada, precisa de um regex + error
 * @param {Object} props.customMask - Mascará personalizada, precisa uma lista expressions + clear
 * @param {string} props.same - Compara o valor de um campo com outro, exigindo que os mesmos correspondam
 * @param {number} props.minLength - Quatidade de dígitos mínimos necessários
 * @param {Object} props.errorText - Permite a configuração dos textos de erro
 */

var useInput = function useInput(props) {
  var initialValue = (props === null || props === void 0 ? void 0 : props.initialValue) || "";

  var _React$useState = React.useState(initialValue),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      value = _React$useState2[0],
      setValue = _React$useState2[1];

  var _React$useState3 = React.useState(null),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      error = _React$useState4[0],
      setError = _React$useState4[1];
  /**
   * @param {boolean} disabledErrors - desabilitada a notificação de erro (ainda bloqueia o envio)
   */


  var _validate = function validate(disabledErrors) {
    var _validations$props$va;

    // Atribui o erro ao estado caso o controle esteja habilitado
    function setValidateError(errorText) {
      if (!disabledErrors) {
        setError(errorText);
      }
    }

    if (props !== null && props !== void 0 && props.optional) return true; //Se campo estiver vazio

    if (value.length === 0) {
      var _props$errorText;

      setValidateError(((_props$errorText = props.errorText) === null || _props$errorText === void 0 ? void 0 : _props$errorText.required) || "Preencha um valor.");
      return false; //Se campo estiver abaixo do mínimo de caracteres
    } else if (props !== null && props !== void 0 && props.minLength && value.length < (props === null || props === void 0 ? void 0 : props.minLength)) {
      var _props$errorText2;

      setValidateError(((_props$errorText2 = props.errorText) === null || _props$errorText2 === void 0 ? void 0 : _props$errorText2.minLength) || "Este campo precisa conter pelo menos ".concat(props === null || props === void 0 ? void 0 : props.minLength, " digitos."));
      return false; // Se o campo não corresponder com o campo relacionado
    } else if (props !== null && props !== void 0 && props.same && value !== (props === null || props === void 0 ? void 0 : props.same)) {
      var _props$errorText3;

      setValidateError(((_props$errorText3 = props.errorText) === null || _props$errorText3 === void 0 ? void 0 : _props$errorText3.same) || "Os campos não correspondem.");
      return false; //Validação de Regex
    } else if (props !== null && props !== void 0 && props.validation && !((_validations$props$va = validations[props === null || props === void 0 ? void 0 : props.validation]) !== null && _validations$props$va !== void 0 && _validations$props$va.regex.test(value))) {
      setValidateError(validations[props === null || props === void 0 ? void 0 : props.validation].error);
      return false; //Validação de Regex Custom
    } else if (props !== null && props !== void 0 && props.customValidation && !(props !== null && props !== void 0 && props.customValidation.regex.test(value))) {
      setValidateError(props === null || props === void 0 ? void 0 : props.customValidation.error);
      return false;
    } else {
      setError(null);
      return true;
    }
  };

  var maskInput = function maskInput() {
    if (props !== null && props !== void 0 && props.customMask || props !== null && props !== void 0 && props.mask) {
      var currentMask = (props === null || props === void 0 ? void 0 : props.customMask) || masks[props === null || props === void 0 ? void 0 : props.mask];
      var newValue = value;
      currentMask.expressions.forEach(function (expression) {
        newValue = newValue.replace(expression.regex, expression.replace);
      });
      setValue(newValue);
    }
  };

  var onChange = function onChange(event) {
    if (error) _validate();
    setValue(event.target.value);
  };

  var onKeyUp = function onKeyUp() {
    if (props !== null && props !== void 0 && props.customMask || props !== null && props !== void 0 && props.mask) {
      maskInput();
    }
  };

  return {
    inputProps: {
      value: value,
      name: props === null || props === void 0 ? void 0 : props.name,
      onChange: onChange,
      onKeyUp: onKeyUp,
      onBlur: function onBlur() {
        return _validate();
      }
    },
    type: "input",
    value: value,
    setValue: setValue,
    error: error,
    setError: setError,
    validate: function validate() {
      return _validate();
    }
  };
};

exports.useInput = useInput;