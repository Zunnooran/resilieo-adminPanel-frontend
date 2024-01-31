import { Response } from 'helpers/crud-helper/models';

export interface IVideos {
  _id: string;
  feeling?: string;
  videoUrl: string;
  title?: string;
  description?: string;
  isBookmarked: boolean;
}
export interface IFeeling {
  _id: string;
  name: string;
}

interface WeeklyPlan {
  day: string;
  activity: string;
  time: string;
  location: string;
}

export type IFeelingResponse = Response<IFeeling[]>;

export interface IFeelingById extends IFeeling {
  data: any;
  goodToKnow: string;
  exercises: WeeklyPlan[];
  explanatoryVideo: string[];
  signOf: string[];
  shadeOf: string[];
  howToDeal: string[];
  prevention: string[];
  scienceSays: string[];
  videos: IVideos[];
}

export type IFeelingByIdResponse = Response<IFeelingById>;
