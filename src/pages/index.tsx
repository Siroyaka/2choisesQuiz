import React from 'react';

import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div>
      <Link href='/quiz'>
        <button>
          クイズ
        </button>
      </Link>
    </div>
  )
}

export default Home;