import IPages from './interface';

const pageRoot = '/twochoise';

export const pageData : IPages[] = ([
  {
    title: '掛け算超速100問',
    href: `${pageRoot}/speed_mul100`,
    minutesOfQuestion: 10,
    difficulty: 3,
    category: ['算数', '2択クイズ', '1問1秒以下'],
    summary: '1桁の掛け算の正解を2択の中から選ぶクイズです。1問1秒以内に答える必要があります。問題数が100問あります。',
    imgSrc: '/asset/images/two_choises_quiz_twitter.png',
  },
  {
    title: '円周率100桁クイズ',
    href: `${pageRoot}/pi_100digits`,
    minutesOfQuestion: 10,
    difficulty: 3,
    category: ['算数', '2択クイズ', '間違えたら終わり'],
    summary: '円周率の少数点第1位から順番に答えていくクイズです。100個答えるか間違えた時に終わります。',
  },
  {
    title: '円周率100桁クイズ',
    href: `${pageRoot}/pi_100digits`,
    minutesOfQuestion: 10,
    difficulty: 3,
    category: ['算数', '2択クイズ', '間違えたら終わり'],
    summary: '円周率の少数点第1位から順番に答えていくクイズです。100個答えるか間違えた時に終わります。',
    imgSrc: '/asset/images/two_choises_quiz_twitter.png',
  },
  {
    title: '円周率100桁クイズ',
    href: `${pageRoot}/pi_100digits`,
    minutesOfQuestion: 10,
    difficulty: 3,
    category: ['算数', '2択クイズ', '間違えたら終わり'],
    summary: '円周率の少数点第1位から順番に答えていくクイズです。100個答えるか間違えた時に終わります。',
    imgSrc: '/asset/images/two_choises_quiz_twitter.png',
  },
  {
    title: '円周率100桁クイズ',
    href: `${pageRoot}/pi_100digits`,
    minutesOfQuestion: 10,
    difficulty: 3,
    category: ['算数', '2択クイズ', '間違えたら終わり'],
    summary: '円周率の少数点第1位から順番に答えていくクイズです。100個答えるか間違えた時に終わります。',
    imgSrc: '/asset/images/two_choises_quiz_twitter.png',
  },
  {
    title: '円周率100桁クイズ',
    href: `${pageRoot}/pi_100digits`,
    minutesOfQuestion: 10,
    difficulty: 3,
    category: ['算数', '2択クイズ', '間違えたら終わり'],
    summary: '円周率の少数点第1位から順番に答えていくクイズです。100個答えるか間違えた時に終わります。',
    imgSrc: '/asset/images/two_choises_quiz_twitter.png',
  },
  {
    title: 'テスト問題',
    href: `${pageRoot}/testpage`,
    minutesOfQuestion: 1,
    difficulty: 1,
    category: ['2択クイズ'],
    summary: '2択のクイズの見た目を確認するためのテスト用クイズです。',
    imgSrc: '/asset/images/two_choises_quiz_twitter.png',
  }
]);