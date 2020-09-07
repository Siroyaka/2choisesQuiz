import React from 'react';

import Link from 'next/link';

interface OwnProps {
  title: string,
}

type Props = OwnProps;

const Header: React.FC<Props> = (props) => {
  const { title } = props;
  const [openNavHeader, setOpenNavHeader] = React.useState(false);
  const switchNavHeader = React.useCallback(() => setOpenNavHeader(!openNavHeader), [setOpenNavHeader, openNavHeader]);

  return(
    <React.Fragment>
      <header className='w-full flex flex-row fixed top-0 h-16 bg-orange-300 border border-orange-300 px-4 py-1 items-center justify-center z-50' >
        <div id='header-left-items' className='flex items-center'>
          <Link href='/'>
            <a>
              <h1 className={'font-sans font-semibold text-4xl text-orange-600 mx-1'}>{title}</h1>
            </a>
          </Link>
        </div>
      </header>
    </React.Fragment>
  )
}

export default Header;