import styled from 'styled-components';
import { api } from '@/util/api';
import { Question } from '@/util/api/question';
import { useRouter } from 'next/router';
import { QuestionAskForm } from '@/components/questionAskForm/QuestionAskForm';
import { ReqAddQuestion } from '@/util/api/addQuestions';
import { useMutation, useQuery } from 'react-query';

const QuestionEdit = () => {
  const { isReady, query, push } = useRouter();

  const { data } = useQuery(
    ['detailQuestion'],
    () =>
      api
        .get<Question>(`/questions/${query.questionId}`)
        .then((res) => res.data),
    { enabled: isReady }
  );

  const fetch = useMutation({
    mutationFn: (req: ReqAddQuestion) =>
      api.patch(`/questions/${query.questionId}/edit`, req),
    onSuccess: (_) => push(`/questions/${query.questionId}`),
  });

  const handleUpdateSubmit = (value: ReqAddQuestion) => {
    fetch.mutate(value);
  };

  return (
    <Container>
      <Content>
        {data && (
          <QuestionAskForm
            onSubmit={handleUpdateSubmit}
            value={{
              title: data.question.title,
              body: data.question.body,
              tags: data.question.tags.map((tag) => tag.name),
            }}
          />
        )}
      </Content>
    </Container>
  );
};

export default QuestionEdit;

const Container = styled.div`
  diplay: flex;
  width: 100%;
  padding: 10px 10px 100px;
`;

const Content = styled.div`
  width: 600px;

  @media (max-width: 980px) {
    width: 100%;
  }
`;
