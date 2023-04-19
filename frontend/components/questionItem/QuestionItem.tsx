import Link from 'next/link';
import styled from 'styled-components';
import { Chip } from '../chip/Chip';
import { parseDate } from '@/util/date';
import { useRouter } from 'next/router';
import { MouseEvent } from 'react';

export type QuestionItemProps = {
  id: string;
  body: string;
  title: string;
  isVote: number;
  isScore: number;
  userName: string;
  answerCount: number;
  creationData: string;
  tags: Array<{ id: string; name: string }>;
};

export const QuestionItem = (props: QuestionItemProps) => {
  const router = useRouter();

  const handleUserRouterClick = (e: MouseEvent<HTMLSpanElement>) => {
    router.push(`/users/${props.userName}`);
  };

  return (
    <Container>
      <Link href={`/questions/${props.id}`}>
        <QuestionHeader>
          <div className="votes" aria-hidden>
            <span>{props.isVote}</span>
            <span>votes</span>
          </div>
          <div className="answers_cnt">
            <span>{props.isScore}</span>
            <span>answers</span>
          </div>
          <div className="views_cnt" aria-hidden>
            <span>{props.answerCount}</span>
            <span>views</span>
          </div>
        </QuestionHeader>
        <QuestionContent>
          <h2 className="title">{props.title}</h2>
          <div className="content">{props.body}</div>
          <div className="qustion_info">
            <ul className="tags">
              {props.tags.map((tag) => (
                <li key={tag.id} aria-label={`tag ${tag.name}`}>
                  <Chip href={tag.name}>{tag.name}</Chip>
                </li>
              ))}
            </ul>
            <div className="user">
              <UserRoute onClick={handleUserRouterClick} aria-hidden>
                {props.userName}
              </UserRoute>
              <span>{`asked ${parseDate(props.creationData, true)}`}</span>
            </div>
          </div>
        </QuestionContent>
      </Link>
    </Container>
  );
};

const Container = styled.li`
  padding: 16px;
  max-width: 751px;
  list-style: none;
  font-family: 'Roboto', sans-serif;

  & > a {
    position: inline-block;
    display: flex;

    @media (max-width: 980px) {
      flex-direction: column;
    }
  }

  &:not(:last-child) {
    border-bottom: 1px solid #e3e6e8;
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

  @media (max-width: 980px) {
    font-size: 12px;
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
    flex-wrap: wrap;
    gap: 20px;

    .tags {
      display: inline-flex;
      gap: 4px;
    }

    .user {
      display: inline-flex;
      align-items: end;
      margin-left: auto;
      font-size: 12px;
      color: #6a737c;
      gap: 4px;
    }
  }

  @media (max-width: 640px) {
    .title {
      font-size: 14px;
    }

    .content {
      font-size: 10px;
      line-height: 13px;
    }

    .qustion_info {
      .user {
        font-size: 10px;
      }
    }
  }
`;

const UserRoute = styled.span`
  font-size: 12px;
  color: #0074cc;
  margin-left: auto;
  display: inline-flex;
  border: none;
  background: none;
  cursor: pointer;

  @media (max-width: 640px) {
    font-size: 10px;
  }
`;
