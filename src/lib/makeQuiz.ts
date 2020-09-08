

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

const makeAddQuiz = () => {
  
}
