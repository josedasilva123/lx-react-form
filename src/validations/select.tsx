import * as React from "react";

interface iSelectErrorText{
  required?: string;
}

interface iUseSelectProps{
  optional?: boolean;
  name: string;
  initialValue?: string;
  errorText: iSelectErrorText;
}

interface iUseSelectInputProps{
  value: string;
  name: string;
  onChange: (event: React.SyntheticEvent) => void;
}

interface iUseSelectReturn{
  inputProps: iUseSelectInputProps;
  type: "select",
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>;
  error: string | null,
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  validate: (disabledErrors?: boolean) => void;
}

type tUseSelect = (
  props: iUseSelectProps,
) => iUseSelectReturn;

export const useSelect: tUseSelect = (props) => {
  const initialValue = props?.initialValue || "";
  const [value, setValue] = React.useState(initialValue);
  const [error, setError] = React.useState<string | null>(null);

  /**
   * @param {boolean} disabledErrors - desabilitada a notificação de erro (ainda bloqueia o envio)
   */
  function validate(disabledErrors?: boolean) {
    if (props?.optional) return true;
    if (!value) {
      if (!disabledErrors) {
        setError("É necessário selecionar pelo menos um valor neste campo.");
      }
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  const onChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    if (target.value || props?.optional) {
      console.log(target.value);
      setValue(target.value);
      setError(null);
    } else {
      setValue("");
      setError("É necessário selecionar pelo menos um valor neste campo.");
    }
  };

  return {
    inputProps: {
      value,
      name: props?.name,
      onChange,
      error,
    },
    type: "select",
    value,
    setValue,
    error,
    setError,
    validate: (disabledErrors) => validate(disabledErrors),
  };
};
