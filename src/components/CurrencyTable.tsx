import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
} from '@mui/material';
import { useState, Fragment } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { CurrencyRate } from '../api/types';

interface CurrencyTableProps {
  paginatedRates: CurrencyRate[];
  getRateChangeColor: (currentRate: string, previousRate?: string) => string;
}

// Это фейковый пример данных
const mockChartData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  value: Math.random() * 100 + 100,
}));

export const CurrencyTable: React.FC<CurrencyTableProps> = ({
  paginatedRates,
  getRateChangeColor,
}) => {
  const [openCrypto, setOpenCrypto] = useState<string | null>(null);

  const handleToggle = (crypto: string) => {
    setOpenCrypto((prev) => (prev === crypto ? null : crypto));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Cryptocurrency</TableCell>
            <TableCell align="right">USD Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedRates.map((rate) => (
            <Fragment key={rate.crypto}>
              <TableRow
                onClick={() => handleToggle(rate.crypto)}
                sx={{
                  backgroundColor: getRateChangeColor(
                    rate.usdRate,
                    rate.previousUsdRate
                  ),
                  cursor: 'pointer',
                  transition: 'background-color 0.5s ease',
                }}
              >
                <TableCell>{rate.crypto}</TableCell>
                <TableCell align="right">
                  {parseFloat(rate.usdRate).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 8,
                  })}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={2} sx={{ paddingBottom: 0, paddingTop: 0 }}>
                  <Collapse
                    in={openCrypto === rate.crypto}
                    timeout="auto"
                    unmountOnExit
                  >
                    <div style={{ height: 200, marginTop: 8 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={mockChartData}>
                          <XAxis dataKey="time" />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#8884d8"
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </Collapse>
                </TableCell>
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
