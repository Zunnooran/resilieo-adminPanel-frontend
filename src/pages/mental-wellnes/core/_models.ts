import { Response } from 'helpers/crud-helper/models';

export enum Days {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
}

export interface Item {
  key: string;
  name: string;
}

export interface IPlan {
  day: Days;
  activity?: string;
  time?: string;
  location?: string;
  _id?: string;
}

export interface IMasterPlans {
  _id?: string;
  plans: IPlan[];
}

export interface DataType extends IPlan {
  key: React.Key;
}

export interface IExercise {
  feelingId: string[];
  exerciseNames: string[];
}

export interface IUserExercise {
  date: string;
  isCompleted: boolean;
}

export type IMaterPlansResponse = Response<IMasterPlans[]>;
export type IUserExerciseResponse = Response<IUserExercise[]>;
