import React from "react";
import styled from "styled-components";

import breakpoints from "../../styles/breakpoints";

const ImageWrapper = styled.div`
  display: none;
  ${breakpoints.device.m} {
    display: block;
    max-width: 500px;
    margin: 0 auto;
    img {
      max-width: 100%;
    }
  }
  ${breakpoints.device.l} {
    padding: 2rem 3rem;
  }
  ${breakpoints.device.xl} {
    padding: 2rem 6rem;
  }
`;

const Caption = styled.div`
  padding: 2rem 3rem;
  font-size: 30px;
  ${breakpoints.device.l} {
    padding: 2rem 3rem;
  }
  ${breakpoints.device.xl} {
    padding: 2rem 6rem;
  }
`;

const Banner: React.FC = ({ text, imageSrc, imageProps }) => {
  return (
    <div>
      {text && (
        <Caption>
          <h4>{text}</h4>
        </Caption>
      )}
      <ImageWrapper>
        <img src={imageSrc} {...imageProps} />
      </ImageWrapper>
    </div>
  );
};

export default Banner;
