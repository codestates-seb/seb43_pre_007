import Link from 'next/link';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { Chip } from '@/components/chip/Chip';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';
import { parseDate } from '@/util/date';
import { MarkDownEiditorSkeleton } from '../markDownEditor/MarkDownEiditorSkeleton';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { api } from '@/util/api';

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

export type QuestionForm = {
  score: number;
  body: string;
  tags?: Array<{ tag_id: number; name: string }>;
  question_id: number;
  creation_date: string;
  display_name: string;
};

export const QuestionForm = (props: QuestionForm) => {
  const { push, query } = useRouter();

  const deleteQuestion = useMutation({
    mutationFn: () => api.delete(`/questions/${query.questionId}`),
    onSuccess: () => push('/questions'),
  });

  const handleEditClick = () => {
    push(`/questions/${props.question_id}/edit`);
  };

  return (
    <QuestionContent>
      <QuestionLayOut>
        <i>
          <TiArrowSortedUp color="#babfc3" size={'40px'} />
        </i>
        <p className="score">{props.score}</p>
        <i>
          <TiArrowSortedDown color="#babfc3" size={'40px'} />
        </i>
      </QuestionLayOut>
      <QuestionEditor>
        <MarkDownEditor value={props.body} preview />
        {props.tags && (
          <TagContainer>
            {props.tags.map((tag) => (
              <Chip href={`/${tag.name}`} key={tag.tag_id}>
                {tag.name}
              </Chip>
            ))}
          </TagContainer>
        )}
        <div className="editing">
          <div className="link_container">
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={() => deleteQuestion.mutate()}>Delete</button>
          </div>
          <User>
            <p>{parseDate(props.creation_date)}</p>
            <div className="user_info">
              {/* 유저 이미지 */}
              {/* <img src={} alt="user Image" /> */}
              <div>
                <Link href={`/users/${props.display_name}`}>
                  {props.display_name}
                </Link>
                <div className="user_score">
                  <span className="score">123K</span>
                  <span className="badge badge_gold" />
                  <span>7</span>
                  <span className="badge badge_silver" />
                  <span>40</span>
                  <span className="badge badge_copper" />
                  <span>77</span>
                </div>
              </div>
            </div>
          </User>
        </div>
      </QuestionEditor>
    </QuestionContent>
  );
};

const QuestionContent = styled.div`
  display: flex;

  .side {
    flex: 0 0 auto;
    width: 300px;
  }
`;

const QuestionLayOut = styled.div`
  margin-top: 10px;
  width: 40px;

  .score {
    color: #6a737c;
    width: 40px;
    text-align: center;
    font-size: 21px;
  }

  transform: translate(-10px, -5px);
`;

const QuestionEditor = styled.div`
  flex: 1;

  .editing {
    margin-top: 24px;
    display: flex;
    justify-content: space-between;

    .link_container {
      display: flex;
      gap: 10px;

      & > button {
        display: flex;
        gap: 5px;
        color: #9ca1a7;
        font-size: 11px;
        height: fit-content;
        background-color: unset;
        border: none;
        cursor: pointer;
      }
    }
  }
`;

const TagContainer = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  color: #6a737c;
  font-size: 12px;
  gap: 8px;

  .user_info {
    display: flex;
    justify-content: flex-start;
    gap: 8px;
    width: 100%;

    img {
      width: 32px;
      height: 32px;
    }

    div {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    a {
      color: #0074cc;
      font-size: 13px;
    }

    .user_score {
      display: flex;
      flex-direction: row;
      align-items: center;

      .score {
        font-weight: bold;
        font-size: 12px;
        margin-right: 2px;
      }

      .badge {
        width: 6px;
        height: 6px;
        border-radius: 50%;
      }

      .badge_gold {
        background-color: gold;
      }

      .badge_silver {
        background-color: silver;
      }

      .badge_copper {
        background-color: #d0a684;
      }
    }
  }

  @media (max-width: 640px) {
    width: 150px;
  }
`;
