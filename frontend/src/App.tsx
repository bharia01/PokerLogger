import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
// import PlayerSummaryPage from './pages/AllPlayersPage';
import GroupPage from './pages/GroupPage';
import GroupDetailPage from './pages/GroupDetailPage';
import GamePage from './pages/GamePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/players" element={<PlayerSummaryPage />} />
        <Route path="/groups" element={<GroupSummaryPage />} />
        <Route path="/groups/:groupId" element={<GroupDetailPage />} />
        <Route path="/games/:groupId" element={<GamePage />} /> */}
              {/* Protected routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute><DashboardPage /></ProtectedRoute>
        } />
        <Route path="/groups" element={
          <ProtectedRoute><GroupPage /></ProtectedRoute>
        } />
        <Route path="/groups/:groupId" element={
          <ProtectedRoute><GroupDetailPage /></ProtectedRoute>
        } />
        <Route path="/games" element={
          <ProtectedRoute><GamePage /></ProtectedRoute>
        } />
      </Routes>
    </Layout>
  );
}

export default App;
