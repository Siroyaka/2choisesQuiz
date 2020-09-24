import IPages from './interface';

const pageRoot = '/choise_quiz';

export const pageData : IPages[] = ([
  {
    title: '掛け算4択クイズ',
    href: `${pageRoot}/multi1`,
    minutesOfQuestion: 3,
    difficulty: 2,
    category: ['算数', '4択クイズ'],
    summary: '1桁の掛け算の正解を4択の中から選ぶクイズです。',
  },
  {
    title: 'テスト問題',
    href: `${pageRoot}/testpage`,
    minutesOfQuestion: 1,
    difficulty: 1,
    category: ['2～8択クイズ'],
    summary: '2択以上の選択肢がどのように表れるかをテストするためのクイズです。',
  }
]);
