import { useQuery } from 'react-query';

import { QUERIES_KEYS } from 'helpers/crud-helper/consts';
import { IParamId } from 'helpers/crud-helper/models';

import { getFeelingById } from '../_requests';

const useFeelingById = (id: IParamId) => {
  const { data, isLoading, isFetching } = useQuery([QUERIES_KEYS.GET_FEELING_BY_ID, id], () => getFeelingById(id));
  return { feelingData: data, isLoading: isLoading || isFetching };
};

export default useFeelingById;
