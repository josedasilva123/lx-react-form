import * as React from "react";
import { iMask, iValidation } from "./types/global";

interface iValidationList{
  email: iValidation;
  cep: iValidation;
  senha: iValidation;
  telefone: iValidation;
}

interface iMaskList{
  cep: iMask;
  cpf: iMask;
  cnpj: iMask;
  telefone: iMask;
  inteiros: iMask;
}

const validations: iValidationList = {
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
    error: "A senha precisa ter no mínimo 8 caracteres, pelo menos 1 número, uma 1 letra maiúscula e 1 minúscula.",
  },
  telefone: {
    regex: /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/,
    error: "Digite um telefone ou celular válido",
  },
};

const masks: iMaskList = {
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

interface iInputErrorText{
  required?: string;
  minLength?: string;
  same?: string;
}

interface iUseInputProps{
  optional?: boolean;
  name: string;
  initialValue?: string;
  validation?: 'email' | 'cep' | 'senha' | 'telefone';
  mask?: 'cep' | 'cpf' | 'cnpj' | 'telefone' | 'inteiros';
  customValidation?: iValidation;
  customMask?: iMask;
  same?: string;
  minLength?:  number;
  errorText?: iInputErrorText;
}

interface iUseInputInputProps{
  value: string;
  name: string;
  onChange: (event: React.SyntheticEvent) => void;
  onKeyUp: () => void;
  onBlur: () => void;
}

interface iUseInputReturn{
  inputProps: iUseInputInputProps;
  type: "input",
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>;
  initialValue: string;
  error: string | null,
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  validate: (disabledErrors?: boolean) => void;
}

type tUseInput = (
  props: iUseInputProps,
) => iUseInputReturn;

/**
 * hook de validação de input (text, email, password)
 */
export const useInput: tUseInput = (props) => {
  const initialValue = props?.initialValue || "";
  const [value, setValue] = React.useState<string>(initialValue);
  const [error, setError] = React.useState<string | null>(null);

  /**
   * @param {boolean} disabledErrors - desabilitada a notificação de erro (ainda bloqueia o envio)
   */
  const validate = (disabledErrors?: boolean) => {
    
    // Atribui o erro ao estado caso o controle esteja habilitado
    function setValidateError(errorText: string) {
      if (!disabledErrors) {
        setError(errorText);
      }
    }

    if (props?.optional) return true;

    //Se campo estiver vazio
    if (value.length === 0) {
      setValidateError(props.errorText?.required || "Preencha um valor.");
      return false;

    //Se campo estiver abaixo do mínimo de caracteres
    } else if (props?.minLength && value.length < props?.minLength) {
      setValidateError(
        props.errorText?.minLength ||
          `Este campo precisa conter pelo menos ${props?.minLength} digitos.`
      );
      return false;

    // Se o campo não corresponder com o campo relacionado
    } else if (props?.same && value !== props?.same) {
      setValidateError(props.errorText?.same || "Os campos não correspondem.");
      return false;

    //Validação de Regex
    } else if (
      props?.validation &&
      !validations[props?.validation]?.regex.test(value)
    ) {
      setValidateError(validations[props?.validation].error);
      return false;
    //Validação de Regex Custom
    } else if (
      props?.customValidation &&
      !props?.customValidation.regex.test(value)
    ) {
      setValidateError(props?.customValidation.error);
      return false;
    } else {
      setError(null);
      return true;
    }
  };

  const maskInput = () => {
    if (props?.customMask || props?.mask) {
      const currentMask = props?.customMask || (props?.mask && masks[props?.mask]);
      let newValue = value;
      currentMask?.expressions.forEach((expression) => {
        newValue = newValue.replace(expression.regex, expression.replace);
      });
      setValue(newValue);
    }
  };

  const onChange = (event: React.SyntheticEvent) => {
    if (error) validate();
    const target = event.target as HTMLInputElement;
    setValue(target.value);
  
  };

  const onKeyUp = () => {
    if (props?.customMask || props?.mask) {
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
    },
    type: "input",
    value,
    setValue,
    initialValue,
    error,
    setError,
    validate: (disabledErrors) => validate(disabledErrors),
  };
};