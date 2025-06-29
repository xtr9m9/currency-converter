import axios from 'axios';

export interface CurrencyRates {
  [crypto: string]: {
    [fiat: string]: number;
  };
}

const API_URL =
  import.meta.env.VITE_API_URL || 'https://api.coingate.com/api/v2/rates';

export const fetchCurrencyRates = async (): Promise<CurrencyRates> => {
  try {
    const response = await axios.get(API_URL);

    if (!response) {
      throw new Error('Invalid API response');
    }

    return response.data.merchant || {};
  } catch (error) {
    console.error('Failed to fetch currency rates:', error);
    throw error;
  }
};
