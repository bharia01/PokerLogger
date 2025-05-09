import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiFetch } from '../api/api';
import './GroupDetailPage.css';

interface Group {
  _id: string;
  groupName: string;
  players: string[];
  games: string[];
  dateCreated: string;
}

const GroupDetailPage = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState<Group | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const data = await apiFetch(`/api/groups/${groupId}`, 'GET', undefined, localStorage.getItem('token') || '');
        setGroup(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load group details.');
      }
    };

    if (groupId) fetchGroup();
  }, [groupId]);

  if (error) return <p className="error">{error}</p>;
  if (!group) return <p>Loading...</p>;

  return (
    <div className="group-detail-container">
      <h2>{group.groupName}</h2>
      <p><strong>Created:</strong> {new Date(group.dateCreated).toLocaleDateString()}</p>
      <p><strong>Players:</strong> {group.players.length}</p>
      <p><strong>Games:</strong> {group.games.length}</p>
    </div>
  );
};

export default GroupDetailPage;
