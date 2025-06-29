import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  // SelectChangeEvent,
  InputAdornment,
  Paper,
  Alert,
  type SelectChangeEvent,
} from '@mui/material';
import { useCurrencyConverter } from '../hooks/useCurrencyConverter';

export const CurrencyConverterPage: React.FC = () => {
  const [amount, setAmount] = useState<string>('1');
  const [fromCurrency, setFromCurrency] = useState<string>('BTC');
  const [toCurrency, setToCurrency] = useState<string>('RUB');

  const { error, loading, rates } = useCurrencyConverter();

  const calculateResult = () => {
    if (
      !rates[fromCurrency] ||
      !rates[toCurrency] ||
      fromCurrency === toCurrency
    ) {
      return null;
    }

    const numericAmount = parseFloat(amount) || 0;
    const commission = 0.03;

    const amountInUsd = numericAmount * rates[fromCurrency];
    const amountAfterConversion = amountInUsd / rates[toCurrency];

    const amountWithoutCommission = amountAfterConversion / (1 + commission);
    const commissionAmount = amountAfterConversion - amountWithoutCommission;

    const isFiat = !['BTC', 'ETH', 'BNB', 'XRP'].includes(toCurrency);
    const formattedAmount = isFiat
      ? Math.floor(amountAfterConversion * 100) / 100
      : amountAfterConversion;

    const formattedWithoutCommission = isFiat
      ? Math.floor(amountWithoutCommission * 100) / 100
      : amountWithoutCommission;

    return {
      total: formattedAmount,
      withoutCommission: formattedWithoutCommission,
      commission: commissionAmount,
    };
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e: SelectChangeEvent) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e: SelectChangeEvent) => {
    setToCurrency(e.target.value);
  };
  const availableCurrencies = Object.keys(rates).sort();

  const conversionResult = calculateResult();

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        Currency Converter
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={handleAmountChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">{fromCurrency}</InputAdornment>
            ),
          }}
        />

        <Select
          value={fromCurrency}
          onChange={handleFromCurrencyChange}
          disabled={loading}
          fullWidth
        >
          {availableCurrencies.map((currency) => (
            <MenuItem key={`from-${currency}`} value={currency}>
              {currency}
            </MenuItem>
          ))}
        </Select>

        <Typography variant="h6" sx={{ alignSelf: 'center' }}>
          →
        </Typography>

        <Select
          value={toCurrency}
          onChange={handleToCurrencyChange}
          disabled={loading}
          fullWidth
        >
          {availableCurrencies.map((currency) => (
            <MenuItem
              key={`to-${currency}`}
              value={currency}
              disabled={currency === fromCurrency}
            >
              {currency}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {conversionResult && (
        <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
          <Typography variant="h6">Conversion Result:</Typography>
          <Typography>
            {amount} {fromCurrency} → {conversionResult.total.toLocaleString()}{' '}
            {toCurrency}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ({conversionResult.withoutCommission.toLocaleString()} {toCurrency}{' '}
            + 3% commission)
          </Typography>
        </Box>
      )}

      {fromCurrency === toCurrency && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          Cannot convert between the same currencies
        </Alert>
      )}
    </Paper>
  );
};
