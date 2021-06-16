import React from 'react';
import { ReactLogo } from '../components/homepage';

function Home() {
  return (
    <div>
      <ReactLogo />
      {process.env.trial}
    </div>
  );
}

export default Home;
