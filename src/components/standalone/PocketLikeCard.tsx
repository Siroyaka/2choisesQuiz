import React from 'react';

import Link from 'next/link';

import IPage from 'lib/pageList/interface';

interface OwnProps {

}

type Props = OwnProps & IPage;

const PocketLikeCard: React.FC<Props> = (props) => {
  const {
    title,
    href,
    imgSrc,
    minutesOfQuestion,
    summary,
    category,
    difficulty,
  } = props;

  const getDifficultyText = () => {
    switch(difficulty) {
      case 1: {
        return '簡単';
      }
      case 2: {
        return '普通';
      }
      case 3: {
        return '難しい';
      }
      default: {
        return '';
      }
    }
  }

  return (
    <article className='pt-2 pb-6 mx-2 my-2 border-b-2'>
      <Link href={href}>
        <a className="block">
          <img src={imgSrc} />
          <h1 className='text-xl mt-2 font-bold'>{title}</h1>
        </a>
      </Link>
      <div className='my-1 text-sm text-gray-500'>
        <span className='mr-4'>所要時間: {minutesOfQuestion}分</span>
        <span>難易度: {getDifficultyText()}</span>
      </div>
      <p className='text-sm'>
        {summary}
      </p>
    </article>
  );
}

export default PocketLikeCard;