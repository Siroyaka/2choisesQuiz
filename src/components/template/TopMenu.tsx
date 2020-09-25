import React from 'react';

import Link from 'next/link';

import Header from 'components/Header';
import Drawer from 'components/standalone/Drawer';

import { sideNavItems } from 'lib/sideNavItem';

interface OwnProps {
  title: string,
}

type Props = OwnProps;

const TopMenu: React.FC<Props> = (props) => {
  const {
    title,
    children,
  } = props;

  const [open, setOpen] = React.useState(false);

  const openDrawer = React.useCallback(() => {
    setOpen(true);
  }, []);

  const closeDrawer = React.useCallback(() => {
    setOpen(false);
  }, []);

  const navContents = sideNavItems.map((v, i)=> (
            <Link key={`sideNav-link-${i}`} href={v.href}>
              <button className='px-3 py-2 rounded-lg focus:outline-none w-full text-left text-lg hover:bg-yellow-200'>
                {v.label}
              </button>
            </Link>
          ));

  return(
    <React.Fragment>
      <Header title={title} openDrawer={openDrawer}/>
      <div className='h-full max-w-screen-xl mx-auto flex relative px-3'>
        <aside className='fixed top-0 hidden pt-16 xl:flex flex-col w-56 h-full items-start my-8'>
          {navContents}
        </aside>
        <main className='pt-16 h-full xl:pl-56 w-full '>
          <div className='mx-auto xl:max-w-5xl md:max-w-3xl max-w-sm my-8'>
            {children}
          </div>
        </main>
        <Drawer 
          open={open}
          onClickCloseIcon={closeDrawer}
        >
          {navContents}
        </Drawer>
      </div>
    </React.Fragment>
  )
}

export default TopMenu;