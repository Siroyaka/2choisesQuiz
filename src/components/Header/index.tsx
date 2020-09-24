import React from 'react';

import Link from 'next/link';

import { MenuSvg } from 'components/parts/svgIcons';

interface OwnProps {
  title: string,
  openDrawer?: () => void,
}

type Props = OwnProps;

const Header: React.FC<Props> = (props) => {
  const {
    title,
    openDrawer,
  } = props;

  return(
    <React.Fragment>
      <header className='w-full fixed top-0 h-16 border-b-2 bg-white z-50'>
        <div className='h-full max-w-sm md:max-w-3xl xl:max-w-screen-xl mx-auto flex flex-row items-center px-2 xl:px-6'>
          <div className='flex flex-row'>
            <button
              className='focus:outline-none rounded-full px-1 py-1 mr-3 xl:hidden'
              onClick={openDrawer}
            >
              <MenuSvg />
            </button>
            <div id='header-left-items' className='hidden md:block flex items-center'>
              <Link href='/'>
                <a>
                  <h1 className={'font-sans text-xl'}>{title}</h1>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  )
}

export default Header;