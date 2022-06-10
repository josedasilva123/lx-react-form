Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

var validations = {
    email: {
        regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        error: "Digite um endereço de e-mail válido.",
    },
    cep: {
        regex: /^\d{5}-\d{3}$/,
        error: "Digite um CEP válido.",
    },
    senha: {
        regex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
        error: "A senha precisa ter no mínimo 8 caracteres, pelo menos 1 número, uma 1 letra maiúscula e 1 minúscula.",
    },
    telefone: {
        regex: /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/,
        error: "Digite um telefone ou celular válido",
    },
};
var masks = {
    cep: {
        expressions: [
            {
                regex: /\D/g,
                replace: "",
            },
            {
                regex: /^(\d{5})(\d)/,
                replace: "$1-$2",
            },
        ],
        // clear: /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g,
    },
    cpf: {
        expressions: [
            {
                regex: /\D/g,
                replace: "",
            },
            {
                regex: /(\d{3})(\d)/,
                replace: "$1.$2",
            },
            {
                regex: /(\d{3})(\d)/,
                replace: "$1.$2",
            },
            {
                regex: /(\d{3})(\d{1,2})$/,
                replace: "$1-$2",
            },
        ],
        // clear: /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g,
    },
    cnpj: {
        expressions: [
            {
                regex: /\D/g,
                replace: "",
            },
            {
                regex: /^(\d{2})(\d)/,
                replace: "$1.$2",
            },
            {
                regex: /^(\d{2})\.(\d{3})(\d)/,
                replace: "$1.$2.$3",
            },
            {
                regex: /\.(\d{3})(\d)/,
                replace: "$1/$2",
            },
            {
                regex: /(\d{4})(\d)/,
                replace: "$1-$2",
            },
        ],
        // clear: /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g,
    },
    telefone: {
        expressions: [
            {
                regex: /\D/g,
                replace: "",
            },
            {
                regex: /^(\d{2})(\d)/g,
                replace: "($1) $2",
            },
            {
                regex: /(\d)(\d{4})$/,
                replace: "$1-$2",
            },
        ],
        // clear: /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g,
    },
    inteiros: {
        expressions: [
            {
                regex: /\D/g,
                replace: "",
            },
            {
                regex: /(\d)$/,
                replace: "$1",
            },
        ],
        // clear: /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g,
    },
};
/**
 * hook de validação de input (text, email, password)
 */
var useInput = function (props) {
    var initialValue = (props === null || props === void 0 ? void 0 : props.initialValue) || "";
    var _a = React__namespace.useState(initialValue), value = _a[0], setValue = _a[1];
    var _b = React__namespace.useState(null), error = _b[0], setError = _b[1];
    /**
     * @param {boolean} disabledErrors - desabilitada a notificação de erro (ainda bloqueia o envio)
     */
    var validate = function (disabledErrors) {
        var _a, _b, _c, _d;
        // Atribui o erro ao estado caso o controle esteja habilitado
        function setValidateError(errorText) {
            if (!disabledErrors) {
                setError(errorText);
            }
        }
        if (props === null || props === void 0 ? void 0 : props.optional)
            return true;
        //Se campo estiver vazio
        if (value.length === 0) {
            setValidateError(((_a = props.errorText) === null || _a === void 0 ? void 0 : _a.required) || "Preencha um valor.");
            return false;
            //Se campo estiver abaixo do mínimo de caracteres
        }
        else if ((props === null || props === void 0 ? void 0 : props.minLength) && value.length < (props === null || props === void 0 ? void 0 : props.minLength)) {
            setValidateError(((_b = props.errorText) === null || _b === void 0 ? void 0 : _b.minLength) ||
                "Este campo precisa conter pelo menos ".concat(props === null || props === void 0 ? void 0 : props.minLength, " digitos."));
            return false;
            // Se o campo não corresponder com o campo relacionado
        }
        else if ((props === null || props === void 0 ? void 0 : props.same) && value !== (props === null || props === void 0 ? void 0 : props.same)) {
            setValidateError(((_c = props.errorText) === null || _c === void 0 ? void 0 : _c.same) || "Os campos não correspondem.");
            return false;
            //Validação de Regex
        }
        else if ((props === null || props === void 0 ? void 0 : props.validation) &&
            !((_d = validations[props === null || props === void 0 ? void 0 : props.validation]) === null || _d === void 0 ? void 0 : _d.regex.test(value))) {
            setValidateError(validations[props === null || props === void 0 ? void 0 : props.validation].error);
            return false;
            //Validação de Regex Custom
        }
        else if ((props === null || props === void 0 ? void 0 : props.customValidation) &&
            !(props === null || props === void 0 ? void 0 : props.customValidation.regex.test(value))) {
            setValidateError(props === null || props === void 0 ? void 0 : props.customValidation.error);
            return false;
        }
        else {
            setError(null);
            return true;
        }
    };
    var maskInput = function () {
        if ((props === null || props === void 0 ? void 0 : props.customMask) || (props === null || props === void 0 ? void 0 : props.mask)) {
            var currentMask = (props === null || props === void 0 ? void 0 : props.customMask) || ((props === null || props === void 0 ? void 0 : props.mask) && masks[props === null || props === void 0 ? void 0 : props.mask]);
            var newValue_1 = value;
            currentMask === null || currentMask === void 0 ? void 0 : currentMask.expressions.forEach(function (expression) {
                newValue_1 = newValue_1.replace(expression.regex, expression.replace);
            });
            setValue(newValue_1);
        }
    };
    var onChange = function (event) {
        if (error)
            validate();
        var target = event.target;
        setValue(target.value);
    };
    var onKeyUp = function () {
        if ((props === null || props === void 0 ? void 0 : props.customMask) || (props === null || props === void 0 ? void 0 : props.mask)) {
            maskInput();
        }
    };
    return {
        inputProps: {
            value: value,
            name: props === null || props === void 0 ? void 0 : props.name,
            onChange: onChange,
            onKeyUp: onKeyUp,
            onBlur: function () { return validate(); },
        },
        type: "input",
        value: value,
        setValue: setValue,
        error: error,
        setError: setError,
        validate: function (disabledErrors) { return validate(disabledErrors); },
    };
};

/**
 * hook para validação de checkboxes
 */
var useCheckbox = function (props) {
    var initialValue = (props === null || props === void 0 ? void 0 : props.initialValue) || false;
    var _a = React__namespace.useState(initialValue), value = _a[0], setValue = _a[1];
    var _b = React__namespace.useState(null), error = _b[0], setError = _b[1];
    /**
     * @param {boolean} disabledErrors - desabilitada a notificação de erro (ainda bloqueia o envio)
     */
    var validate = function (disabledErrors) {
        var _a;
        if (props === null || props === void 0 ? void 0 : props.optional)
            return true;
        if (!value) {
            if (!disabledErrors) {
                setError(((_a = props.errorText) === null || _a === void 0 ? void 0 : _a.required) || "Marcar esta caixa é obrigátorio.");
            }
            return false;
        }
        else {
            setError(null);
            return true;
        }
    };
    var onChange = function (event) {
        var _a;
        var target = event.target;
        if (target.checked || (props === null || props === void 0 ? void 0 : props.optional)) {
            setValue(true);
            setError(null);
        }
        else {
            setValue(false);
            setError(((_a = props.errorText) === null || _a === void 0 ? void 0 : _a.required) || "Marcar esta caixa é obrigátorio.");
        }
    };
    return {
        inputProps: {
            value: value,
            name: props === null || props === void 0 ? void 0 : props.name,
            onChange: onChange,
        },
        type: "checkbox",
        value: value,
        setValue: setValue,
        error: error,
        setError: setError,
        validate: function (disabledErrors) { return validate(disabledErrors); },
    };
};

var useSelect = function (props) {
    var initialValue = (props === null || props === void 0 ? void 0 : props.initialValue) || "";
    var _a = React__namespace.useState(initialValue), value = _a[0], setValue = _a[1];
    var _b = React__namespace.useState(null), error = _b[0], setError = _b[1];
    /**
     * @param {boolean} disabledErrors - desabilitada a notificação de erro (ainda bloqueia o envio)
     */
    function validate(disabledErrors) {
        if (props === null || props === void 0 ? void 0 : props.optional)
            return true;
        if (!value) {
            if (!disabledErrors) {
                setError("É necessário selecionar pelo menos um valor neste campo.");
            }
            return false;
        }
        else {
            setError(null);
            return true;
        }
    }
    var onChange = function (event) {
        var target = event.target;
        if (target.value || (props === null || props === void 0 ? void 0 : props.optional)) {
            console.log(target.value);
            setValue(target.value);
            setError(null);
        }
        else {
            setValue("");
            setError("É necessário selecionar pelo menos um valor neste campo.");
        }
    };
    return {
        inputProps: {
            value: value,
            name: props === null || props === void 0 ? void 0 : props.name,
            onChange: onChange,
            error: error,
        },
        type: "select",
        value: value,
        setValue: setValue,
        error: error,
        setError: setError,
        validate: function (disabledErrors) { return validate(disabledErrors); },
    };
};

/**
 * hook para formulários
 */
var useForm = function (_a) {
    var formFields = _a.formFields, stepMode = _a.stepMode, stepClearFieldsOnBack = _a.stepClearFieldsOnBack, stepFields = _a.stepFields, clearFields = _a.clearFields, submitCallback = _a.submitCallback;
    var _b = React__namespace.useState(0), step = _b[0], setStep = _b[1];
    var _c = React__namespace.useState(false), canProceed = _c[0], setCanProceed = _c[1];
    if (stepFields) {
        React__namespace.useEffect(function () {
            if (stepMode === "onChange" && stepFields) {
                var validationList = stepFields === null || stepFields === void 0 ? void 0 : stepFields[step].map(function (field) {
                    return field.validate(true);
                });
                if (validationList.every(function (validation) { return validation; })) {
                    setCanProceed(true);
                }
                else {
                    setCanProceed(false);
                }
            }
        }, stepFields[step].map(function (field) { return field.value; }));
    }
    function nextStep(event) {
        event.preventDefault();
        //Executa todas as validações na etapa atual
        var validationList = stepFields === null || stepFields === void 0 ? void 0 : stepFields[step].map(function (field) { return field.validate(); });
        if (validationList.every(function (validation) { return validation; })) {
            setStep(step + 1); //Incrementa a etapa
        }
    }
    function previousStep(event) {
        event.preventDefault();
        if (step > 0) {
            if (stepClearFieldsOnBack) {
                stepFields[step].forEach(function (field) {
                    var initialValue = field.type === "checkbox" ? false : "";
                    field.setValue(initialValue);
                });
            }
            setStep(step - 1); //Decrementa a etapa
        }
    }
    function handleSubmit(event) {
        event.preventDefault();
        //Executa todas as validações
        var validationList = formFields.map(function (field) { return field.validate(); });
        //Verifica se todas as validações são válidas
        if (validationList.every(function (validation) { return validation; })) {
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
                //Reinicia etapas
                setStep(0);
            }
        }
    }
    return {
        handleSubmit: handleSubmit,
        canProceed: canProceed,
        step: step,
        nextStep: nextStep,
        previousStep: previousStep,
    };
};

exports.useCheckbox = useCheckbox;
exports.useForm = useForm;
exports.useInput = useInput;
exports.useSelect = useSelect;
//# sourceMappingURL=index.js.map
