const size = {
  s: "320px", // phone     <600
  m: "600px", // tablet    600-1023
  l: "1024px", // desktop   1024-1439
  xl: "1440px", // desktop   1440-1919
};

const device = {
  s: `@media only screen and (min-width: ${size.s})`,
  m: `@media only screen and (min-width: ${size.m})`,
  l: `@media only screen and (min-width: ${size.l})`,
  xl: `@media only screen and (min-width: ${size.xl})`,
};

export default { size, device };
