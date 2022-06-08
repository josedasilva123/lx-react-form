import * as React from "react";
/**
 * @param {Object} props - Configurações do checkbox
 * @param {boolean} props.optional - É opcional ou não (false por padrão)
 * @param {string} props.name - Nome do campo
 */
export const useCheckbox = (props) => {
  const [value, setValue] = React.useState(false);
  const [error, setError] = React.useState(null);

  const validate = () => {
    if (props?.optional) return true;
    if (!value) {
      setError("Marcar esta caixa é obrigátorio.");
      return false;
    } else {
      setError(null);
      return true;
    }
  };

  const onChange = ({ target }) => {
    if (target.checked || props?.optional) {
      setValue(true);
      setError(null);
    } else {
      setValue(false);
      setError("Marcar esta caixa é obrigátorio.");
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
    setValue,
    setError,
    validate: () => validate(),
  };
};
