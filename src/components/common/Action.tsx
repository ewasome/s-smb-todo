import { Link } from 'react-router-dom';
import styled from 'styled-components';

const styles = `
padding: 0 2rem;
height: 3.75rem;
background: var(--color-blue-0);
border-radius: 50px;
border: none;
color: var(--color-black);
font-weight: bold;
text-transform: uppercase;
display: inline-block;
line-height: 3.75rem;

&:hover, &:active, &:focus {
  &:not(:disabled) {
    background-color: var(--color-blue-1);
  }
}
&[disabled] {
  cursor: not-allowed;
  opacity: 0.6;
}
`;

export const StyledLink = styled(Link)`
  ${styles}
`;
export const StyledButton = styled.button`
  ${styles}
`;

export default {
  StyledLink,
  StyledButton,
};
