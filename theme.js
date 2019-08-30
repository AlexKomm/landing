/* eslint-disable prefer-destructuring */

const breakpoints = ['40em', '52em', '64em'];

breakpoints.small = breakpoints[0];
breakpoints.medium = breakpoints[1];
breakpoints.large = breakpoints[2];

const mediaQueries = {
  medium: `screen and (min-width: ${breakpoints[0]})`,
  large: `screen and (min-width: ${breakpoints[1]})`,
  xlarge: `screen and (min-width: ${breakpoints[2]})`,
};

// Font size scale
const fontSizes = [12, 14, 16, 18, 20, 24, 32, 48, 64, 72];

// Border radius scale
const radii = [0, 4, 8, 12, 16, 20, 24];

// Space for margin and padding
const space = [0, 4, 8, 16, 32, 64, 128, 256, 512];

const fontFamily = '"GothamPro", "Helvetica", "Arial", sans-serif';

const colors = {
  primaryText: '#262626',
  overlayBg: 'rgba(0,0,0,.75)',
  error: '#ffa695',
  warning: '#ffb401',
  white: '#ffffff',
  green: '#48aa7f',
  darkGreen: '#125437',
  lightgreen: '#38c459',
  lightgrey: '#c6c6c6',
  grey: '#7a7d7d',
  beige: '#f6f4ee',
};

const shadows = {
  default: '0 6px 6px 0 rgba(0,0,0,.25)',
};

// Button variants
const buttons = {
  primary: {
    cursor: 'pointer',
    border: 'none',
    color: colors.white,
    backgroundImage: 'linear-gradient(82deg,#46a97c,#38c459)',
    '&:hover': {
      backgroundImage: 'none',
      backgroundColor: '#38C459',
    },
    '&:disabled': {
      backgroundImage: 'none',
      backgroundColor: 'grey',
    },
  },
  secondary: {
    color: colors.white,
    backgroundColor: 'transparent',
    border: '1px solid white',
    fontWeight: 500,
  },
  orangeGradient: {
    background: 'linear-gradient(135deg,#cc9000,#f0520e 75%)',
    boxShadow: '0 0 25px 2px rgba(23,52,39,.2)',
  },
};

// Card variants
const cards = {
  transparent: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    borderBottom: 'solid .5px rgba(255,255,255,.51)',
  },
  white: {
    color: colors.primaryText,
    backgroundColor: colors.white,
    boxShadow: shadows.default,
  },
  orange: {
    backgroundImage: 'linear-gradient(235deg,#ffb400,#f4743d)',
  },
  blue: {
    backgroundImage: 'radial-gradient(circle at 50% 21%,#89c5d7,#447a93)',
  },
  green: {
    backgroundImage: 'linear-gradient(191deg,#56c476,#48aa7f)',
  },
  beige: {
    backgroundColor: colors.beige,
  },
};

const linkStyles = {
  default: {
    color: colors.green,
    fontWeight: 500,
    '&:hover': {
      color: colors.primaryText,
    },
  },
  greenWhite: {
    color: colors.green,
    fontWeight: 500,
    '&:hover': {
      color: colors.white,
    },
  },
  blackGreen: {
    color: colors.primaryText,
    fontWeight: 500,
    '&:hover': {
      color: colors.green,
    },
  },
  blackWhite: {
    color: colors.primaryText,
    fontWeight: 500,
    '&:hover': {
      color: colors.white,
    },
  },
  whiteBlack: {
    color: colors.white,
    fontWeight: 500,
    '&:hover': {
      color: colors.primaryText,
    },
  },
  whiteGreen: {
    color: colors.white,
    fontWeight: 500,
    '&:hover': {
      color: colors.green,
    },
  },
};

export default {
  breakpoints,
  mediaQueries,
  fontSizes,
  fontFamily,
  colors,
  space,
  shadows,
  cards,
  buttons,
  radii,
  linkStyles,
};
