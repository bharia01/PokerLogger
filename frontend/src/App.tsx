import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PlayerSummaryPage from './pages/PlayerSummaryPage';
import GroupSummaryPage from './pages/GroupSummaryPage';
import GroupDetailPage from './pages/GroupDetailPage';
import GamePage from './pages/GamePage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/players" element={<PlayerSummaryPage />} />
          <Route path="/groups" element={<GroupSummaryPage />} />
          <Route path="/groups/:groupId" element={<GroupDetailPage />} />
          <Route path="/games/:groupId" element={<GamePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
