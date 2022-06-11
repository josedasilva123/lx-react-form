import * as React from "react";
interface iSelectErrorText {
    required?: string;
}
interface iUseSelectProps {
    optional?: boolean;
    name: string;
    initialValue?: string;
    errorText?: iSelectErrorText;
}
interface iUseSelectInputProps {
    value: string;
    name: string;
    onChange: (event: React.SyntheticEvent) => void;
}
interface iUseSelectReturn {
    inputProps: iUseSelectInputProps;
    type: "select";
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    initialValue: string;
    error: string | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    validate: (disabledErrors?: boolean) => void;
}
declare type tUseSelect = (props: iUseSelectProps) => iUseSelectReturn;
export declare const useSelect: tUseSelect;
export {};
