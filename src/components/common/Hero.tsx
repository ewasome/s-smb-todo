import React from "react";
import styled from "styled-components";
import breakpoints from "../../styles/breakpoints";

const HeroSection = styled.section`
  background-color: var(--color-white);
  ${breakpoints.device.l} {
    display: flex;
  }
`;

const HeroBannerContainer = styled.div`
  display: none;
  ${breakpoints.device.m} {
    background-color: var(--color-purple-0);
    padding: 4rem 6rem;
    display: flex;
  }
  ${breakpoints.device.l} {
    flex: 2;
    padding: 4.5rem 3rem;
  }
  ${breakpoints.device.xl} {
    padding: 4.5rem 6rem;
  }
`;

const HeroBanner = styled.div`
  background-color: var(--color-white);
  border: 15px solid var(--color-green);
  border-radius: 30px;
  text-align: center;
  ${breakpoints.device.l} {
    margin-left: -6rem;
  }
  ${breakpoints.device.xl} {
    margin-left: -12rem;
  }
  img {
    max-width: 100%;
    ${breakpoints.device.l} {
      height: 50vh;
    }
  }
`;

const HeroText = styled.div`
  padding: 2rem;
  ${breakpoints.device.m} {
    padding: 4rem 3rem;
  }
  ${breakpoints.device.l} {
    flex: 1;
    padding: 4.5rem 9rem 4.5rem 3rem;
  }
  ${breakpoints.device.xl} {
    padding: 4.5rem 18rem 4.5rem 6rem;
  }

  h1 {
    font-size: 3.5rem;
    margin: 1rem 0;
  }

  h3 {
    margin: 0;
    color: var(--color-green);
  }
`;

interface HeroProps {
  subtitle: string;
  text: string;
  banner: React.ReactNode;
  action: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({ subtitle, text, banner, action }) => {
  return (
    <HeroSection>
      <HeroText>
        <h3>{subtitle}</h3>
        <h1>{text}</h1>
        <div>{action}</div>
      </HeroText>
      <HeroBannerContainer>
        <HeroBanner>{banner}</HeroBanner>
      </HeroBannerContainer>
    </HeroSection>
  );
};

export default Hero;
