import React from 'react';

interface OwnProps {
  title: string,
  onClickStart: (flg: boolean) => void
}

type Props = OwnProps;

const InitialForm: React.FC<Props> = (props) => {
  const {
    title,
    onClickStart,
  } = props;

  return(
    <div className='flex flex-col items-center mx-4 justfy-center py-32'>
      <h1 className='text-5xl'>{title}</h1>
      <div className='h-32'/>
      <div className='text-xl mb-4'>
        iPhone、iPadをお使いの人は音なしを選択してください。
      </div>
      <div className='flex flex-row pt-2 items-center justify-center'>
        <button
          className='border bg-blue-300 rounded-full py-2 px-4 mx-4 text-2xl focus:outline-none '
          onClick={() => onClickStart(true)}
        >
          音あり
        </button>
        <button
          className='border bg-blue-300 rounded-full py-2 px-4 mx-4 text-2xl focus:outline-none '
          onClick={() => onClickStart(false)}
        >
          音なし
        </button>
      </div>
    </div>
  )
}

export default InitialForm;