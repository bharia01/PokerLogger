import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { apiFetch } from '../api/api';
import { Link } from 'react-router-dom';
import './GroupPage.css';

interface Group {
  _id: string;
  groupName: string;
  players: string[];
  games: string[];
}

const GroupsPage = () => {
  const { user } = useAuth();
  const [groups, setGroups] = useState<Group[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadGroups = async () => {
      try {
        const allGroups = await apiFetch('/api/groups', 'GET', undefined, localStorage.getItem('token') || '');
        const userGroups = allGroups.filter((group: Group) =>
          group.players.includes(user?._id)
        );
        setGroups(userGroups);
      } catch (err: any) {
        setError(err.message || 'Failed to load groups.');
      }
    };

    if (user?._id) loadGroups();
  }, [user]);

  return (
    <div className="groups-container">
      <h2>Your Groups</h2>
      {error && <p className="error">{error}</p>}
      <div className="groups-list">
        {groups.map((group) => (
          <Link to={`/groups/${group._id}`} key={group._id} className="group-card">
            <h3>{group.groupName}</h3>
            <p>{group.players.length} players</p>
            <p>{group.games.length} games</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GroupsPage;
