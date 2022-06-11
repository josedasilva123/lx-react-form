import * as React from "react";
interface iCheckboxGroupErrorText {
    required?: string;
    min?: string;
    max?: string;
}
interface iUseCheckboxGroupProps {
    optional?: boolean;
    name: string;
    min?: number;
    max?: number;
    initialValue?: string[] | [];
    errorText?: iCheckboxGroupErrorText;
}
interface iUseCheckboxGroupInputProps {
    name: string;
    onChange: (event: React.SyntheticEvent) => void;
}
interface iUseCheckboxGroupReturn {
    inputProps: iUseCheckboxGroupInputProps;
    type: "checkboxgroup";
    value: string[] | [];
    setValue: React.Dispatch<React.SetStateAction<[]>>;
    initialValue: string[] | [];
    error: string | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    validate: (disabledErrors?: boolean) => void;
}
declare type tUseCheckboxGroup = (props: iUseCheckboxGroupProps) => iUseCheckboxGroupReturn;
/**
 * hook para validação de grupos de checkbox
 */
export declare const useCheckboxGroup: tUseCheckboxGroup;
export {};
