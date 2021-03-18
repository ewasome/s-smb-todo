import React from 'react';

import { Hero, StyledLink } from './common';
import banner from '../assets/not-found.svg';

const NotFound: React.FC = () => {
  return (
    <Hero
      subtitle="Got lost?"
      text="Don't worry, it happens to us all."
      banner={<img src={banner} />}
      action={<StyledLink to="/">Go back</StyledLink>}
    />
  );
};

export default NotFound;
