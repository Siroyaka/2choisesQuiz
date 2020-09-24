import React from 'react';

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

  if(!open) return null;
  return(
    <aside className='xl:hidden fixed left-0 top-0 h-full w-64 bg-white z-50'>
      <div className='h-16 border-b-2 flex flex-row items-center px-2'>
        <button
          className='focus:outline-none rounded-full px-1 py-1'
          onClick={onClickCloseIcon}
        >
          ×
        </button>
      </div>
      <div id='drawer-contents'>
        {children}
      </div>
    </aside>
  )
}

export default Drawer;