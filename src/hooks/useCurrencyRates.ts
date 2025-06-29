import { useEffect, useState } from 'react';
import { fetchCurrencyRates } from '../api/currencyApi';
import type { CurrencyRate } from '../api/types';

// хук для валют

export const useCurrencyRates = () => {
  const [rates, setRates] = useState<CurrencyRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState('');

  const fetchRates = async () => {
    try {
      setLoading(true);
      const response = await fetchCurrencyRates();

      setRates((prevRates) => {
        const newRates: CurrencyRate[] = [];

        for (const [crypto, rates] of Object.entries(response)) {
          if (typeof rates === 'object' && 'USD' in rates) {
            newRates.push({
              crypto,
              usdRate: String(rates.USD),
              previousUsdRate: prevRates.find((r) => r.crypto === crypto)
                ?.usdRate,
            });
          }
        }

        return newRates;
      });

      setLastUpdated(new Date().toLocaleTimeString());
      setError(null);
    } catch (err) {
      setError(
        `Error: ${err instanceof Error ? err.message : 'Failed to fetch rates'}`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 30000);
    return () => clearInterval(interval);
  }, []);

  return {
    rates,
    setRates,
    setLoading,
    loading,
    setError,
    error,
    lastUpdated,
    fetchRates,
  };
};
