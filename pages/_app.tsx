import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import '../styles/App.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
