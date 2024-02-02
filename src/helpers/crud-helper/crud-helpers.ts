import qs from 'qs';

import { QueryParamsState } from './models';

function isNotEmpty(obj: unknown) {
  return obj !== undefined && obj !== null && obj !== '';
}

function filterAndFormatMinMax<T>(propName: string, minVal: T, maxVal: T): string {
  const obj: { [key: string]: T | undefined } = {};

  if (minVal !== undefined) {
    obj.min = minVal;
  }

  if (maxVal !== undefined) {
    obj.max = maxVal;
  }

  return `${propName}=${JSON.stringify(obj)}`;
}

function stringifyRequestQuery(state: QueryParamsState): string {
  const pagination = qs.stringify(state, { filter: ['page', 'limit'], skipNulls: true });
  const search = isNotEmpty(state.search) ? qs.stringify(state, { filter: ['search'], skipNulls: true }) : '';

  const filter = state.filter
    ? Object.entries(state.filter as Object)
        .filter((obj) => isNotEmpty(obj[1]))
        .map((obj) => {
          return `${obj[0]}=${obj[1]}`;
        })
        .join('&')
    : '';

  let nestedFilters: string[] = [];
  if (state.nestedFilter) {
    // loop through nestedFilter and add to filter
    nestedFilters = Object.entries(state.nestedFilter as Object).map((obj) => {
      return filterAndFormatMinMax(obj[0], obj[1].min, obj[1].max);
    });
  }

  if (state.sort) {
    nestedFilters.push(`sort=${state.sort.order === 'descend' ? '-' : ''}${state.sort.field}`);
  }

  const filterString = nestedFilters.join('&');

  return [pagination, search, filter, filterString].filter((f) => f).join('&');
}
export { isNotEmpty, stringifyRequestQuery };
