import * as React from "react";

interface iUseFormProps {
  formFields: any[];
  stepMode?: "onChange";
  stepClearFieldsOnBack?: boolean;
  stepFields?: any;
  stepCallbacks?: any;
  clearFields?: boolean;
  submitCallback: (formData: any) => void;
}

interface iUseFormReturn {
  handleSubmit: (event: React.SyntheticEvent) => void;
  canProceed: boolean;
  step: number;
  nextStep: (event: React.SyntheticEvent) => void;
  previousStep: (event: React.SyntheticEvent) => void;
}

type tUseForm = (props: iUseFormProps) => iUseFormReturn;

/**
 * hook para formulários
 */
export const useForm: tUseForm = ({
  formFields,
  stepMode,
  stepClearFieldsOnBack,
  stepFields,
  stepCallbacks,
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
    }, [stepFields[step].map((field: any) => field.value)]);
  }

  function nextStep(event: React.SyntheticEvent) {
    event.preventDefault();

    const validationList = stepFields?.[step].map((field: any) =>
      field.validate()
    );

    if (validationList.every((validation: boolean) => validation)) {
      const callback = stepCallbacks?.[step];

      if (callback) {
        callback(stepFields?.[step]); 
      }

      setStep(step + 1); 
    }
  }

  function previousStep(event: React.SyntheticEvent) {
    event.preventDefault();
    if (step > 0) {
      if (stepClearFieldsOnBack) {
        stepFields[step].forEach((field: any) => {
          const initialValue = field.type === "checkbox" ? false : "";
          field.setValue(initialValue);
        });
      }
      setStep(step - 1); 
    }
  }

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();


    const validationList = formFields.map((field) => field.validate());

    if (validationList.every((validation) => validation)) {

      const formData = formFields.reduce((dataObject, currentItem) => {
        dataObject[currentItem.inputProps.name] = currentItem.value;
        return dataObject;
      }, {});

      submitCallback(formData); 

      if (clearFields) {
        formFields.forEach((field) => {
          function resetValue() {
            switch (field.type) {
              case "checkbox":
                return field.initialValue || false;
              case "checkboxgroup":
                return field.initialValue || [];
              default:
                return field.initialValue || "";
            }
          }
          const initialValue = resetValue();
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
