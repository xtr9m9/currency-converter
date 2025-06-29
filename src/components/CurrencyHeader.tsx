import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Button,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import useMediaQuery from '@mui/material/useMediaQuery';

interface Props {
  lastUpdated: string;
  loading: boolean;
  onRefresh: () => void;
}

export const CurrencyHeader: React.FC<Props> = ({
  lastUpdated,
  loading,
  onRefresh,
}) => {
  const isMobile = useMediaQuery('(max-width:700px)');

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={3}
    >
      <Typography variant={isMobile ? 'h6' : 'h5'}>
        {isMobile ? 'Rates' : 'Cryptocurrency Rates (USD)'}
      </Typography>

      {isMobile ? (
        <IconButton
          onClick={onRefresh}
          disabled={loading}
          color="primary"
          aria-label="refresh"
        >
          {loading ? <CircularProgress size={24} /> : <RefreshIcon />}
        </IconButton>
      ) : (
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="body2" color="text.secondary">
            Last updated: {lastUpdated}
          </Typography>
          <Button
            variant="outlined"
            onClick={onRefresh}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            Refresh
          </Button>
        </Box>
      )}
    </Box>
  );
};
