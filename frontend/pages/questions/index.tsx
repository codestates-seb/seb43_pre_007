import Head from 'next/head';
import { useRouter } from 'next/router';
import { QuestionItem } from '@/components/questionItem/QuestionItem';
import { FilterButton } from '@/components/button/FilterButton';
import { addCommaToNumber } from '@/util/addCommaToNum';
import { useQuery } from 'react-query';
import { ResQuestion } from '@/util/api/questions';
import { PerPage } from '@/components/perPage/PerPage';
import { api } from '@/util/api';
import styled from 'styled-components';
import Pagenation from '@/components/pagenation/Pagenation';
import Button from '@/components/button/Button';
import { objToQuery } from '@/util/objectToQuery';
import {
  INIT_FILTER,
  QUESTION_FILTER_LIST,
  QUESTION_PER_PAGE_LIST,
} from '@/constant/constant';
import { Skeleton } from '@/components/skeleton/Skeleton';

const Questions = () => {
  const { push, query, isReady } = useRouter();
  const { page, perPage, filter } = query;

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

  const handleWriteClick = () => {
    push('/questions/ask');
  };

  return (
    <>
      <Head>
        <title>
          {isReady && filter ? `${filter} - Stack Overflow` : `Stack Overflow`}
        </title>
      </Head>
      <Container>
        <QuestionHeader>
          <div>
            <h1>All Questions</h1>
            <CustomButton onClick={handleWriteClick}>Ask Question</CustomButton>
          </div>
          <div>
            <div className="question_cnt">
              {addCommaToNumber(data?.page_info?.total_elements || 0)} questions
            </div>
            <FilterButton
              default={filter?.toString() || INIT_FILTER.FILTER}
              onChange={(filter) => handlePagefilter({ filter })}
              filters={QUESTION_FILTER_LIST}
            />
          </div>
        </QuestionHeader>
        {!isLoading && data?.data?.length ? (
          <QuestionList>
            {data?.data?.map(({ question, user }) => {
              return (
                <QuestionItem
                  id={question.question_id}
                  title={question.title}
                  body={question.body}
                  isVote={question.vote.is_vote}
                  isScore={question.vote.score}
                  answerCount={question.answer_count}
                  creationData={question.creation_date}
                  userName={user.display_name}
                  key={question.question_id}
                  tags={question.tags.map((tag) => ({
                    id: tag.tag_id,
                    name: tag.name,
                  }))}
                />
              );
            })}
          </QuestionList>
        ) : (
          <SkeletonContainer>
            <div>
              <Skeleton width={`100px`} height={'20px'} />
              <Skeleton width={`100px`} height={'20px'} />
              <Skeleton width={`100px`} height={'20px'} />
            </div>
            <div>
              <Skeleton width={`100%`} height={'20px'} />
              <Skeleton width={`100%`} height={'20px'} />
              <Skeleton width={`100%`} height={'20px'} />
            </div>
          </SkeletonContainer>
        )}
        <QuestionFooter>
          <Pagenation
            initialPage={Number(page) || INIT_FILTER.PAGE}
            pageSize={Number(data?.page_info?.total_pages) - 1 || 0}
            onPageChange={(page) => handlePagefilter({ page })}
          />
          <PerPage
            current={Number(perPage) || INIT_FILTER.PER_PAGE}
            perPageList={QUESTION_PER_PAGE_LIST}
            onChangePage={(perPage) => handlePagefilter({ perPage })}
          />
        </QuestionFooter>
      </Container>
    </>
  );
};

export default Questions;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 727px;
  font-family: 'Roboto';
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

const QuestionList = styled.ul`
  border-top: 1px solid #d6d9dc;
  border-bottom: 1px solid #d6d9dc;
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

const SkeletonContainer = styled.div`
  padding: 16px 16px 0 16px;
  width: 100%;
  display: flex;
  gap: 10px;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 10px;

    &:last-child {
      width: 100%;
    }
  }
`;
