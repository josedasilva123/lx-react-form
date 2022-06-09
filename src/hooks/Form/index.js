import * as React from "react";

/**
 * @param {Object} props - Configurações do form
 * @param {string} props.stepMode - Pode ser "onChange", caso você deseje utilizar o canProceed como gatilho condicional
 * @param {boolean} props.stepClearFieldsOnBack - A função previousStep limpa os campos da etapa respectiva
 * @param {Object} props.stepFields - Um objeto contendo uma lista de campos para cada etapa do formulário
 * @param {Array} props.formFields - Uma lista dos campos gerados pelos hooks
 * @param {boolean} props.clearFields - Limpar os campos do formulário ao enviar
 * @param {() => void} props.submitCallback - Função, recebe formData como parâmetro padrão via callback
 */
export const useForm = ({
  formFields,
  stepMode,
  stepClearFieldsOnBack,
  stepFields,
  clearFields,
  submitCallback,
}) => {
  const [step, setStep] = React.useState(0);
  const [canProceed, setCanProceed] = React.useState(false);

  if (stepFields) {
    React.useEffect(() => {
      if (stepMode === "onChange" && stepFields) {
        const validationList = stepFields?.[step].map((field) =>
          field.validate(true)
        );
        if (validationList.every((validation) => validation)) {
          setCanProceed(true);
        } else {
          setCanProceed(false);
        }
      }
    }, stepFields[step].map(field => field.value));
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
      if(stepClearFieldsOnBack){
        stepFields[step].forEach((field) => {
          const initialValue = field.type === "checkbox" ? false : "";
          field.setValue(initialValue);
        });
      }
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
        //Reinicia etapas
        setStep(0);
      }
    }
  }

  return {
    handleSubmit,
    canProceed,
    step,
    nextStep,
    previousStep,
  };
};
