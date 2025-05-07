import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PlayerSummaryPage from '../pages/PlayerSummaryPage';
import GroupSummaryPage from '../pages/GroupSummaryPage';
import GamePage from '../pages/GamePage';
import GroupDetailPage from '../pages/GroupDetailPage';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlayerSummaryPage />} />
        <Route path="/" element={<GroupSummaryPage />} />
        <Route path="/" element={<GamePage />} />
        <Route path="/groups/:groupId" element={<GroupDetailPage />} />
      </Routes>
    </Router>
  );
}