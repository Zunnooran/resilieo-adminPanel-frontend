import { ITimeStamps, Response } from 'helpers/crud-helper/models';

export enum Trait {
  Extraversion = 1,
  Agreeableness = 2,
  Conscientiousness = 3,
  EmotionalStability = 4,
  Openness = 5,
}

export interface ITemplate {
  option: string;
  _id: string;
  points: number;
}

export interface IAnswer {
  _id: string;
  template: ITemplate[];
}

export interface IQuestion {
  _id: string;
  text: string;
  questionNumber: number;
  trait: number;
  answer: IAnswer;
}

export interface IQuestions {
  _id?: string;
  question: string;
  // answer: string;
}
export interface ITest {
  _id?: string;
  questions: IQuestions[];
  traitPoints: number[];
}

export interface IFilterData {
  _id: string;
  number: number;
  question: string;
  trait: Trait;
  options: string;
  score: number;
}

export interface ITests extends ITimeStamps, ITest {}

export type IQuestionResponse = Response<IQuestion[]>;
export type ITestByIdResponse = Response<ITest>;
export type ITestResponse = Response<ITests[]>;
