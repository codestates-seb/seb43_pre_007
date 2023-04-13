import Header from '@/components/Header';
import Head from 'next/head';
//경로 https://stackoverflow.com/
const Home = () => {
  return (
    <>
      <Head>
        <title>Stack Overflow</title>
      </Head>
      <Header />
    </>
  );
};

export default Home;
