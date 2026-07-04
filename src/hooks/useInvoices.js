import { useQuery } from 'react-query';
import apiClient from '../api/apiClient';

export function useInvoices() {
  return useQuery('invoices', async () => {
    const { data } = await apiClient.get('/api/invoices');
    return data;
  });
}
