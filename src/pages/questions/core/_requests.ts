import axios from 'axios';

import { IQuestionResponse } from './_models';

const GET_ALL_QUESTIONS = 'admin/question';

export function getAllQuestions(queryString?: string): Promise<IQuestionResponse | undefined> {
  return axios.get(`${GET_ALL_QUESTIONS}?${queryString}`).then((response) => response.data);
}
