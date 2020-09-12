interface IPages {
  title: string,
  href: string
}

const PagesData: IPages[] = ([
  {
    title: '掛け算超速100問',
    href: '/automatic/speed_mul100'
  },
  {
    title: '円周率100桁クイズ',
    href: '/original/pi_100digits'
  }
])

export default PagesData;