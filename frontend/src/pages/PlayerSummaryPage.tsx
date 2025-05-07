import { useEffect, useState } from 'react';
import api from '../api/api';
import styles from '../components/Card.module.css';

const PlayerSummaryPage = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    api.get('/players')
      .then(res => setPlayers(res.data))
      .catch(err => console.error('Error fetching players:', err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>All Players</h2>
      {players.map((player: any) => (
        <div className={styles.card} key={player._id}>
          <div className={styles.cardTitle}>{player.name}</div>
          <div className={styles.cardContent}>
            <p>Email: {player.email}</p>
            <p>Phone: {player.phone}</p>
            <p>Buy-ins Total: ${player.buyInTotal}</p>
            <p>Payouts Total: ${player.payOutTotal}</p>
            <p>Groups: {player.groups.join(', ')}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerSummaryPage;

