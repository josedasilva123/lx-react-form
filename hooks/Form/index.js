"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * @param {Object} props - Configurações do form
 * @param {[]} props.formFields - Uma lista dos campos gerados pelos hooks
 * @param {boolean} props.clearFields - Limpar os campos do formulário ao enviar
 * @param {() => void} props.submitCallback - Função, recebe formData como parâmetro padrão via callback
 */
var useForm = function useForm(_ref) {
  var formFields = _ref.formFields,
      stepMode = _ref.stepMode,
      stepFields = _ref.stepFields,
      clearFields = _ref.clearFields,
      submitCallback = _ref.submitCallback;

  var _React$useState = React.useState(0),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      step = _React$useState2[0],
      setStep = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      canProcede = _React$useState4[0],
      setCanProcede = _React$useState4[1];

  if (stepFields) {
    React.useEffect(function () {
      if (stepMode === "onChange" && stepFields) {
        var validationList = stepFields === null || stepFields === void 0 ? void 0 : stepFields[step].map(function (field) {
          return field.validate(true);
        });

        if (validationList.every(function (validation) {
          return validation;
        })) {
          setCanProcede(true);
        } else {
          setCanProcede(false);
        }
      }
    }, _toConsumableArray(stepFields[step].map(function (field) {
      return field.value;
    })));
  }

  function nextStep(event) {
    event.preventDefault(); //Executa todas as validações na etapa atual

    var validationList = stepFields === null || stepFields === void 0 ? void 0 : stepFields[step].map(function (field) {
      return field.validate();
    });

    if (validationList.every(function (validation) {
      return validation;
    })) {
      setStep(step + 1); //Incrementa a etapa
    }
  }

  function previousStep(event) {
    event.preventDefault();

    if (step > 0) {
      setStep(step - 1); //Decrementa a etapa
    }
  }

  function handleSubmit(event) {
    event.preventDefault(); //Executa todas as validações

    var validationList = formFields.map(function (field) {
      return field.validate();
    }); //Verifica se todas as validações são válidas

    if (validationList.every(function (validation) {
      return validation;
    })) {
      //Condensa os valores dos campos um objeto data (LX Hook Form)
      var formData = formFields.reduce(function (dataObject, currentItem) {
        dataObject[currentItem.inputProps.name] = currentItem.inputProps.value;
        return dataObject;
      }, {});
      submitCallback(formData); //Executa função de callback passando o formData
      //Função de limpeza de campos

      if (clearFields) {
        formFields.forEach(function (field) {
          var initialValue = field.type === "checkbox" ? false : "";
          field.setValue(initialValue);
        });
      }
    }
  }

  return {
    handleSubmit: handleSubmit,
    canProcede: canProcede,
    step: step,
    nextStep: nextStep,
    previousStep: previousStep
  };
};

var _default = useForm;
exports["default"] = _default;