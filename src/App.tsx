import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CurrencyListPage } from './pages/CurrencyListPage';
import { CurrencyConverterPage } from './pages/CurrencyConverterPage';
import { LoginPage } from './pages/LoginPage';
import { AppLayout } from './layout/AppLayout';
import { PrivateRoute } from './hoc/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <AppLayout>
                  <CurrencyListPage />
                </AppLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/converter"
            element={
              <PrivateRoute>
                <AppLayout>
                  <CurrencyConverterPage />
                </AppLayout>
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};
export default App;
