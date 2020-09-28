import React from 'react';

import MainForm, { Props as MainFormProps } from './MainForm';

import { IQuestionFormProps } from 'lib/IQuestion';
import SoundEffect from 'lib/soundEffect';
import { ResultData } from 'lib/createQuestion/accumulation';

interface OwnProps {

}

type Props = OwnProps & Omit<MainFormProps, 'onFinished'>;

enum AccumulationViewType {
  Initial,
  Main,
  Result,
}

const Accumulation: React.FC<Props> = (props) => {
  const [accumulationViewType, setAccumulationViewType] = React.useState<{type: AccumulationViewType, result: ResultData}>({type: AccumulationViewType.Initial, result: null});

  const switchMain = React.useCallback(() => setAccumulationViewType({type: AccumulationViewType.Main, result: null}), []);
  const switchResult = React.useCallback((result: ResultData) => setAccumulationViewType({type: AccumulationViewType.Result, result: result}), []);

  const setFinished = React.useCallback((result: ResultData) => {
    switchResult(result);
  }, []);

  return(
    <div>
      {accumulationViewType.type === AccumulationViewType.Initial &&
        <div>
          <button
            onClick={switchMain}
          >
            押す
          </button>
        </div>
      }
      {accumulationViewType.type === AccumulationViewType.Main &&
        <MainForm
          {...props}
          onFinished={setFinished}
        />
      }
      {accumulationViewType.type === AccumulationViewType.Result &&
        <div>
          結果画面
          {accumulationViewType.result.valueNames.map((x, i) => 
            <div>
              <span>{x}: {accumulationViewType.result.values[i]}</span>
            </div>
          )}
          <button
            onClick={switchMain}
          >
            もう一回
          </button>
        </div>
      }
    </div>
  )
}

export default Accumulation;