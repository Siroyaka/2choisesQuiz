import React from 'react';

interface OwnProps {
  count: number,
  countdownSpeed?: number,
  onEnd: () => void,
  onCount?: () => void,
}

type Props = OwnProps;

const StartCountdown: React.FC<Props> = (props) => {
  const {
    count,
    countdownSpeed,
    onEnd,
    onCount,
  } = props;
  const [countdown, setCountDown] = React.useState(count ?? 3);

  const countDownTimerRef = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    timer(countdown);
    return() => {
      clearTimeout(countDownTimerRef.current);
    }
  }, []);

  const timer = (count: number) => {
    if(count <= 0) {
      onEnd();
      return;
    }
    setCountDown(count);
    if(onCount) onCount();
    countDownTimerRef.current = setTimeout(
      () => timer(count - 1),
      countdownSpeed ?? 1000
    );
  }

  return(
    <div>
      {countdown}
    </div>
  )
}

export default StartCountdown;