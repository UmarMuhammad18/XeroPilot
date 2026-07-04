import { useQuery } from 'react-query';
import apiClient from '../api/apiClient';

export function useLogs() {
  return useQuery('logs', async () => {
    const { data } = await apiClient.get('/api/logs');
    return data;
  });
}
