import { useMutation, useQueryClient } from 'react-query';

import { message } from 'antd';

import { QUERIES_KEYS } from 'helpers/crud-helper/consts';

import { updateMasterPlan } from '../_requests';

function useUpdateMasterPlan() {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, isSuccess } = useMutation(
    (body: any) => {
      const { id, plans } = body;
      return updateMasterPlan({ plans }, id ?? '');
    },
    {
      // ✅ Show success message
      onSuccess: () => {
        message.success('Plan updated successfully');
        queryClient.invalidateQueries(QUERIES_KEYS.GET_ALL_MASTER_PLANS);
      },
      onError: () => {
        message.error('Failed to updated plan');
      },
    }
  );

  return {
    updatePlan: mutate,
    isLoadingUpdatePlan: isLoading,
    isErrorUpdatePlan: isError,
    isSuccessUpdatePlan: isSuccess,
  };
}

export default useUpdateMasterPlan;
