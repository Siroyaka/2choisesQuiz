import React from 'react';

interface OwnProps {
  onClickStart: (flg: boolean) => void
}

type Props = OwnProps;

const InitialForm: React.FC<Props> = (props) => {
  const { onClickStart } = props;
  return(
    <div className='flex flex-col items-center mx-4'>
      <span className='text-3xl'>iPhone、iPadをお使いの人は音なしを選択してください。</span>
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