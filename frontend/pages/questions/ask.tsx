import styled from 'styled-components';
import { api } from '@/util/api';
import { useMutation } from 'react-query';
import { ReqAddQuestion, ResQuestion } from '@/util/api/addQuestions';
import {
  QuestionAskData,
  QuestionAskForm,
} from '@/components/questionAskForm/QuestionAskForm';
import { useRouter } from 'next/router';

const Ask = () => {
  const route = useRouter();

  const questionAsk = useMutation({
    mutationFn: (req: ReqAddQuestion) =>
      api.post<ResQuestion>('/questions/add', req),
    onSuccess: async (res) => {
      const { question_id } = res.data.question;
      if (res.data.question.question_id)
        route.push(`/questions/${question_id}`);
    },
  });

  const handleUpdateSubmit = (value: QuestionAskData) => {
    const tags = value.tags.map((tag) => ({
      tag_id: tag === '자바' ? 1 : 2,
      name: tag,
    }));

    questionAsk.mutate({ ...value, tags });
  };

  return (
    <ScreenView>
      <Container>
        <AskHeader>
          <h1>Ask a public question</h1>
        </AskHeader>
        <AskContent>
          <QuestionAskForm onSubmit={handleUpdateSubmit} />
        </AskContent>
      </Container>
    </ScreenView>
  );
};

export default Ask;

const ScreenView = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 50px 0 90px;
  background-color: #f1f2f3;
  font-family: 'Roboto', sans-serif;
`;

const Container = styled.div`
  display: flex;
  width: fit-content;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1215px;
  padding: 0 24px;

  @media (max-width: 640px) {
    padding: 0px 16px;
  }
`;

const AskHeader = styled.div`
  display: flex;
  justify-content: start;
  width: calc(100% - 340px);

  h1 {
    display: flex;
    align-items: center;
    font-size: 26px;
    font-weight: 500;
    padding: 24px 0;
    height: 130px;
  }

  @media (max-width: 640px) {
    h1 {
      font-size: 20px;
      font-weight: 500;
    }
  }

  @media (max-width: 980px) {
    width: 100%;
  }
`;

const AskContent = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  width: calc(100% - 340px);
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  @media (max-width: 980px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
`;
