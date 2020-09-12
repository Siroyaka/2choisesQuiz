import React from 'react';

import Link from 'next/link';

import PagesData from 'lib/PagesData';

const Home: React.FC = () => {
  return (
    <div className='my-2 mx-4'>
      {PagesData.map(x => (
        <nav>
          <Link href={x.href}>
            <button className='p-4 border hover:bg-blue-300 bg-blue-400 rounded-full'>
              {x.title}
            </button>
          </Link>
        </nav>
      ))}
    </div>
  )
}

export default Home;