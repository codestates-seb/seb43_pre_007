import Head from 'next/head';
import styled from 'styled-components';
import Button from '@/components/button/Button';
import RightSideBar from '@/components/side_bar/RightSideBar';
import { api } from '@/util/api';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { objToQuery } from '@/util/objectToQuery';
import { ResQuestion } from '@/util/api/questions';
import { FilterButton } from '@/components/button/FilterButton';
import { QuestionList } from '@/components/questionList/QuestionList';
import { INIT_FILTER, QUESTION_FILTER_LIST } from '@/constant/constant';

const Home = () => {
  const { push, query, isReady } = useRouter();
  const { filter } = query;

  const { isLoading, data } = useQuery(
    ['questions', query],
    () =>
      api
        .get<ResQuestion>(`/questions${objToQuery(query)}`)
        .then((res) => res.data),
    { enabled: isReady }
  );

  const handlePagefilter = (filter: { [key: string]: string | number }) => {
    const setQuery = { ...query, ...filter };

    if ('perPage' in filter) setQuery['page'] = INIT_FILTER.PAGE;

    push({
      pathname: '/questions',
      query: setQuery,
    });
  };

  return (
    <>
      <Head>
        <title>Stack Overflow</title>
      </Head>
      <Container>
        <div>
          <QuestionHeader>
            <div>
              <h1>All Questions</h1>
              <CustomButton onClick={() => push('/questions/ask')}>
                Ask Question
              </CustomButton>
            </div>
            <div>
              <FilterButton
                default={filter?.toString() || INIT_FILTER.FILTER}
                onChange={(filter) => handlePagefilter({ filter })}
                filters={QUESTION_FILTER_LIST}
              />
            </div>
          </QuestionHeader>
          <QuestionList isLoading={isLoading} content={data} />
          <QuestionFooter />
        </div>
        <RightSideBar />
      </Container>
    </>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 97.5%;
  font-family: 'Roboto';

  > div:first-child {
    flex: 1;
    display: flex;
    flex-direction: column;
    > div:nth-child(2) {
      flex: 1;
      min-height: 65vh;
    }
  }
`;

const QuestionHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 16px 0 16px;

  h1 {
    color: #232629;
    font-size: 25px;
  }

  .question_cnt {
    display: flex;
    align-items: center;
    font-size: 16px;
  }

  & > div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  @media (max-width: 640px) {
    h1 {
      font-size: 20px;
    }

    .question_cnt {
      font-size: 15px;
    }
  }
`;

const CustomButton = styled(Button)`
  width: 100px;
  height: 37px;
  color: white;
`;

const QuestionFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 70px 0 20px;
  padding: 0 24px 24px 24px;
  gap: 10px;

  @media (max-width: 640px) {
    margin: 70px 0 0 0;
  }
`;
