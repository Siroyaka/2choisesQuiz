import React from 'react';

import { CloseSvg } from 'components/parts/svgIcons';
import { closeSync } from 'fs';

interface OwnProps {
  open: boolean,
  onClickCloseIcon: () => void,
}

type Props = OwnProps;

const Drawer: React.FC<Props> = (props) => {
  const {
    open,
    onClickCloseIcon,
    children,
  } = props;

  return(
    <aside className={`transform fixed left-0 top-0 h-full w-64 bg-white z-50 overflow-auto ease-in-out transition-all duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className='h-16 border-b-2 flex flex-row items-center px-2'>
        <button
          className='focus:outline-none rounded-full px-1 py-1'
          onClick={onClickCloseIcon}
        >
          <CloseSvg />
        </button>
      </div>
      <div id='drawer-contents'>
        {children}
      </div>
    </aside>
  )
}

export default Drawer;