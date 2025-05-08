export interface NewConversionInterface {
  coinName: string;
  coinAmount: number;
  convertedValueBRL: number;
  convertedValueUsd: number;  
}

export interface ConversionInterface extends NewConversionInterface {
  createdAt: string;
  userId: number;
}

export interface ConversionRequestInterface {
  coinId: string;
  coinAmount: number;
}
