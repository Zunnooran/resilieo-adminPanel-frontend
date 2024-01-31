import axios from 'axios';

import { IMaterPlansResponse } from './_models';

const MASTER_PLAN = 'app/master-plan';
// const EXERCISES = 'app/exercise/group';

export function getAllMasterPlan(): Promise<IMaterPlansResponse | undefined> {
  return axios.get(MASTER_PLAN).then((response) => response?.data);
}

// export function getAllExercises(feelingIds: string[]): Promise<IExerciseResponse | undefined> {
//   const queryParams = feelingIds ? `feelingIds=${feelingIds}` : '';
//   return axios.get(`${EXERCISES}?${queryParams}`);
// }
