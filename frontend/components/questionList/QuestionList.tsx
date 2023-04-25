import styled from 'styled-components';
import { Skeleton } from '@/components/skeleton/Skeleton';
import { ResQuestion } from '@/util/api/questions';
import { QuestionItem } from '@/components/questionItem/QuestionItem';
import { useEffect, useState } from 'react';

export type QuestionListProps = {
  isLoading?: boolean;
  content?: ResQuestion | undefined;
};

export const QuestionList = ({ isLoading, content }: QuestionListProps) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Container>
      {!isLoading && mounted ? (
        content?.data?.length ? (
          <QuestionsList>
            {content.data.map(({ question, user }) => {
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
          </QuestionsList>
        ) : (
          <NotList>
            <div className="large">{`We couldn't find anything`}</div>
            <div className="small">{`Try different or less specific keywords.`}</div>
          </NotList>
        )
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
    </Container>
  );
};

const Container = styled.div``;

const QuestionsList = styled.ul`
  border-top: 1px solid #d6d9dc;
  border-bottom: 1px solid #d6d9dc;
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

const NotList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;

  .large {
    font-size: 17px;
    margin-bottom: 15px;
  }

  .small {
    font-size: 13px;
  }
`;
