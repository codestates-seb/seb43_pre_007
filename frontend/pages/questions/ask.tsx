import styled from 'styled-components';
import { QuestionAskForm } from '@/components/questionAskForm/QuestionAskForm';

const Ask = () => {
  return (
    <ScreenView>
      <Container>
        <AskHeader>
          <h1>Ask a public question</h1>
        </AskHeader>
        <AskContent>
          <QuestionAskForm />
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
  /* background: skyblue; */

  @media (max-width: 640px) {
    padding: 0px 16px;
  }
`;

const AskHeader = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;

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
`;

const AskContent = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  width: 100%;

  @media (max-width: 770px) {
    flex-direction: column;
    align-items: center;
  }
`;
