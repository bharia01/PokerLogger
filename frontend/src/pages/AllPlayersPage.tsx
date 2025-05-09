import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface Player {
  _id: string;
  name: string;
  phone: string;
  email: string;
  groups: string[];
  games: string[];
  joinDate: string;
  stats: {
    gamesPlayed: number;
    totalEarnings: number;
    totalBuyIns: number;
    totalPayOuts: number;
  };
}

const AllPlayersPage = () => {
  const { user } = useAuth();
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get('/api/players');
        setPlayers(response.data.players || response.data);
      } catch (err) {
        setError('Failed to fetch players');
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'admin') {
    fetchPlayers();
    };
  }, [user]);

  if (user?.role !== 'admin') {
    return (
      <div className="p-6 text-center text-red-500 text-xl">
        🚫 You do not have permission to view this page.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Loading players...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">All Players</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {players.map((player) => (
          <div key={player._id} className="bg-white p-4 rounded-lg shadow border hover:shadow-lg transition-all">
            <h2 className="text-xl font-semibold text-blue-700">{player.name}</h2>
            <p className="text-sm text-gray-500">{player.email}</p>
            <p className="text-sm text-gray-500">{player.phone}</p>

            <div className="mt-3 text-sm space-y-1">
              <p><strong>Groups:</strong> {player.groups.length > 0 ? player.groups.join(', ') : 'None'}</p>
              <p><strong>Games:</strong> {player.games.length}</p>
              <p><strong>Joined:</strong> {new Date(player.joinDate).toLocaleDateString()}</p>
            </div>

            <div className="mt-4 text-sm bg-gray-50 p-3 rounded">
              <p><strong>Games Played:</strong> {player.stats.gamesPlayed}</p>
              <p><strong>Total Buy-ins:</strong> ${player.stats.totalBuyIns.toFixed(2)}</p>
              <p><strong>Total Payouts:</strong> ${player.stats.totalPayOuts.toFixed(2)}</p>
              <p><strong>Net Earnings:</strong> ${player.stats.totalEarnings.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPlayersPage;
