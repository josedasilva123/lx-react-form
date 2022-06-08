import * as React from "react";

const validations = {
  email: {
    regex:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    error: "Digite um endereço de e-mail válido.",
  },
  cep: {
    regex: /^\d{5}-\d{3}$/,
    error: "Digite um CEP válido.",
  },
  senha: {
    regex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
    message:
      "A senha precisa ter no mínimo 8 caracteres, pelo menos 1 número, uma 1 letra maiúscula e 1 minúscula.",
  },
  telefone: {
    regex: /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/,
    error: "Digite um telefone ou celular válido",
  },
};

const masks = {
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
    clear: /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g,
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
    clear: /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g,
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
    clear: /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g,
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
    clear: /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g,
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
    clear: /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g,
  },
};

/**
 * @param {Object} props - Configurações do input
 * @param {boolean} props.optional - É opcional ou não (false por padrão)
 * @param {string} props.name - Nome do campo
 * @param {string} props.validation - Tipo de validação do campo  (email, cep, senha ou telefone)
 * @param {string} props.mask - Máscara do campo (cep, cpf, cnpj, telefone, inteiros)
 * @param {Object} props.customValidation - Validação personalizada, precisa de um regex + error
 * @param {Object} props.customMask - Mascará personalizada, precisa uma lista expressions + clear
 */
export const useInput = (props) => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(null);

  const validate = () => {
    if (props?.optional) return true;

    //Se campo estiver vazio
    if (value.length === 0) {
      setError("Preencha um valor.");
      return false;

      //Se campo estiver abaixo do mínimo de caracteres
    } else if (props?.minLength && value.length < props?.minLength) {
      setError(
        `Este campo precisa conter pelo menos ${props?.minLength} digitos.`
      );
      return false;

      //Validação de Regex
    } else if (
      props?.validation &&
      !validations[props?.validation]?.regex.test(value)
    ) {
      setError(validations[props?.validation].error);
      return false;

      //Validação de Regex Custom
    } else if (
      props?.customValidation &&
      !props?.customValidation.regex.test(value)
    ) {
      setError(props?.customValidation.error);
      return false;
    } else {
      setError(null);
      return true;
    }
  };

  const maskInput = () => {
    if (props?.mask) {

      const currentMask = props.customMask || masks[props?.mask];
      let newValue = value;
      currentMask.expressions.forEach((expression) => {
        newValue = newValue.replace(expression.regex, expression.replace);
      });
      setValue(newValue);
    }
  };

  const onChange = (event) => {
    if (error) validate();
    setValue(event.target.value);
  };

  const onKeyUp = () => {
    if (props?.mask) {
      maskInput();
    }
  };

  return {
    inputProps: {
      value,
      name: props?.name,
      onChange,
      onKeyUp,
      onBlur: () => validate(),
      error,
    },
    type: "input",
    setValue,
    setError,
    validate: () => validate(),
  };
};
