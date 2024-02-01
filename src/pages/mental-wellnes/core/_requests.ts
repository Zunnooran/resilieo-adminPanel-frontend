import axios from 'axios';

import { IMaterPlansResponse } from './_models';

const MASTER_PLAN = 'admin/master-plan';

export function getAllMasterPlan(): Promise<IMaterPlansResponse | undefined> {
  return axios.get(MASTER_PLAN).then((response) => response?.data);
}

export function updateMasterPlan(body: any, id: string) {
  return axios.patch(`${MASTER_PLAN}/${id}`, body);
}

// export function getAllExercises(feelingIds: string[]): Promise<IExerciseResponse | undefined> {
//   const queryParams = feelingIds ? `feelingIds=${feelingIds}` : '';
//   return axios.get(`${EXERCISES}?${queryParams}`);
// }
