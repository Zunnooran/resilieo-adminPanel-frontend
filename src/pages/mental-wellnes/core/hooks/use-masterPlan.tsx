import { useQuery } from 'react-query';

import { QUERIES_KEYS } from 'helpers/crud-helper/consts';

import { IMasterPlans } from '../_models';
import { getAllMasterPlan } from '../_requests';

function useMasterPlans() {
  const { data, isFetching, isLoading } = useQuery(QUERIES_KEYS.GET_ALL_MASTER_PLANS, getAllMasterPlan, {
    select: (response) => {
      if (response && response?.data && response?.data.length) {
        return response.data.filter((plan: IMasterPlans) => plan.plans);
      }

      return [];
    },
  });
  return { masterPlanData: data, isLoadingMasterPlan: isFetching || isLoading };
}

export default useMasterPlans;
