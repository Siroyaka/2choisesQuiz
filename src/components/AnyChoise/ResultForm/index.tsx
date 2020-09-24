import React from 'react';

import { useRouter } from 'next/router';

import { rootAddress } from 'lib/Construction';

import {
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';

import { State as ResultFormState } from './state';
import { IQuestionResultFormProps } from 'lib/IQuestion';

type Props = ResultFormState & IQuestionResultFormProps;

const ResultForm: React.FC<Props> = (props) => {
  const {
    title,
    hashTags,
    notShare,
    total,
    collect,
  } = props;

  const router = useRouter();

  const collectAnswersRate = Math.floor(collect / total * 100);
  const message = () => {
    if(collectAnswersRate < 20) return '頑張って!';
    if(collectAnswersRate < 40) return 'まだできる!';
    if(collectAnswersRate < 60) return 'よくやった!';
    if(collectAnswersRate < 80) return 'すごい!';
    if(collectAnswersRate < 100) return '素晴らしい!';
    return '満点おめでとう!!!!!!!!!!!!!!';
  }

  const reload = () => {
    router.reload();
  }

  const resultMessage = `正解数...${total}問中${collect}問!!!`;
  const shareText = `${title}で${total}問中${collect}問正解したよ！`;
  const shareUrl = `${rootAddress}${router.pathname}`;

  return(
    <section
      id='quesiton-result-view'
      className='flex flex-col mx-4 items-center h-full'
    >
      <div
        id='result-message'
        className='text-2xl mt-2'
      >
        {resultMessage}
      </div>
      <div
        id='rate-message'
        className='text-xl mt-1 mb-4'
      >
        {message()}
      </div>
      <div className='flex flex-row'>
        {!notShare &&
          <div className='mx-2'>
            <TwitterShareButton
              className='focus:outline-none'
              title={shareText}
              hashtags={hashTags}
              url={shareUrl}
            >
              <TwitterIcon round />
            </TwitterShareButton>
          </div>
        }
        <button
          className='mx-2 focus:outline-none border rounded-lg py-2 px-4 text-white bg-blue-400'
          onClick={reload}
        >
          もう一度
        </button>
      </div>
    </section>
  )
}

export default ResultForm;