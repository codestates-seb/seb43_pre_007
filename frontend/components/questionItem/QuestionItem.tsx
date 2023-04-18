import Link from 'next/link';
import styled from 'styled-components';
import { Chip } from '../chip/Chip';
import { parseDate } from '@/util/date';

export type QuestionItemProps = {
  body: string;
  title: string;
  userId: string;
  isVote: number;
  isScore: number;
  answerCount: number;
  creationData: string;
  tags: Array<{ id: string; name: string }>;
  user: {
    displayName: string;
  };
};

export const QuestionItem = (props: QuestionItemProps) => {
  return (
    <Container href="">
      <QuestionHeader>
        <div className="votes">
          <span>{props.isVote}</span>
          <span>votes</span>
        </div>
        <div className="answers_cnt">
          <span>{props.isScore}</span>
          <span>answers</span>
        </div>
        <div className="views_cnt">
          <span>{props.answerCount}</span>
          <span>views</span>
        </div>
      </QuestionHeader>
      <QuestionContent>
        <h2 className="title">{props.title}</h2>
        <div className="content">{props.body}</div>
        <div className="qustion_info">
          <div className="tags">
            {props.tags.map((tag) => (
              <Chip href={tag.name} key={tag.id}>
                {tag.name}
              </Chip>
            ))}
          </div>
          <div className="user">
            <Link href={`/users/${props.user.displayName}`}>
              {props.user.displayName}
            </Link>
            {`asked ${parseDate(props.creationData, false)}`}
          </div>
        </div>
      </QuestionContent>
    </Container>
  );
};

const Container = styled(Link)`
  display: flex;
  padding: 16px;
  max-width: 751px;
  font-family: 'Roboto', sans-serif;

  &:not(:last-child) {
    border-bottom: 1px solid #e3e6e8;
  }

  @media (max-width: 980px) {
    flex-direction: column;
  }
`;

const QuestionHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 16px;
  align-items: end;
  font-size: 13px;
  width: 108px;
  gap: 6px;
  color: #6a737c;

  & > div {
    display: flex;
    gap: 4px;

    & > :first-child {
      font-weight: 500;
    }
  }

  .votes {
    color: #0c0d0e;
  }

  .answers_cnt {
  }

  .views_cnt {
  }

  @media (max-width: 980px) {
    flex-direction: row;
    margin-bottom: 4px;
  }
`;

const QuestionContent = styled.div`
  flex: 1 1;
  display: flex;
  flex-direction: column;

  .title {
    font-size: 17px;
    color: #0074cc;
    margin-bottom: 5px;
  }

  .content {
    line-height: 18px;
    font-size: 12px;
    margin-bottom: 8px;
    color: #3c4045;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .qustion_info {
    display: flex;

    .tags {
      display: inline-flex;
      gap: 4px;
    }

    .user {
      font-size: 13px;
      margin-left: auto;
      display: inline-flex;
    }
  }
`;

const User = styled(Link)`
  font-size: 12px;
  margin-left: auto;
  display: inline-flex;
`;
