interface IQuizInfo {
  showQuestion: () => string,
  showAnswer: () => string,
}

interface OwnProps {
  answeredCount: number,
  quizResult: boolean[],
  quizInfo: QuizInfo[],
}

export type QuizInfo = string;

export type QuizProps = OwnProps;

export type QuizState = ReturnType<typeof makeQuiz>;

export const makeQuiz = (props: OwnProps) => {
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
    quiz = 'Bが正解の問題です。';
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

export const makeAddQuiz = (digits: number) => (props: QuizProps) => {
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

export const makeMulQuiz = (digits: number) => (props: QuizProps) => {
  let maxValue = 0;
  for(let i = 0; i < digits; i++) {
    maxValue += (Math.pow(10, i) * 9);
  }
  const valueA = Math.round(Math.random() * maxValue);
  const valueB = Math.round(Math.random() * maxValue);
  const quiz = valueA + ' × ' + valueB + ' = ?';
  const answerValue = valueA * valueB;
  const addValue = Math.round(Math.random() * 20) * Math.pow(10, digits - 2);
  const wrongValue = answerValue + (addValue === 10 ? addValue - 10 : 11);
  return randomAorB(quiz, answerValue + '', wrongValue + '')
}

export const make1MulQuiz = (props: QuizProps) => {
  let maxValue = 8;
  const valueA = Math.round(Math.random() * maxValue) + 1;
  const valueB = Math.round(Math.random() * maxValue) + 1;
  const quiz = valueA + ' × ' + valueB + ' = ?';
  const answerValue = valueA * valueB;
  const randomNum = Math.round(Math.random() * 6);
  let wrongValue = '';
  switch(randomNum) {
    case 0: {
      wrongValue = (answerValue + 1) + ''
      break;
    }
    case 1: {
      if(answerValue < 10) {
        wrongValue = (answerValue + 2) + '';
        break;
      }
      const a = Math.floor(answerValue / 10);
      const b = answerValue - a * 10;
      wrongValue = (a + (b * 10)) + ''
      break;
    }
    case 2: {
      wrongValue = (answerValue + valueB) + ''
      break;
    }
    case 3: {
      wrongValue = (answerValue - valueB) + ''
      break;
    }
    case 4: {
      wrongValue = (answerValue + valueA) + ''
      break;
    }
    case 5: {
      wrongValue = (answerValue - valueA) + ''
      break;
    }
    case 6: {
      wrongValue = (answerValue - 1) + ''
      break;
    }
  }
  return randomAorB(quiz, answerValue + '', wrongValue)
}

const pi100 = '1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679';

// 100桁まで作れる
export const makePieQuiz = (props: QuizProps) => {
  const resDigits = props.answeredCount;
  const answerValue = parseInt(pi100[resDigits]);
  const wrongAdd = Math.floor(Math.random() * 9) + 1;
  const wrongValue = (answerValue + wrongAdd) % 10;
  const quiz = `円周率は3.` + (resDigits > 0 ? pi100.substr(0, resDigits) : '') + '?';
  return randomAorB(quiz, answerValue + '', wrongValue + '');
}