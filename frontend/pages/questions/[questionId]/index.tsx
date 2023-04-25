import styled from 'styled-components';
import { useQuery } from 'react-query';
import { api } from '@/util/api';
import { useRouter } from 'next/router';
import { Question } from '@/util/api/question';
import { parseDate } from '@/util/date';
import { QuestionForm } from '@/components/questionForm/QuestionForm';
import { Skeleton } from '@/components/skeleton/Skeleton';
import { MarkDownEiditorSkeleton } from '@/components/markDownEditor/MarkDownEiditorSkeleton';
import RightSideBar from '@/components/side_bar/RightSideBar';
import dynamic from 'next/dynamic';
import Button from '@/components/button/Button';
import Link from 'next/link';

const MarkDownEditor = dynamic(
  () =>
    import('@/components/markDownEditor/MarkDownEditor').then(
      (res) => res.MarkDownEditor
    ),
  {
    ssr: false,
    loading: () => <MarkDownEiditorSkeleton />,
  }
);

const DetailQuestion = () => {
  const { isReady, query } = useRouter();

  const { isLoading, data } = useQuery(
    ['detailQuestion'],
    () =>
      api
        .get<Question>(`/questions/${query.questionId}`)
        .then((res) => res.data),
    { enabled: isReady }
  );

  return (
    <Container>
      {data && !isLoading ? (
        <>
          <QuestionHeader>
            <div className="info">
              <h1>{data?.question.title}</h1>
              <div>
                <p>{parseDate(data.question.creation_date)}</p>
                <p>Modified {parseDate(data.question.last_edit_date)}</p>
                <p>viewed {data.question.view_count} times</p>
              </div>
            </div>
            <Link href={'/questions/ask'}>
              <ActionButton>Ask Question</ActionButton>
            </Link>
          </QuestionHeader>
          <QuestionContent>
            <div className="content">
              <QuestionForm
                score={0}
                body={data.question.body}
                tags={data.question.tags}
                question_id={data.question.question_id}
                creation_date={data.question.creation_date}
                display_name={data.user.display_name}
              />
              <AnswersInfo>
                <h2>{data.answers.length} Answers</h2>
              </AnswersInfo>
              {data.answers.map((ans) => (
                <QuestionForm
                  key={ans.answer_id}
                  score={ans.score}
                  body={ans.body}
                  question_id={ans.answer_id}
                  creation_date={ans.creation_date}
                  display_name={ans.user.display_name}
                />
              ))}
              <YourAnswerContainer>
                <h2>Your Answer</h2>
                <MarkDownEditor />
                <ActionButton>Post Your Answer</ActionButton>
              </YourAnswerContainer>
            </div>
            <RightSideBar />
          </QuestionContent>
        </>
      ) : (
        <>
          <SkeletonContainer>
            <Skeleton width={'100%'} height={'20px'} />
            <Skeleton width={'100%'} height={'10px'} />
            <div className="content">
              <Skeleton width={'40px'} height={'40px'} />
              <div className="info">
                <Skeleton width={'100%'} height={'20px'} />
                <Skeleton width={'100%'} height={'300px'} />
                <Skeleton width={'100%'} height={'20px'} />
                <Skeleton width={'100%'} height={'100px'} />
                <Skeleton width={'100%'} height={'30px'} />
              </div>
            </div>
          </SkeletonContainer>
        </>
      )}
    </Container>
  );
};

export default DetailQuestion;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  font-family: 'Roboto', sans-serif;

  @media (max-width: 640px) {
    padding: 24px 15px;
  }
`;

const ActionButton = styled(Button)`
  color: white;
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e3e6e8;
  margin-bottom: 15px;

  .info {
    div {
      display: flex;
      gap: 15px;
    }
  }

  h1 {
    padding-bottom: 8px;
    font-size: 2rem;
  }

  .info {
    display: flex;
    flex-direction: column;
    padding-bottom: 8px;
  }

  p {
    color: #6a737c;
    font-size: 12px;
  }

  @media (max-width: 640px) {
    h1 {
      font-size: 1.5rem;
    }
  }
`;

const AnswersInfo = styled.div`
  margin: 30px 0;

  h2 {
    color: #232629;
    font-size: 20px;
    font-weight: 400;
  }
`;

const YourAnswerContainer = styled.div`
  margin-top: 10px;
  padding-top: 20px;
  border-top: 1px solid #e3e6e8;
  width: 100%;

  h2 {
    font-size: 20px;
    margin-bottom: 20px;
  }

  & > button {
    margin-top: 10px;
    width: 130px;
    height: 40px;
  }
`;

const QuestionContent = styled.div`
  display: flex;

  .side {
    flex: 0 0 auto;
    width: 300px;
  }

  .content {
    width: 100%;
  }
`;

const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .header {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .content {
    display: flex;
    gap: 20px;

    .info {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 10px;
    }
  }
`;
