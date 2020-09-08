

export const makeQuiz = () => {
  let choiseValues: {A: string, B: string} = {A: '', B: ''};
  let quiz = '';
  let answer: 'A' | 'B' = 'A';

  const answerValue = '正解';
  const wrongValue = '不正解';

  const i = Math.round(Math.random());
  if(i === 1) {
    choiseValues = {A: answerValue, B: wrongValue};
    answer = 'A';
    quiz = 'Aが正解の問題です。';
  } else {
    choiseValues = {B: answerValue, A: wrongValue};
    answer = 'B';
    quiz = 'Bが正解の問題です';
  }

  return{
    choiseValues,
    quiz,
    answer,
  }
}

const randomAorB = (quiz: string, answerValue: string, wrongValue: string) => {
  const i = Math.round(Math.random());
  let answer: 'A' | 'B';
  let choiseValues: {A: string, B: string};
  if(i === 1) {
    answer = 'A';
    choiseValues = {A: answerValue, B: wrongValue};
  } else {
    answer = 'B';
    choiseValues = {B: answerValue, A: wrongValue};
  }
  return({
    answer,
    choiseValues,
    quiz
  })
}

export const makeAddQuiz = (digits: number) => {
  let maxValue = 0;
  for(let i = 0; i < digits; i++) {
    maxValue += (Math.pow(10, i) * 9);
  }
  const valueA = Math.round(Math.random() * maxValue);
  const valueB = Math.round(Math.random() * maxValue);
  const quiz = valueA + '+' + valueB + '=?';
  const answerValue = valueA + valueB;
  const addValue = Math.round(Math.random() * 20);
  const wrongValue = answerValue + (addValue === 10 ? addValue - 10 : 11);
  return randomAorB(quiz, answerValue + '', wrongValue + '')
}

export const makeMulQuiz = (digits: number) => {
  let maxValue = 0;
  for(let i = 0; i < digits; i++) {
    maxValue += (Math.pow(10, i) * 9);
  }
  const valueA = Math.round(Math.random() * maxValue);
  const valueB = Math.round(Math.random() * maxValue);
  const quiz = valueA + '×' + valueB + '=?';
  const answerValue = valueA * valueB;
  const addValue = Math.round(Math.random() * 20) * Math.pow(10, digits - 2);
  const wrongValue = answerValue + (addValue === 10 ? addValue - 10 : 11);
  return randomAorB(quiz, answerValue + '', wrongValue + '')
}
