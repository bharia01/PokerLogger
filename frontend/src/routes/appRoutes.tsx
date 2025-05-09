import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import AllPlayersPage from '../pages/AllPlayersPage';
import AdminRoute from '../components/AdminRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Admin-only route */}
      <Route
        path="/admin/players"
        element={
          <AdminRoute>
            <AllPlayersPage />
          </AdminRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;

