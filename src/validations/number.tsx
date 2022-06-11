import * as React from "react";
import { iMask } from "./types/global";

interface iMaskList {
  inteiros: iMask;
}

const masks: iMaskList = {
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

interface iNumberErrorText {
  required?: string;
  min?: string;
  max?: string;
}

interface iUseNumberProps {
  optional?: boolean;
  min?: number;
  max?: number;
  mask?: "inteiros";
  customMask?: iMask;
  name: string;
  initialValue?: string;
  errorText?: iNumberErrorText;
}

interface iUseNumberInputProps {
  value: string;
  name: string;
  onChange: (event: React.SyntheticEvent) => void;
}

interface iUseNumberReturn {
  inputProps: iUseNumberInputProps;
  type: "number";
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  initialValue: string;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  validate: (disabledErrors?: boolean) => void;
}

type tUseNumber = (props: iUseNumberProps) => iUseNumberReturn;

export const useNumber: tUseNumber = (props) => {
  const initialValue = props?.initialValue || "";
  const [value, setValue] = React.useState(initialValue);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    //Caso não haja limite máximo
    if (value) {
      if(error) validate();
    }
  }, [value]);

  /**
   * @param {boolean} disabledErrors - desabilitada a notificação de erro (ainda bloqueia o envio)
   */
  function validate(disabledErrors?: boolean) {
    if (props?.optional) return true;

    const minNumber = props?.min || 0;
    const maxNumber = props?.max;
    
    // Atribui o erro ao estado caso o controle esteja habilitado
    function setValidateError(errorText: string) {
      if (!disabledErrors) {
        setError(errorText);
      }
    }

    if (!value) {
      setValidateError(props?.errorText?.required || "Preencha um valor.");
      return false;

      //Verica valor mínimo
    } else if (+value.replace(",", ".") < minNumber) {
      setValidateError(
        props?.errorText?.min || `O valor precisar ser no mínimo ${minNumber}.`
      );
      return false;

      //Verifica valor máximo
    } else if (maxNumber && +value.replace(",", ".") > maxNumber) {
      setValidateError(
        props?.errorText?.max || `O valor não pode ultrapassar ${maxNumber}.`
      );
      return false;

    } else {
      setError(null);
      return true;
    }
  }

  const onChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setValue(target.value);
  };

  const maskInput = () => {
    if (props?.customMask || props?.mask) {
      const currentMask =
        props?.customMask || (props?.mask && masks[props?.mask]);
      let newValue = value;
      currentMask?.expressions.forEach((expression) => {
        newValue = newValue.replace(expression.regex, expression.replace);
      });
      setValue(newValue);
    }
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
    type: "number",
    value,
    setValue,
    initialValue,
    error,
    setError,
    validate: (disabledErrors) => validate(disabledErrors),
  };
};
