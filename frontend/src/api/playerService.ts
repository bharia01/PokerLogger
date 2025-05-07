import api from './api';
import type { Player } from '../types/player';

export const fetchPlayers = async (): Promise<Player[]> => {
  const res = await api.get('/players');
  return res.data;
};
