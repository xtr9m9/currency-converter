import { AppBar, Toolbar, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button
            sx={{ color: 'white', '&:hover': { color: 'red' } }}
            component={Link}
            to="/"
          >
            Курсы
          </Button>
          <Button
            sx={{ color: 'white', '&:hover': { color: 'red' } }}
            component={Link}
            to="/converter"
          >
            Конвертер
          </Button>
          {isAuthenticated && (
            <Button
              color="inherit"
              onClick={logout}
              sx={{ marginLeft: 'auto' }}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        {children}
      </Container>
    </>
  );
};
