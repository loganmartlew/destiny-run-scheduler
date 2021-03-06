import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../styles/theme';
import 'fontsource-roboto';

const App = ({ Component, pageProps }) => {
  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
      <CssBaseline />
      <Component {...pageProps} />
      {/* </ThemeProvider> */}
    </>
  );
};

export default App;
