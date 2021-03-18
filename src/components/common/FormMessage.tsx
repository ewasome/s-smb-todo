import React from 'react';
import styled from 'styled-components';

import breakpoints from '../../styles/breakpoints';

const Message = styled.div`
  padding: 0.5rem 0;
  text-align: right;
  span {
    color: var(--color-purple-3);
  }
  ${breakpoints.device.m} {
    max-width: 37rem;
  }
`;

const FormMessage: React.FC = ({ children }) => {
  return (
    <Message>
      <span>{children}</span>
    </Message>
  );
};

export default FormMessage;
