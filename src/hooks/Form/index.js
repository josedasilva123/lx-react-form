/**
 * @param {Object} props - Configurações do form
 * @param {Array} props.formFields - Uma lista dos campos gerados pelos hooks
 * @param {boolean} props.clearFields - Limpar os campos do formulário ao enviar
 * @param {() => void} props.submitCallback - Função, recebe formData como parâmetro padrão via callback
 */
const useForm = ({
  formFields,
  clearFields,
  submitCallback,
}) => {
  function handleSubmit(event) {
    event.preventDefault();

    //Executa todas as validações
    const validationList = formFields.map((field) => field.validate());

    //Verifica se todas as validações são válidas
    if (validationList.every((validation) => validation)) {
      //Condensa os valores dos campos um objeto data (LX Hook Form)
      const formData = formFields.reduce((dataObject, currentItem) => {
        dataObject[currentItem.inputProps.name] = currentItem.inputProps.value;
        return dataObject;
      }, {});

      submitCallback(formData); //Executa função de callback passando o formData

      //Função de limpeza de campos
      if (clearFields) {
        formFields.forEach((field) => {
          const initialValue = field.type === "checkbox" ? false : "";
          field.setValue(initialValue);
        });
      }
    }
  }

  return {
      handleSubmit,
  }
};

export default useForm;
