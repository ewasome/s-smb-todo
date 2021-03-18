import { createGlobalStyle } from "styled-components";
import { getCssVariabled } from "./colorPalette";

const GlobalStyle = createGlobalStyle`
  :root {
    ${getCssVariabled}
  }
  body {
    margin: 0;
    padding: 0;
    background-color: #f3f4f6;
    font-family: Open-Sans, Helvetica, Sans-Serif;
    font-family: 'Trebuchet MS', Helvetica, Arial, Roboto, sans-serif;
    * {
      box-sizing: inherit;
      font-family: inherit;
    }
  }

  button {
    background-color: transparent;
    padding: 0;
    border: none;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    &:hover, &:focus, &:active {
      outline: none;
    }
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    transition: all 0.1s ease-in-out;

    &:active {
      color: initial;
    }
  }
`;

export default GlobalStyle;
