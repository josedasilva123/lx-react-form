import * as React from "react";

/**
 * @param {Object} props - Configurações do form
 * @param {[]} props.formFields - Uma lista dos campos gerados pelos hooks
 * @param {boolean} props.clearFields - Limpar os campos do formulário ao enviar
 * @param {() => void} props.submitCallback - Função, recebe formData como parâmetro padrão via callback
 */
const useForm = ({
  formFields,
  stepMode,
  stepFields,
  clearFields,
  submitCallback,
}) => {
  const [step, setStep] = React.useState(0);
  const [canProcede, setCanProcede] = React.useState(false);

  if (stepFields) {
    React.useEffect(() => {
      if (stepMode === "onChange" && stepFields) {
        const validationList = stepFields?.[step].map((field) =>
          field.validate(true)
        );
        if (validationList.every((validation) => validation)) {
          setCanProcede(true);
        } else {
          setCanProcede(false);
        }
      }
    }, [...stepFields[step].map(field => field.value)]);
  }

  function nextStep(event) {
    event.preventDefault();
    //Executa todas as validações na etapa atual
    const validationList = stepFields?.[step].map((field) => field.validate());
    if (validationList.every((validation) => validation)) {
      setStep(step + 1); //Incrementa a etapa
    }
  }

  function previousStep(event) {
    event.preventDefault();
    if (step > 0) {
      setStep(step - 1); //Decrementa a etapa
    }
  }

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
    canProcede,
    step,
    nextStep,
    previousStep,
  };
};

export default useForm;
