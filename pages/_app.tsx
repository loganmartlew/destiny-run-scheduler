import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { UserProvider } from '@auth0/nextjs-auth0';
import '@/styles/imports.css';
import GlobalStyles from '@/styles/globals';
import theme from '@/styles/theme';

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
