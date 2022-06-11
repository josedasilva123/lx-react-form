import * as React from "react";
interface iRadioErrorText {
    required?: string;
}
interface iUseRadioProps {
    optional?: boolean;
    name: string;
    initialValue?: string;
    errorText?: iRadioErrorText;
}
interface iUseRadioInputProps {
    name: string;
    onChange: (event: React.SyntheticEvent) => void;
}
interface iUseRadioReturn {
    inputProps: iUseRadioInputProps;
    type: "radio";
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    initialValue: string;
    error: string | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    validate: (disabledErrors?: boolean) => void;
}
declare type tUseRadio = (props: iUseRadioProps) => iUseRadioReturn;
/**
 * hook para validação de radio
 */
export declare const useRadio: tUseRadio;
export {};
