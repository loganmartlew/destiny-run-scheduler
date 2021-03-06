import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../styles/globals';
import theme from '../styles/theme';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default App;
