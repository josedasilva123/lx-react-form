import * as React from "react";

interface iCheckboxGroupErrorText {
  required?: string;
  min?: string;
  max?: string;
}

interface iUseCheckboxGroupProps {
  optional?: boolean;
  name: string;
  min?: number;
  max?: number;
  initialValue?: string[] | [];
  errorText?: iCheckboxGroupErrorText;
}

interface iUseCheckboxGroupInputProps {
  name: string;
  onChange: (event: React.SyntheticEvent) => void;
}

interface iUseCheckboxGroupReturn {
  inputProps: iUseCheckboxGroupInputProps;
  type: "checkboxgroup";
  value: string[] | [];
  setValue: React.Dispatch<React.SetStateAction<[]>>;
  initialValue: string[] | [],
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  validate: (disabledErrors?: boolean) => void;
}

type tUseCheckboxGroup = (
  props: iUseCheckboxGroupProps
) => iUseCheckboxGroupReturn;

/**
 * hook para validação de grupos de checkbox
 */
export const useCheckboxGroup: tUseCheckboxGroup = (props) => {
  const initialValue = props?.initialValue || [];
  const [firstChange, setFirstChange] = React.useState(false);
  const [value, setValue] = React.useState<string[] | []>(initialValue);
  const [error, setError] = React.useState<string | null>(null);

  const minChecks = props?.min || 1;
  const maxChecks = props?.max || false;

  React.useEffect(() => {
    if (firstChange) {
      if (value.length < minChecks && !maxChecks) {
        setError(
          props?.errorText?.min ||
            `Você precisa selecionar pelo menos ${minChecks} ${
              minChecks === 1 ? "opção" : "opções"
            }.`
        );
      } else if (value.length < minChecks || value.length > maxChecks) {
        setError(
          props?.errorText?.max ||
            `Você precisa selecionar pelo menos ${minChecks} e no máximo ${maxChecks} ${
              minChecks === 1 ? "opção" : "opções"
            }`
        );
      }
    }
  }, [value]);

  /**
   * @param {boolean} disabledErrors - desabilitada a notificação de erro (ainda bloqueia o envio)
   */
  const validate = (disabledErrors?: boolean) => {
    
    if (props?.optional) return true;

    function setValidateError(errorText: string) {
      if (!disabledErrors) {
        setError(errorText);
      }
    }

    if (value.length < minChecks && !maxChecks) {
      setValidateError(
        props?.errorText?.min ||
          `Você precisa selecionar pelo menos ${minChecks} ${
            minChecks === 1 ? "opção" : "opções"
          }.`
      );
      return false;

    } else if (value.length < minChecks || value.length > maxChecks) {
      setValidateError(
        props?.errorText?.max ||
          `Você precisa selecionar pelo menos ${minChecks} e no máximo ${maxChecks} ${
            minChecks === 1 ? "opção" : "opções"
          }`
      );
      return false;
    } else {
      setError(null);
      return true;
    }
  };

  const onChange = (event: React.SyntheticEvent) => {
    const target = event.currentTarget as HTMLInputElement;
    if (target.checked || props?.optional) {
      if (!value.find((v) => v === target.value)) {
        const newValue = [...value, target.value];
        setValue(newValue);
      }
      setError(null);
    } else {
      const newValue = value.filter((v) => v !== target.value);
      setValue(newValue);
    }

    //Declara primeira mudança
    if (!firstChange) setFirstChange(true);
  };

  return {
    inputProps: {
      name: props?.name,
      onChange,
    },
    type: "checkboxgroup",
    value,
    setValue,
    initialValue,
    error,
    setError,
    validate: (disabledErrors) => validate(disabledErrors),
  };
};
