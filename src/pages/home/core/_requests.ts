import axios from 'axios';

import { IParamId } from 'helpers/crud-helper/models';

import { IFeelingByIdResponse, IFeelingResponse } from './_models';

const GET_ALL_FEELINGS = 'admin/feeling';

export function getAllFeelings(): Promise<IFeelingResponse | undefined> {
  return axios.get(GET_ALL_FEELINGS).then((response) => response.data);
}

export function getFeelingById(id: IParamId): Promise<IFeelingByIdResponse | undefined> {
  return axios.get(`${GET_ALL_FEELINGS}/${id}`).then((response) => response.data);
}
