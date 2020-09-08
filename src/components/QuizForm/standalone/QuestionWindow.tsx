import React, { useEffect } from 'react';

interface OwnProps {
  text: string,
  interval?: number,
  onFinished?: () => void,
}

type Props = OwnProps;

const QuestionWindow: React.FC<Props> = (props) => {
  const {
    text,
    interval,
    onFinished,
  } = props;

  let count = 0;
  const [shownTexts, setShownTexts] = React.useState('');
  let timerId;
  const textViewingInterval = interval === undefined ? 200 : interval;

  const display = () => {
    setShownTexts(text.substr(0, count + 1));
    count++;
    if(count === text.length + 1) {
      onFinished && onFinished();
      return;
    }
    timerId = setTimeout(display, textViewingInterval);
  }

  useEffect(() => {
    count = 0;
    display()
    return () => {
      clearTimeout(timerId);
    }
  }, [text]);

  return(
    <div className='text-center'>
      {shownTexts}
    </div>
  )
}

export default QuestionWindow;