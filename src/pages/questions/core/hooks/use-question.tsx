import { useQuery } from 'react-query';

import useRequestQuery from 'helpers/crud-helper/hooks/use-request-query';

import { getAllQuestions } from '../_requests';

const GET_ALL_QUESTIONS = 'get-all-questions';

function useQuestions() {
  const { queryString } = useRequestQuery();

  const { data, isFetching, isLoading } = useQuery(`${GET_ALL_QUESTIONS}-${queryString}`, () =>
    getAllQuestions(queryString)
  );
  return { questionsData: data, isLoadingQuestions: isFetching || isLoading };
}

export default useQuestions;
