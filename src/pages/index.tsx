import React from 'react';

import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div className='my-2 mx-4'>
      <Link href='/quiz'>
        <button className='p-4 border hover:bg-blue-300 bg-blue-400 rounded-full'>
          1桁掛け算
        </button>
      </Link>
      <Link href='/speed_mul100'>
        <button className='p-4 border hover:bg-blue-300 bg-blue-400 rounded-full'>
          掛け算超速100問
        </button>
      </Link>
    </div>
  )
}

export default Home;