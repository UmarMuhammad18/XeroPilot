import { useMutation, useQueryClient } from 'react-query';
import apiClient from '../api/apiClient';

export function useRunAutomation() {
  const queryClient = useQueryClient();

  return useMutation(
    async (workflowId) => {
      const { data } = await apiClient.post('/api/automations/run', { workflowId });
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('logs');
        queryClient.invalidateQueries('automations');
      },
    }
  );
}
