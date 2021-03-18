import React from "react";
import styled from "styled-components";

import breakpoints from "../../styles/breakpoints";
import { StyledButton } from "./Action";

const StyledMessage = styled.div`
  background-color: var(--color-blue-0);
  padding: 1rem 2rem;
  ${breakpoints.device.m} {
    padding: 1rem 3rem;
  }
  ${breakpoints.device.l} {
    padding: 1rem 3rem;
  }
  ${breakpoints.device.xl} {
    padding: 1rem 6rem;
  }
  span {
    font-weight: bold;
    font-size: 0.9rem;
  }
`;
const Button = styled(StyledButton)`
  background-image: linear-gradient(
    to right bottom,
    var(--color-purple-2),
    var(--color-purple-3)
  );
  color: var(--color-white);
  height: auto;
  line-height: unset;
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  &:hover {
    filter: brightness(120%);
  }
`;

const Message: React.FC = ({ show, message, action = {} }) => {
  if (!show) {
    return null;
  }
  const { txt, fn } = action;

  return (
    <StyledMessage>
      <span>{message}</span>
      {txt && fn && (
        <Button type="button" onClick={fn}>
          {txt}
        </Button>
      )}
    </StyledMessage>
  );
};

export default Message;
