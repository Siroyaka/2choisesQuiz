import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';

import { ResultFormState } from './state';

interface OwnProps {
  title: string,
  hashTags: string[],
}

type Props = ResultFormState & OwnProps;

const ResultForm: React.FC<Props> = (props) => {
  const {
    title,
    hashTags,
    quizResult,
    quizInfo,
    totalLength
  } = props;

  const router = useRouter();
  const list = [];
  for(let i = 0; i < quizResult.length; i++) {
    const marubatu = quizResult[i] ? '〇' : '×';
    list.push(marubatu + ' ' + quizInfo[i]);
  }

  const collectAnswersCount = quizResult.filter((x) => x).length;
  const collectAnswersRate = Math.floor(collectAnswersCount / totalLength * 100);
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

  const resultMessage = `正解数...${totalLength}問中${collectAnswersCount}問!!!`;
  const shareText = `${title}で${totalLength}問中${collectAnswersCount}問正解したよ！`;
  const shareUrl = `https://2taku-quiz.vercel.app${router.pathname}`;

  return(
    <React.Fragment>
      <Head>
        <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
      </Head>
      <div className='flex flex-col mx-4 items-center h-full'>
        <div
          id='result'
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
          <div>
            <TwitterShareButton
              className='focus:outline-none'
              title={shareText}
              hashtags={hashTags}
              url={shareUrl}
            >
              <TwitterIcon round />
            </TwitterShareButton>
          </div>
          <button
            className='focus:outline-none border rounded-lg py-2 px-4 text-white bg-blue-400 ml-6'
            onClick={reload}
          >
            もう一度
          </button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ResultForm;