interface iMaskExpression{
    regex: RegExp;
    replace: string;
  }
  
export interface iMask {
  expressions: iMaskExpression[];
}

export interface iValidation {
  regex: RegExp;
  error: string;
}

export interface iCustomRule{
  callback: (props?: any) => void;
  error: string;
}
