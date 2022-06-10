import * as React from "react";

interface iCheckboxErrorText{
  required?: string;
}

interface iUseCheckboxProps{
  optional?: boolean;
  name: string;
  initialValue?: boolean;
  errorText: iCheckboxErrorText;
}

interface iUseCheckboxInputProps{
  value: boolean;
  name: string;
  onChange: (event: React.SyntheticEvent) => void;
}

interface iUseCheckboxReturn{
  inputProps: iUseCheckboxInputProps;
  type: "checkbox",
  value: boolean,
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null,
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  validate: (disabledErrors?: boolean) => void;
}

type tUseCheckbox = (
  props: iUseCheckboxProps,
) => iUseCheckboxReturn;

/**
 * hook para validação de checkboxes
 */
export const useCheckbox: tUseCheckbox = (props) => {
  const initialValue = props?.initialValue || false;
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
    const target = event.target as HTMLInputElement;
    if (target.checked || props?.optional) {
      setValue(true);
      setError(null);
    } else {
      setValue(false);
      setError(props.errorText?.required || "Marcar esta caixa é obrigátorio.");
    }
  };

  return {
    inputProps: {
      value,
      name: props?.name,
      onChange,
    },
    type: "checkbox",
    value,
    setValue,
    error,
    setError,
    validate: (disabledErrors) => validate(disabledErrors),
  };
};
