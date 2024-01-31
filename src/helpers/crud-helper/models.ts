export type Role = 0 | 1;

export type ID = string;

export type Response<T> = {
  status?: string;
  message?: string;
  data?: T;
};

export type IParamId = string | undefined;
