import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/api';
import styles from '../components/Card.module.css';

const GroupDetailPage = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const [group, setGroup] = useState<any>(null);
  const [games, setGames] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const groupRes = await api.get(`/groups/${groupId}`);
        const gamesRes = await api.get(`/games/by-group/${groupId}`);
        setGroup(groupRes.data);
        setGames(gamesRes.data);
      } catch (err) {
        console.error('Error loading group details:', err);
      }
    };

    if (groupId) fetchData();
  }, [groupId]);

  if (!group) return <div style={{ padding: '2rem' }}>Loading...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{group.groupName}</h2>
      <p>Created: {group.dateCreated}</p>
      <p>Group ID: {group.groupId}</p>
        <h3>Players:</h3>
        {group.players.length === 0 ? (
            <p>No players yet.</p>
            ) : (
            <ul>
                {group.players.map((player: any) => (
                <li key={player._id}>{player.name}</li>
                ))}
            </ul>
            )}
        <h3>Games:</h3>
        {games.length === 0 ? (
        <p style={{ color: '#888' }}>No games have been played in this group yet.</p>
      ) : (
        games.map((game: any) => (
          <div className={styles.card} key={game.gameId}>
            <div className={styles.cardTitle}>{game.gameDescription}</div>
            <div className={styles.cardContent}>
              <p>Players:</p>
              <ul>
                {game.players.map((p: any, i: any) => (
                  <li key={i}>
                    {p.playerName} — Buy In: {p.buyIn}, Pay Out: {p.payOut}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
        <div style={{ marginTop: '2rem' }}>
            <Link to={`/games/${groupId}`}>Start/Edit a Game for This Group</Link>
        </div>
    </div>
  );
};

export default GroupDetailPage;
