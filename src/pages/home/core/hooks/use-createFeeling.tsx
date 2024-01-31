import { useMutation } from 'react-query';

import { message } from 'antd';

import { IFeelingCreate } from '../_models';
import { createFeeling } from '../_requests';

function useCreateFeeling() {
  const { mutate, isLoading, isSuccess } = useMutation((body: IFeelingCreate) => createFeeling(body), {
    onSuccess: () => {
      message.success('Feeling Created Successfully!');
    },
    onError: () => {
      message.error('Failed to create Feeling!');
    },
  });
  return { createFeeling: mutate, isLoadingCreateFeeling: isLoading, isSuccessCreateFeeling: isSuccess };
}

export default useCreateFeeling;
