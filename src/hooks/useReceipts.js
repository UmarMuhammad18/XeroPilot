import { useQuery } from 'react-query';
import apiClient from '../api/apiClient';

export function useReceipts() {
  return useQuery('receipts', async () => {
    const { data } = await apiClient.get('/api/receipts');
    return data;
  });
}
