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

  const textSize = () => {
    if(text.length < 3) return 'text-5xl';
    if(text.length < 7) return 'text-4xl';
    if(text.length < 11) return 'text-3xl';
    if(text.length < 14) return 'text-2xl';
    if(text.length < 17) return 'text-xl';
    return 'text-lg'
  }

  return(
    <div className={`${textSize()}`}>
      {shownTexts}
    </div>
  )
}

export default QuestionWindow;