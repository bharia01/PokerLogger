import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { apiFetch } from '../api/api';
import './GamePage.css';

interface Game {
  _id: string;
  groupName: string;
  gameDescription: string;
  players: {
    playerId: string;
    playerName: string;
    buyIn: number;
    payOut: number;
  }[];
}

const GamesPage = () => {
  const { user } = useAuth();
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadGames = async () => {
      try {
        const allGames = await apiFetch('/api/games', 'GET', undefined, localStorage.getItem('token') || '');
        const userGames = allGames.filter((game: Game) =>
          game.players.some((p) => p.playerId === user?._id)
        );
        setGames(userGames);
      } catch (err: any) {
        setError(err.message || 'Failed to load games.');
      }
    };

    if (user?._id) loadGames();
  }, [user]);

  return (
    <div className="games-container">
      <h2>Your Games</h2>
      {error && <p className="error">{error}</p>}
      <div className="games-list">
        {games.map((game) => (
          <div key={game._id} className="game-card">
            <h3>{game.gameDescription}</h3>
            <p><strong>Group:</strong> {game.groupName}</p>
            <ul>
              {game.players.map((p) => (
                <li key={p.playerId}>
                  {p.playerName} — Buy-in: ${p.buyIn}, Payout: ${p.payOut}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesPage;
