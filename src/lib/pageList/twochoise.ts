import IPages from './interface';

const pageRoot = '/twochoise';

export const pageData : IPages[] = ([
  {
    title: '掛け算超速100問',
    href: `${pageRoot}/speed_mul100`
  },
  {
    title: '円周率100桁クイズ',
    href: `${pageRoot}/pi_100digits`
  },
  {
    title: 'テスト問題',
    href: `${pageRoot}/test`
  }
]);