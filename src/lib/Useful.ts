import { IQuestionResult } from 'lib/IQuestion';

export const randomRange = (maxValue: number, chooseNum: number, minValue?: number) => {
  const min = minValue ?? 0;
  const range = maxValue - min;
  const arr = Array.from({length: range}, (_, i) => i + min);
  const res: number[] = [];
  for(let i = 0; i < chooseNum - 1; i++) {
    const rIndex = Math.floor(Math.random() * arr.length);
    res.push(arr[rIndex]);
    arr.splice(rIndex, 1);
  }
  return res;
}

export const exitOfQuestionCount = (endCount: number) => <T extends IQuestionResult> (result: T) => {
  return result.answeredCount >= endCount;
}
