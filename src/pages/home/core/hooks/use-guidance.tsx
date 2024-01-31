import { useQuery } from 'react-query';

import { QUERIES_KEYS } from 'helpers/crud-helper/consts';

import { getAllFeelings } from '../_requests';

const useFeelings = () => {
  const { data, isLoading, isFetching } = useQuery(`${QUERIES_KEYS.GET_FEELINGS}`, () => getAllFeelings(), {
    select: (response) => {
      if (response && response?.data) {
        return response.data;
      }
      return [];
    },
  });
  return { feelings: data, isLoading: isLoading || isFetching };
};

export default useFeelings;
