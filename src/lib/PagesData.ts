interface IPages {
  title: string,
  href: string
}

export const twoChoisePageData : IPages[] = ([
  {
    title: '掛け算超速100問',
    href: '/twochoise/speed_mul100'
  },
  {
    title: '円周率100桁クイズ',
    href: '/twochoise/pi_100digits'
  },
  {
    title: 'テスト問題',
    href: '/twochoise/test'
  }
]);