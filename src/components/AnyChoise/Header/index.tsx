import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { LeftArrowSvg } from 'components/parts/svgIcons';

interface OwnProps {
}

type Props = OwnProps;

const Header: React.FC<Props> = (props) => {
  const {
  } = props;

  const router = useRouter();
  const paths = router.pathname.split('/');
  const beforePath = paths.reduce((acc, x, i) => {
    if(x === '') return acc;
    if(i === paths.length - 1) return acc;
    return acc + '/' + x;
  }, '');

  return(
    <React.Fragment>
      <header className='w-full fixed top-0 left-0 h-16 border-b-2 bg-white z-50'>
        <div className='h-full max-w-6xl mx-auto flex flex-row items-center px-2 '>
          <div className='flex flex-row'>
            <Link href={beforePath}>
              <button
                className='focus:outline-none rounded-full px-1 py-1 mr-3 text-gray-600 hover:text-black'
              >
                <LeftArrowSvg size={32} />
              </button>
            </Link>
          </div>
        </div>
      </header>
    </React.Fragment>
  )
}

export default Header;