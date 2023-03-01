import * as React from "react";
import { iCustomRule, iMask, iValidation } from "./types/global";
interface iInputErrorText {
  required?: string;
  minLength?: string;
  maxLength?: string;
  same?: string;
}
interface iUseInputProps {
  optional?: boolean;
  name: string;
  initialValue?: string;
  validation?: "email" | "cep" | "senha" | "telefone";
  mask?: "cep" | "cpf" | "cnpj" | "telefone" | "inteiros";
  customValidations?: iValidation[];
  customMask?: iMask;
  same?: string;
  minLength?: number;
  maxLength?: number;
  errorText?: iInputErrorText;
  customRule?: iCustomRule;
}
interface iUseInputInputProps {
  value: string;
  name: string;
  maxLength: number;
  onChange: (event: React.SyntheticEvent) => void;
  onKeyUp: () => void;
  onBlur: () => void;
}
interface iUseInputReturn {
  inputProps: iUseInputInputProps;
  type: "input";
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  initialValue: string;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  validate: (disabledErrors?: boolean) => void;
}
declare type tUseInput = (props: iUseInputProps) => iUseInputReturn;
/**
 * hook de validação de input (text, email, password)
 */
export declare const useInput: tUseInput;
export {};
