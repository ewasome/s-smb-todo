import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import breakpoints from "../styles/breakpoints";

import logo from "url:../assets/logo.png";
import { UserContext } from "./context";

const Container = styled.header`
  background-image: linear-gradient(
    to right bottom,
    var(--color-purple-2),
    var(--color-purple-3)
  );
  color: var(--color-white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  ${breakpoints.device.m} {
    padding: 2rem 3rem;
  }
  ${breakpoints.device.l} {
    padding: 2rem 3rem;
  }
  ${breakpoints.device.xl} {
    padding: 2rem 6rem;
  }
`;

const Logo = styled.img`
  width: 4rem;
`;

const Header: React.FC = () => {
  const user = useContext(UserContext) as User;
  const splitedName = user?.name?.split(" ");
  // display 'logged in' user in form of first name and optional title
  const userDisplay = splitedName?.splice(0, splitedName.length - 1).join(" ");
  return (
    <Container>
      <Link to="/">
        <Logo src={logo} />
      </Link>
      {/* display only if user data is retrieved */}
      {userDisplay && <span>Hello {userDisplay}</span>}
    </Container>
  );
};

export default Header;
