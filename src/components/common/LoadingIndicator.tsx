import React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Rotate = styled.div`
  text-align: center;
  padding: 2rem;
  span {
    border: 16px solid var(--color-blue-0);
    border-top: 16px solid var(--color-green);
    border-radius: 50%;
    width: 7.5rem;
    height: 7.5rem;
    animation: ${rotate} 2s linear infinite;
    display: inline-block;
  }
`;

const LoadingIndicator: React.FC = () => {
  return (
    <Rotate>
      <span />
    </Rotate>
  );
};

export default LoadingIndicator;
