const colorPalette = {
  'purple-0': '#f4eff5',
  'purple-1': '#ded1e0',
  'purple-2': '#4d194d',
  'purple-3': '#312244',
  'blue-0': '#dbf7fb',
  'blue-1': '#cbf3f9',
  green: '#0b525b',
  black: '#000',
  white: '#fff',
  grey: '#e6e6e6',
};

export const getCssVariabled = Object.keys(colorPalette).map(color => (
  `--color-${color}: ${colorPalette[color]};`
));

export default colorPalette;
