import { useQuery } from 'react-query';
import apiClient from '../api/apiClient';

export function useContacts() {
  return useQuery('contacts', async () => {
    const { data } = await apiClient.get('/api/contacts');
    return data;
  });
}
