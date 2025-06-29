import { useEffect, useState } from 'react';
import { fetchCurrencyRates } from '../api/currencyApi';

export interface CurrencyRate {
  USD: number;
}

export interface CurrencyRatesResponse {
  [crypto: string]: number;
}

export const useCurrencyConverter = () => {
  const [rates, setRates] = useState<CurrencyRatesResponse>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRatesConverter = async () => {
    try {
      setLoading(true);
      const response = await fetchCurrencyRates();

      const transformedRates: CurrencyRatesResponse = {};
      for (const [crypto, rateData] of Object.entries(response)) {
        if (rateData && typeof rateData === 'object' && 'USD' in rateData) {
          transformedRates[crypto] = Number(rateData.USD) || 0;
        }
      }

      setRates(transformedRates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch rates');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRatesConverter();
  }, []);

  return { rates, loading, error };
};
