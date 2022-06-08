"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * @param {Object} props - Configurações do form
 * @param {Array} props.formFields - Uma lista dos campos gerados pelos hooks
 * @param {boolean} props.clearFields - Limpar os campos do formulário ao enviar
 * @param {() => void} props.submitCallback - Função, recebe formData como parâmetro padrão via callback
 */
var useForm = function useForm(_ref) {
  var formFields = _ref.formFields,
      clearFields = _ref.clearFields,
      submitCallback = _ref.submitCallback;

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
    handleSubmit: handleSubmit
  };
};

var _default = useForm;
exports["default"] = _default;