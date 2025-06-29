import React, { useState, useEffect } from 'react';
import {
  Paper,
  Pagination,
  Button,
  CircularProgress,
  Box,
  Typography,
  type SelectChangeEvent,
  useMediaQuery,
} from '@mui/material';
import { useCurrencyRates } from '../hooks/useCurrencyRates';
import { CurrencyHeader } from '../components/CurrencyHeader';
import { CurrencySortByPage } from '../components/CurrencySortByPage';
import { CurrencyTable } from '../components/CurrencyTable';

export const CurrencyListPage: React.FC = () => {
  const { error, fetchRates, lastUpdated, loading, rates } = useCurrencyRates();

  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<string | number>(10);
  const [order, setOrder] = useState<'asc' | 'desc' | undefined>(undefined);
  const [isSorted, setIsSorted] = useState(false);

  const isMobile = useMediaQuery('(max-width:700px)');

  useEffect(() => {
    const savedPage = localStorage.getItem('currencyPage');
    const savedRowsPerPage = localStorage.getItem('currencyRowsPerPage');

    if (savedPage) setPage(Number(savedPage));
    if (savedRowsPerPage) setRowsPerPage(Number(savedRowsPerPage));
  }, []);

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
    localStorage.setItem('currencyPage', newPage.toString());
  };

  const handleChangeRowsPerPage = (
    event: SelectChangeEvent<string | undefined>
  ) => {
    const newRowsPerPage = Number(event.target.value);
    setRowsPerPage(newRowsPerPage);
    setPage(1);
    localStorage.setItem('currencyRowsPerPage', newRowsPerPage.toString());
  };

  const handleSort = () => {
    if (!isSorted) {
      setIsSorted(true);
      setOrder('desc');
    } else {
      setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    }
  };

  const sortedRates = [...rates].sort((a, b) => {
    if (!isSorted) return 0;

    const rateA = parseFloat(a.usdRate);
    const rateB = parseFloat(b.usdRate);

    return order === 'asc' ? rateA - rateB : rateB - rateA;
  });

  const paginatedRates = sortedRates.slice(
    (page - 1) * Number(rowsPerPage),
    page * Number(rowsPerPage)
  );

  const getRateChangeColor = (current: string, previous?: string) => {
    if (!previous) return 'inherit';
    const currentNum = parseFloat(current);
    const previousNum = parseFloat(previous);
    return currentNum > previousNum
      ? '#4caf50'
      : currentNum < previousNum
      ? '#f44336'
      : 'inherit';
  };

  if (loading && rates.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" p={4}>
        <Typography color="error">{error}</Typography>
        <Button variant="contained" onClick={fetchRates} sx={{ mt: 2 }}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 3, mt: 2 }}>
      <CurrencyHeader
        lastUpdated={lastUpdated}
        loading={loading}
        onRefresh={fetchRates}
      />

      <CurrencySortByPage
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        order={order}
        rowsPerPage={rowsPerPage as string}
      />

      <CurrencyTable
        getRateChangeColor={getRateChangeColor}
        paginatedRates={paginatedRates}
      />

      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={Math.ceil(rates.length / Number(rowsPerPage))}
          page={page}
          onChange={handleChangePage}
          color="primary"
          hideNextButton={isMobile}
          hidePrevButton={isMobile}
          siblingCount={isMobile ? 0 : 1}
          boundaryCount={isMobile ? 1 : 2}
        />
      </Box>
    </Paper>
  );
};
