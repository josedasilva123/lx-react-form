import * as React from "react";

interface iUseFormProps{
  formFields: any[],
  stepMode?: 'onChange',
  stepClearFieldsOnBack?: boolean,
  stepFields?: any;
  clearFields?: boolean;
  submitCallback: (formData: any) => void;
}

interface iUseFormReturn{
  handleSubmit: (event: React.SyntheticEvent) => void;
  canProceed: boolean;
  step: number;
  nextStep: (event: React.SyntheticEvent) => void;
  previousStep: (event: React.SyntheticEvent) => void;
}

type tUseForm = (
 props: iUseFormProps,
) => iUseFormReturn;

/**
 * hook para formulários
 */
export const useForm: tUseForm = ({
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
        const validationList = stepFields?.[step].map((field: any) =>
          field.validate(true)
        );
        if (validationList.every((validation: boolean) => validation)) {
          setCanProceed(true);
        } else {
          setCanProceed(false);
        }
      }
    }, stepFields[step].map((field: any) => field.value));
  }

  function nextStep(event: React.SyntheticEvent) {
    event.preventDefault();
    //Executa todas as validações na etapa atual
    const validationList = stepFields?.[step].map((field: any) => field.validate());
    if (validationList.every((validation: boolean) => validation)) {
      setStep(step + 1); //Incrementa a etapa
    }
  }

  function previousStep(event: React.SyntheticEvent) {
    event.preventDefault();
    if (step > 0) {
      if(stepClearFieldsOnBack){
        stepFields[step].forEach((field: any) => {
          const initialValue = field.type === "checkbox" ? false : "";
          field.setValue(initialValue);
        });
      }
      setStep(step - 1); //Decrementa a etapa
    }
  }

  function handleSubmit(event: React.SyntheticEvent) {
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
