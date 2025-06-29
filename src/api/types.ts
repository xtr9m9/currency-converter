export interface CurrencyRate {
  crypto: string;
  usdRate: string;
  previousUsdRate?: string;
}

export interface ConversionResult {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  total: number;
  withoutCommission: number;
  commission: number;
}
