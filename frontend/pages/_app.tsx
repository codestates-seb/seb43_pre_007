import type { AppProps } from 'next/app';
import { RecoilRoot, useRecoilState } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/App.css';
import Header from '@/components/header/Header';
import Container from '@/components/container/Container';
import { useRouter } from 'next/router';
import Footer from '@/components/footer/Footer';
import { NON_CONTAINER_ROUTES } from '@/constant/constant';

const queryClient = new QueryClient();

if (process.env.NODE_ENV === 'development') {
  require('../__mocks__');
}

// 여기서 accessToken 있는지 확인하고 fetch를 해야한다

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Header />
        {!NON_CONTAINER_ROUTES.includes(currentPath) ? (
          <Container>
            <Component {...pageProps} />
          </Container>
        ) : (
          <Component {...pageProps} />
        )}
        <Footer />
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default App;
