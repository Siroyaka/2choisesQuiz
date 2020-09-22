import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const RedirectPage: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/twochoise/speed_mul100');
  }, [])
  return(
    <div />
  )
}

export default RedirectPage;