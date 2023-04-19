import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

import '../styles/App.css';
import Header from '@/components/header/Header';
import Container from '@/components/container/Container';
import { useRouter } from 'next/router';
import { nonContainerRoutes } from '@/constant/constant';
import Footer from '@/components/footer/Footer';

if (process.env.NODE_ENV === 'development') {
  require('../__mocks__');
}

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const currentPath = router.pathname;
  return (
    <RecoilRoot>
      <Header />
      {!nonContainerRoutes.includes(currentPath) ? (
        <Container>
          <Component {...pageProps} />
        </Container>
      ) : (
        <Component {...pageProps} />
      )}
      <Footer />
    </RecoilRoot>
  );
};

export default App;
