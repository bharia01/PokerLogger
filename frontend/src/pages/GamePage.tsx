import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/api';
import styles from '../components/Card.module.css';

const GamePage = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const [games, setGames] = useState([]);

  useEffect(() => {
    if (!groupId) return;

    api.get(`/games/by-group/${groupId}`)
      .then(res => setGames(res.data))
      .catch(err => console.error('Error loading games:', err));
  }, [groupId]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Games for Group: {groupId}</h2>
      {games.map((game: any) => (
        <div className={styles.card} key={game.gameId}>
          <div className={styles.cardTitle}>{game.gameDescription}</div>
          <div className={styles.cardContent}>
            {game.players.map((p: any, i: any) => (
              <div key={i}>
                <strong>{p.playerName}</strong> — Buy In: {p.buyIn}, Payout: {p.payOut}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GamePage;
