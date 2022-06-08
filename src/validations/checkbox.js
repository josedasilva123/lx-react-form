import * as React from "react";
/**
 * @param {Object} props - Configurações do checkbox
 * @param {boolean} props.optional - É opcional ou não (false por padrão)
 * @param {string} props.name - Nome do campo
 * @param {boolean} props.initialValue - Valor inicial
 * @param {Object} props.errorText - Permite a configuração dos textos de erro
 */
export const useCheckbox = (props) => {
  const initialValue = props?.initialValue || false;
  const [value, setValue] = React.useState(initialValue);
  const [error, setError] = React.useState(null);

  const validate = () => {
    if (props?.optional) return true;
    if (!value) {
      setError(props.errorText?.required || "Marcar esta caixa é obrigátorio.");
      return false;
    } else {
      setError(null);
      return true;
    }
  };

  const onChange = ({ target }) => {
    console.log(target.checked);
    if (target.checked || props?.optional) {
      setValue(true);
      setError(null);
    } else {
      setValue(false);
      setError(props.errorText?.required || "Marcar esta caixa é obrigátorio.");
    }
  };

  return {
    checkProps: {
      value,
      name: props?.name,
      onChange,
      error,
    },
    type: "checkbox",
    value,
    setValue,
    error,
    setError,
    validate: () => validate(),
  };
};
