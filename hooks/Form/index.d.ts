import * as React from "react";
interface iUseFormProps {
    formFields: any[];
    stepMode?: 'onChange';
    stepClearFieldsOnBack?: boolean;
    stepFields?: any;
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
declare type tUseForm = (props: iUseFormProps) => iUseFormReturn;
/**
 * hook para formulários
 */
export declare const useForm: tUseForm;
export {};
