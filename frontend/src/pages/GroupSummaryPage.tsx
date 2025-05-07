import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import styles from '../components/Card.module.css';

const GroupSummaryPage = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    api.get('/groups')
      .then(res => setGroups(res.data))
      .catch(err => console.error('Error loading groups:', err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>All Groups</h2>
      {groups.map((group: any) => (
        <div className={styles.card} key={group.groupId}>
          <div className={styles.cardTitle}>{group.groupName}</div>
          <div className={styles.cardContent}>
            <p>Players: {group.players.join(', ')}</p>
            <p>Created: {group.dateCreated}</p>
          </div>
          <div className={styles.cardActions}>
            <Link to={`/groups/${group.groupId}`}>View Group</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupSummaryPage;
