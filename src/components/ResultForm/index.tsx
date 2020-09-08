import React from 'react';

import { ResultFormState } from './state';

interface OwnProps {

}

type Props = ResultFormState & OwnProps;

const ResultForm: React.FC<Props> = (props) => {
  const {
    quizResult,
    quizInfo,
  } = props;
  const list = [];
  for(let i = 0; i < quizResult.length; i++) {
    const marubatu = quizResult[i] ? '〇' : '×';
    list.push(marubatu + ' ' + quizInfo[i]);
  }
  return(
    <div>
      <ul>
        {list.map((v, i) => 
          <li key={`resultValue-${i}`}>
            {v}
          </li>
        )}
      </ul>
    </div>
  )
}

export default ResultForm;