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
