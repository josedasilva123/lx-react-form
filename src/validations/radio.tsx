import * as React from "react";

interface iRadioErrorText{
  required?: string;
}

interface iUseRadioProps{
  optional?: boolean;
  name: string;
  initialValue?: string;
  errorText?: iRadioErrorText;
}

interface iUseRadioInputProps{
  name: string;
  onChange: (event: React.SyntheticEvent) => void;
}

interface iUseRadioReturn{
  inputProps: iUseRadioInputProps;
  type: "radio",
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>;
  initialValue: string;
  error: string | null,
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  validate: (disabledErrors?: boolean) => void;
}

type tUseRadio = (
  props: iUseRadioProps,
) => iUseRadioReturn;

/**
 * hook para validação de radio
 */
export const useRadio: tUseRadio = (props) => {
  const initialValue = props?.initialValue || "";
  const [value, setValue] = React.useState(initialValue);
  const [error, setError] = React.useState<string | null>(null);

  /**
   * @param {boolean} disabledErrors - desabilitada a notificação de erro (ainda bloqueia o envio)
   */
  const validate = (disabledErrors?: boolean) => {
    if (props?.optional) return true;

    if (!value) {
      if (!disabledErrors) {
        setError(
          props.errorText?.required || "Marcar esta caixa é obrigátorio."
        );
      }
      return false;

    } else {
      setError(null);
      return true;

    }
  };

  const onChange = (event: React.SyntheticEvent) => {
    const target = event.currentTarget as HTMLInputElement;
    if (target.checked || props?.optional) {
      setValue(target.value);
      setError(null);
    }
  };

  return {
    inputProps: {
      name: props?.name,
      onChange,
    },
    type: "radio",
    value,
    setValue,
    initialValue,
    error,
    setError,
    validate: (disabledErrors) => validate(disabledErrors),
  };
};
