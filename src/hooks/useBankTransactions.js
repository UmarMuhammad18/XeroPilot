import { useQuery } from 'react-query';
import apiClient from '../api/apiClient';

export function useBankTransactions() {
  return useQuery('bankTransactions', async () => {
    const { data } = await apiClient.get('/api/bank');
    return data;
  });
}
