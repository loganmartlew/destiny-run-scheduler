export interface Theme {
  padding: string;
  paddingN: string;
  colors: {
    white: string;
    primary: string;
    primaryLight: string;
    dark: string;
    darkLight: string;
    danger: string;
    dangerLight: string;
  };
  letterSpacing: {
    title: number;
    space: (amount: number) => string;
  };
}

const theme: Theme = {
  padding: 'clamp(1rem, 10vw, 8rem)',
  paddingN: 'clamp(-8rem, -10vw, -1rem)',

  colors: {
    white: 'white',
    primary: '#00AAFF',
    primaryLight: '#4fc4ff',
    dark: '#0C0C16',
    darkLight: '#13131D',
    danger: '#FF0077',
    dangerLight: '#FF3995',
  },

  letterSpacing: {
    title: 4,
    space: (amount: number) => `
      letter-spacing: ${amount}px;
    `,
  },
};

export default theme;
