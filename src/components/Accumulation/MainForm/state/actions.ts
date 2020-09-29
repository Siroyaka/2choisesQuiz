import { AccumulationActionTypes } from './types';
import { AccumulationInfo, NameValue } from 'lib/createQuestion/accumulation';
import { IQuestionContents } from 'lib/IQuestion';

export const answer = (questionNum: number, answeredIndex: number) => ({
  type: AccumulationActionTypes.ANSWER as AccumulationActionTypes.ANSWER,
  questionNum,
  answeredIndex,
});

export const interval = () => ({
  type: AccumulationActionTypes.INTERVAL as AccumulationActionTypes.INTERVAL
});

export const next = (question: IQuestionContents<NameValue>) => ({
  type: AccumulationActionTypes.NEXT as AccumulationActionTypes.NEXT,
  question: question as IQuestionContents<NameValue>
});

export type ReturnTypes = 
  ReturnType<typeof answer> |
  ReturnType<typeof interval> |
  ReturnType<typeof next>;
