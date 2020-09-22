import IPages from './interface';

const pageRoot = '/choise_quiz';

export const pageData : IPages[] = ([
  {
    title: '掛け算4択クイズ',
    href: `${pageRoot}/multi1`
  },
  {
    title: 'テスト問題',
    href: `${pageRoot}/test`
  }
]);
