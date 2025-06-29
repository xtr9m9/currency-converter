import { Box, Pagination } from '@mui/material';

interface Props {
  count: number;
  page: number;
  onChange: (newPage: number) => void;
}

// feat: добавлен компонент пагинацией

export const CurrencyPagination: React.FC<Props> = ({
  count,
  page,
  onChange,
}) => {
  return (
    <Box display="flex" justifyContent="center" mt={3}>
      <Pagination
        count={count}
        page={page}
        onChange={(_, value) => onChange(value)}
        color="primary"
      />
    </Box>
  );
};
