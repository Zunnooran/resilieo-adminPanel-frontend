import { useMemo, useState } from 'react';

import { stringifyRequestQuery } from '../crud-helpers';
import { QueryParamsState } from '../models';

export const initialQueryParamsState: QueryParamsState = {
  page: 1,
  limit: 50,
};

function useRequestQuery() {
  const [queryParams, setQueryParams] = useState<QueryParamsState>(initialQueryParamsState);

  const updateQueryParams = (updates: Partial<QueryParamsState>) => {
    const updatedState = { ...queryParams, ...updates } as QueryParamsState;
    setQueryParams(updatedState);
  };

  const queryString = useMemo(() => stringifyRequestQuery(queryParams), [queryParams]);

  return { queryParams, updateQueryParams, queryString };
}

export default useRequestQuery;
