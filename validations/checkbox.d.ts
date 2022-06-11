import * as React from "react";
interface iCheckboxErrorText {
    required?: string;
}
interface iUseCheckboxProps {
    optional?: boolean;
    name: string;
    initialValue?: boolean;
    errorText?: iCheckboxErrorText;
}
interface iUseCheckboxInputProps {
    value: boolean;
    name: string;
    onChange: (event: React.SyntheticEvent) => void;
}
interface iUseCheckboxReturn {
    inputProps: iUseCheckboxInputProps;
    type: "checkbox";
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
    initialValue?: boolean;
    error: string | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    validate: (disabledErrors?: boolean) => void;
}
declare type tUseCheckbox = (props: iUseCheckboxProps) => iUseCheckboxReturn;
/**
 * hook para validação de checkboxes
 */
export declare const useCheckbox: tUseCheckbox;
export {};
