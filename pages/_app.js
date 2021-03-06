import { ThemeProvider } from 'styled-components';
import { AuthProvider } from '../contexts/AuthContext';
import '../styles/imports.css';
import GlobalStyles from '../styles/globals';
import theme from '../styles/theme';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
