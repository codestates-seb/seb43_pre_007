import Head from 'next/head';
import styled from 'styled-components';
//경로 https://stackoverflow.com/
const Home = () => {
  return (
    <>
      <Head>
        <title>Stack Overflow</title>
      </Head>
      <HomeContainer>홈입니다.</HomeContainer>
    </>
  );
};

export default Home;

const HomeContainer = styled.div`
  padding-top: 50px;
`;
