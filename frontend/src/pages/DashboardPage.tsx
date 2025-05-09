import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../api/api';
import './DashboardPage.css';

interface PlayerStats {
  gamesPlayed: number;
  totalEarnings: number;
  totalBuyIns: number;
  totalPayOuts: number;
}

interface Player {
  _id: string;
  name: string;
  stats: PlayerStats;
}

const DashboardPage = () => {
  const { user } = useAuth();
  const [player, setPlayer] = useState<Player | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await apiFetch(`/players/${user?._id}`, 'GET', undefined, localStorage.getItem('token') || '');
        const data: Player = await response.json();
        setPlayer(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || 'Failed to load player data.');
      }
    };

    if (user?._id) fetchPlayer();
  }, [user]);

  if (error) return <p className="error">{error}</p>;
  if (!player) return <p className="loading">Loading dashboard...</p>;

  return (
    <div className="dashboard-container">
      <h2>Welcome, {player.name}</h2>
      <div className="stats-box">
        <p><strong>Games Played:</strong> {player.stats.gamesPlayed}</p>
        <p><strong>Total Buy-ins:</strong> ${player.stats.totalBuyIns}</p>
        <p><strong>Total Payouts:</strong> ${player.stats.totalPayOuts}</p>
        <p><strong>Net Earnings:</strong> ${player.stats.totalEarnings}</p>
      </div>
    </div>
  );
};

export default DashboardPage;
