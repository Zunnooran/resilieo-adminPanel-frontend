export type Role = 0 | 1;

export type ID = string;

export type Response<T> = {
  status?: string;
  message?: string;
  data?: T;
};

export type ITimeStamps = {
  createdAt: string;
  updatedAt: string;
};

export type FormUnknownValues = {
  [key: string]: unknown;
};

export type PaginationState = {
  page: number;
  limit: number;
  total?: number;
};

export type SearchState = {
  search?: string;
};
export type FilterState = {
  filter?: {
    [key: string]: unknown;
  };
};

export type NestedFilterState = {
  nestedFilter?: FormUnknownValues;
};

export type SortState = {
  sort?: {
    field?: string;
    order?: string;
  };
};
export type IParamId = string | undefined;

export type QueryParamsState = PaginationState & SearchState & FilterState & NestedFilterState & SortState;
