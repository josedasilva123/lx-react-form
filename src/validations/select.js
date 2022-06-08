import * as React from "react";
/**
 * @param {Object} props - Configurações do select
 * @param {boolean} props.optional - É opcional ou não (false por padrão)
 * @param {string} props.name - Nome do campo
 * @param {string} props.initialValue - Valor inicial (precisa corresponder a uma option)
 * @param {Object} props.errorText - Permite a configuração dos textos de erro
 */
export const useSelect = (props) => {
    const [value, setValue] = React.useState(initialValue || "");
    const [error, setError] = React.useState(null);
  
    function validate() {
      if (props?.optional) return true;
      if (!value) {
        setError("É necessário selecionar pelo menos um valor neste campo.");
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
      selectProps: {
        value,
        name: props?.name,
        onChange,
        error,
      },
      type: "select",
      setValue,
      setError,
      validate: () => validate(),
    };
  };
  