import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import '../styles/App.css';
import Header from '@/components/header/Header';

if (process.env.NODE_ENV === 'development') {
  require('../__mocks__');
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <Header />
      <Component {...pageProps} />
    </RecoilRoot>
  );
};

export default App;
