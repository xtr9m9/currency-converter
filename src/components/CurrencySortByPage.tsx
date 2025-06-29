import {
  Box,
  MenuItem,
  Select,
  TableSortLabel,
  type SelectChangeEvent,
} from '@mui/material';
import type { FC } from 'react';

interface CurrencySortProps {
  rowsPerPage: string;
  handleChangeRowsPerPage: (event: SelectChangeEvent<string>) => void;
  order: 'desc' | 'asc' | undefined;
  handleSort: (event: React.MouseEvent<unknown>) => void;
}

// feat: добавлен компонент сортировкой

export const CurrencySortByPage: FC<CurrencySortProps> = ({
  rowsPerPage,
  handleChangeRowsPerPage,
  order,
  handleSort,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
    >
      <Select
        value={rowsPerPage}
        onChange={handleChangeRowsPerPage}
        size="small"
        sx={{ minWidth: 100 }}
      >
        <MenuItem value={10}>10 per page</MenuItem>
        <MenuItem value={25}>25 per page</MenuItem>
        <MenuItem value={50}>50 per page</MenuItem>
        <MenuItem value={100}>100 per page</MenuItem>
      </Select>

      <TableSortLabel
        active={order !== undefined}
        direction={order || 'asc'}
        onClick={handleSort}
      >
        Sort by rate
      </TableSortLabel>
    </Box>
  );
};
