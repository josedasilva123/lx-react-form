import * as React from "react";
import { iCustomRule, iMask } from "./types/global";
interface iNumberErrorText {
    required?: string;
    min?: string;
    max?: string;
}
interface iUseNumberProps {
    optional?: boolean;
    min?: number;
    max?: number;
    mask?: "inteiros";
    customMask?: iMask;
    name: string;
    initialValue?: string;
    errorText?: iNumberErrorText;
    customRule?: iCustomRule;
}
interface iUseNumberInputProps {
    value: string;
    name: string;
    onChange: (event: React.SyntheticEvent) => void;
}
interface iUseNumberReturn {
    inputProps: iUseNumberInputProps;
    type: "number";
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    initialValue: string;
    error: string | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    validate: (disabledErrors?: boolean) => void;
}
declare type tUseNumber = (props: iUseNumberProps) => iUseNumberReturn;
export declare const useNumber: tUseNumber;
export {};
