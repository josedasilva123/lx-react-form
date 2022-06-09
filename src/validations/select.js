import * as React from "react";
/**
 * @param {Object} props - Configurações do select
 * @param {boolean} props.optional - É opcional ou não (false por padrão)
 * @param {string} props.name - Nome do campo
 * @param {string} props.initialValue - Valor inicial (precisa corresponder a uma option)
 * @param {Object} props.errorText - Permite a configuração dos textos de erro
 */
export const useSelect = (props) => {
  const initialValue = props?.initialValue || "";
  const [value, setValue] = React.useState(initialValue);
  const [error, setError] = React.useState(null);

  /**
   * @param {boolean} disabledErrors - desabilitada a notificação de erro (ainda bloqueia o envio)
   */
  function validate(disabledErrors) {
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

  const onChange = (event) => {
    if (event.target.value || props?.optional) {
      console.log(event.target.value);
      setValue(event.target.value);
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
