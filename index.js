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
var masks$1 = {
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
                regex: /(\d{2})(\d)/,
                replace: "$1.$2",
            },
            {
                regex: /(\d{3})(\d)/,
                replace: "$1.$2",
            },
            {
                regex: /(\d{3})(\d)/,
                replace: "$1/$2",
            },
            {
                regex: /(\d{4})(\d{1,2})$/,
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
    React__namespace.useEffect(function () {
        if (error)
            validate();
    }, [value]);
    /**
     * @param {boolean} disabledErrors - desabilitada a notificação de erro (ainda bloqueia o envio)
     */
    var validate = function (disabledErrors) {
        var _a, _b, _c, _d, _e, _f, _g;
        // Atribui o erro ao estado caso o controle esteja habilitado
        function setValidateError(errorText) {
            if (!disabledErrors) {
                setError(errorText);
            }
        }
        //Função para validar multiplos regex
        function doCustomValidations(validations) {
            var validationsErrors = [];
            validations.forEach(function (validation) {
                if (!validation.regex.test(value)) {
                    validationsErrors.push(validation.error);
                }
            });
            if (validationsErrors.length > 0) {
                return validationsErrors;
            }
            else {
                return true;
            }
        }
        //Regra de validação customizada
        function doCustomRule() {
            if (props === null || props === void 0 ? void 0 : props.customRule) {
                return props.customRule.callback(value);
            }
            else {
                return false;
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
            //Se o campo estiver acima do limite de caracteres  
        }
        else if ((props === null || props === void 0 ? void 0 : props.maxLength) && value.length > (props === null || props === void 0 ? void 0 : props.maxLength)) {
            setValidateError(((_c = props.errorText) === null || _c === void 0 ? void 0 : _c.minLength) ||
                "Este campo precisa conter no m\u00E1ximo ".concat(props === null || props === void 0 ? void 0 : props.maxLength, " digitos."));
            return false;
            //Campos com valores correspondentes  
        }
        else if ((props === null || props === void 0 ? void 0 : props.same) && value !== (props === null || props === void 0 ? void 0 : props.same)) {
            setValidateError(((_d = props.errorText) === null || _d === void 0 ? void 0 : _d.same) || "Os campos não correspondem.");
            return false;
            //Validação de Regex
        }
        else if ((props === null || props === void 0 ? void 0 : props.validation) && !((_e = validations[props === null || props === void 0 ? void 0 : props.validation]) === null || _e === void 0 ? void 0 : _e.regex.test(value))) {
            setValidateError(validations[props === null || props === void 0 ? void 0 : props.validation].error);
            return false;
            //Validação de Regex Custom
        }
        else if ((props === null || props === void 0 ? void 0 : props.customValidations) && doCustomValidations(props === null || props === void 0 ? void 0 : props.customValidations)) {
            var validationErrors = doCustomValidations(props === null || props === void 0 ? void 0 : props.customValidations);
            setValidateError(validationErrors[0]);
            return false;
            //Validação com regra customizada  
        }
        else if ((props === null || props === void 0 ? void 0 : props.customRule) && !doCustomRule()) {
            setError(((_f = props === null || props === void 0 ? void 0 : props.customRule) === null || _f === void 0 ? void 0 : _f.error) ? (_g = props === null || props === void 0 ? void 0 : props.customRule) === null || _g === void 0 ? void 0 : _g.error : 'Ocorreu um erro!');
            return false;
        }
        else {
            setError(null);
            return true;
        }
    };
    var maskInput = function () {
        if ((props === null || props === void 0 ? void 0 : props.customMask) || (props === null || props === void 0 ? void 0 : props.mask)) {
            var currentMask = (props === null || props === void 0 ? void 0 : props.customMask) || ((props === null || props === void 0 ? void 0 : props.mask) && masks$1[props === null || props === void 0 ? void 0 : props.mask]);
            var newValue_1 = value;
            currentMask === null || currentMask === void 0 ? void 0 : currentMask.expressions.forEach(function (expression) {
                newValue_1 = newValue_1.replace(expression.regex, expression.replace);
            });
            setValue(newValue_1);
        }
    };
    var onChange = function (event) {
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
            maxLength: String(props === null || props === void 0 ? void 0 : props.maxLength),
            onChange: onChange,
            onKeyUp: onKeyUp,
            onBlur: function () { return validate(); },
        },
        type: "input",
        value: value,
        setValue: setValue,
        initialValue: initialValue,
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
        initialValue: initialValue,
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
        },
        type: "select",
        value: value,
        setValue: setValue,
        initialValue: initialValue,
        error: error,
        setError: setError,
        validate: function (disabledErrors) { return validate(disabledErrors); },
    };
};

/**
 * hook para validação de radio
 */
var useRadio = function (props) {
    var initialValue = (props === null || props === void 0 ? void 0 : props.initialValue) || "";
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
        var target = event.currentTarget;
        if (target.checked || (props === null || props === void 0 ? void 0 : props.optional)) {
            setValue(target.value);
            setError(null);
        }
    };
    return {
        inputProps: {
            name: props === null || props === void 0 ? void 0 : props.name,
            onChange: onChange,
        },
        type: "radio",
        value: value,
        setValue: setValue,
        initialValue: initialValue,
        error: error,
        setError: setError,
        validate: function (disabledErrors) { return validate(disabledErrors); },
    };
};

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

/**
 * hook para validação de grupos de checkbox
 */
var useCheckboxGroup = function (props) {
    var initialValue = (props === null || props === void 0 ? void 0 : props.initialValue) || [];
    var _a = React__namespace.useState(false), firstChange = _a[0], setFirstChange = _a[1];
    var _b = React__namespace.useState(initialValue), value = _b[0], setValue = _b[1];
    var _c = React__namespace.useState(null), error = _c[0], setError = _c[1];
    var minChecks = (props === null || props === void 0 ? void 0 : props.min) || 1;
    var maxChecks = (props === null || props === void 0 ? void 0 : props.max) || false;
    React__namespace.useEffect(function () {
        var _a, _b;
        //Caso não haja limite máximo
        if (firstChange) {
            if (value.length < minChecks && !maxChecks) {
                setError(((_a = props === null || props === void 0 ? void 0 : props.errorText) === null || _a === void 0 ? void 0 : _a.min) ||
                    "Voc\u00EA precisa selecionar pelo menos ".concat(minChecks, " ").concat(minChecks === 1 ? "opção" : "opções", "."));
                //Caso haja limite máximo
            }
            else if (value.length < minChecks || value.length > maxChecks) {
                setError(((_b = props === null || props === void 0 ? void 0 : props.errorText) === null || _b === void 0 ? void 0 : _b.max) ||
                    "Voc\u00EA precisa selecionar pelo menos ".concat(minChecks, " e no m\u00E1ximo ").concat(maxChecks, " ").concat(minChecks === 1 ? "opção" : "opções"));
            }
        }
    }, [value]);
    /**
     * @param {boolean} disabledErrors - desabilitada a notificação de erro (ainda bloqueia o envio)
     */
    var validate = function (disabledErrors) {
        var _a, _b;
        if (props === null || props === void 0 ? void 0 : props.optional)
            return true;
        // Atribui o erro ao estado caso o controle esteja habilitado
        function setValidateError(errorText) {
            if (!disabledErrors) {
                setError(errorText);
            }
        }
        //Caso não haja limite máximo
        if (value.length < minChecks && !maxChecks) {
            setValidateError(((_a = props === null || props === void 0 ? void 0 : props.errorText) === null || _a === void 0 ? void 0 : _a.min) ||
                "Voc\u00EA precisa selecionar pelo menos ".concat(minChecks, " ").concat(minChecks === 1 ? "opção" : "opções", "."));
            return false;
            //Caso haja limite máximo
        }
        else if (value.length < minChecks || value.length > maxChecks) {
            setValidateError(((_b = props === null || props === void 0 ? void 0 : props.errorText) === null || _b === void 0 ? void 0 : _b.max) ||
                "Voc\u00EA precisa selecionar pelo menos ".concat(minChecks, " e no m\u00E1ximo ").concat(maxChecks, " ").concat(minChecks === 1 ? "opção" : "opções"));
            return false;
        }
        else {
            setError(null);
            return true;
        }
    };
    var onChange = function (event) {
        var target = event.currentTarget;
        if (target.checked || (props === null || props === void 0 ? void 0 : props.optional)) {
            if (!value.find(function (v) { return v === target.value; })) {
                var newValue = __spreadArray(__spreadArray([], value, true), [target.value], false);
                setValue(newValue);
            }
            setError(null);
        }
        else {
            var newValue = value.filter(function (v) { return v !== target.value; });
            setValue(newValue);
        }
        //Declara primeira mudança
        if (!firstChange)
            setFirstChange(true);
    };
    return {
        inputProps: {
            name: props === null || props === void 0 ? void 0 : props.name,
            onChange: onChange,
        },
        type: "checkboxgroup",
        value: value,
        setValue: setValue,
        initialValue: initialValue,
        error: error,
        setError: setError,
        validate: function (disabledErrors) { return validate(disabledErrors); },
    };
};

/**
 * hook para formulários
 */
var useForm = function (_a) {
    var formFields = _a.formFields, stepMode = _a.stepMode, stepClearFieldsOnBack = _a.stepClearFieldsOnBack, stepFields = _a.stepFields, stepCallbacks = _a.stepCallbacks, clearFields = _a.clearFields, submitCallback = _a.submitCallback;
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
        }, [stepFields[step].map(function (field) { return field.value; })]);
    }
    function nextStep(event) {
        event.preventDefault();
        //Executa todas as validações na etapa atual
        var validationList = stepFields === null || stepFields === void 0 ? void 0 : stepFields[step].map(function (field) {
            return field.validate();
        });
        if (validationList.every(function (validation) { return validation; })) {
            var callback = stepCallbacks === null || stepCallbacks === void 0 ? void 0 : stepCallbacks[step];
            if (callback) {
                callback(stepFields === null || stepFields === void 0 ? void 0 : stepFields[step]); //Callback da respectiva etapa
            }
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
                dataObject[currentItem.inputProps.name] = currentItem.value;
                return dataObject;
            }, {});
            submitCallback(formData); //Executa função de callback passando o formData
            //Função de limpeza de campos
            if (clearFields) {
                formFields.forEach(function (field) {
                    function resetValue() {
                        switch (field.type) {
                            case "checkbox":
                                return field.initialValue || false;
                            case "checkboxgroup":
                                return field.initialValue || [];
                            default:
                                return field.initialValue || "";
                        }
                    }
                    var initialValue = resetValue();
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

var masks = {
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
var useNumber = function (props) {
    var initialValue = (props === null || props === void 0 ? void 0 : props.initialValue) || "";
    var _a = React__namespace.useState(initialValue), value = _a[0], setValue = _a[1];
    var _b = React__namespace.useState(null), error = _b[0], setError = _b[1];
    React__namespace.useEffect(function () {
        //Caso não haja limite máximo
        if (value) {
            if (error)
                validate();
        }
    }, [value]);
    /**
     * @param {boolean} disabledErrors - desabilitada a notificação de erro (ainda bloqueia o envio)
     */
    function validate(disabledErrors) {
        var _a, _b, _c, _d, _e;
        if (props === null || props === void 0 ? void 0 : props.optional)
            return true;
        var minNumber = (props === null || props === void 0 ? void 0 : props.min) || 0;
        var maxNumber = props === null || props === void 0 ? void 0 : props.max;
        // Atribui o erro ao estado caso o controle esteja habilitado
        function setValidateError(errorText) {
            if (!disabledErrors) {
                setError(errorText);
            }
        }
        //Regra de validação customizada
        function doCustomRule() {
            if (props === null || props === void 0 ? void 0 : props.customRule) {
                return props.customRule.callback(value);
            }
            else {
                return true;
            }
        }
        if (!value) {
            setValidateError(((_a = props === null || props === void 0 ? void 0 : props.errorText) === null || _a === void 0 ? void 0 : _a.required) || "Preencha um valor.");
            return false;
            //Verica valor mínimo
        }
        else if (+value.replace(",", ".") < minNumber) {
            setValidateError(((_b = props === null || props === void 0 ? void 0 : props.errorText) === null || _b === void 0 ? void 0 : _b.min) || "O valor precisar ser no m\u00EDnimo ".concat(minNumber, "."));
            return false;
            //Verifica valor máximo
        }
        else if (maxNumber && +value.replace(",", ".") > maxNumber) {
            setValidateError(((_c = props === null || props === void 0 ? void 0 : props.errorText) === null || _c === void 0 ? void 0 : _c.max) || "O valor n\u00E3o pode ultrapassar ".concat(maxNumber, "."));
            return false;
            //Validação com regra customizada      
        }
        else if ((props === null || props === void 0 ? void 0 : props.customRule) && !doCustomRule()) {
            setValidateError(((_d = props === null || props === void 0 ? void 0 : props.customRule) === null || _d === void 0 ? void 0 : _d.error) ? (_e = props === null || props === void 0 ? void 0 : props.customRule) === null || _e === void 0 ? void 0 : _e.error : 'Ocorreu um erro!');
            return false;
        }
        else {
            setError(null);
            return true;
        }
    }
    var onChange = function (event) {
        var target = event.target;
        setValue(target.value);
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
        type: "number",
        value: value,
        setValue: setValue,
        initialValue: initialValue,
        error: error,
        setError: setError,
        validate: function (disabledErrors) { return validate(disabledErrors); },
    };
};

exports.useCheckbox = useCheckbox;
exports.useCheckboxGroup = useCheckboxGroup;
exports.useForm = useForm;
exports.useInput = useInput;
exports.useNumber = useNumber;
exports.useRadio = useRadio;
exports.useSelect = useSelect;
//# sourceMappingURL=index.js.map
