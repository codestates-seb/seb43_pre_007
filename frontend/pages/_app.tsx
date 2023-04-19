import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
<<<<<<< HEAD

=======
import { QueryClient, QueryClientProvider } from 'react-query';
>>>>>>> c63cd291bb7df928aa0bc6451c42b85692d2874f
import '../styles/App.css';
import Header from '@/components/header/Header';
import Container from '@/components/container/Container';
import { useRouter } from 'next/router';
import { nonContainerRoutes } from '@/constant/constant';
import Footer from '@/components/footer/Footer';

const queryClient = new QueryClient();

if (process.env.NODE_ENV === 'development') {
  require('../__mocks__');
}

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const currentPath = router.pathname;
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default App;
