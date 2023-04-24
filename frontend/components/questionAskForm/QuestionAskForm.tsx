import { useForm } from '@/hooks/useForm';
import styled from 'styled-components';
import Button from '@/components/button/Button';
import Input from '@/components/input/Input';
import dynamic from 'next/dynamic';
import 'easymde/dist/easymde.min.css';
import { InputChip } from '../inputChip/InputChip';

const MarkDownEditor = dynamic(
  () =>
    import('@/components/markDownEditor/MarkDownEditor').then(
      (res) => res.MarkDownEditor
    ),
  {
    ssr: false,
  }
);

type QuestionAskForm = {
  title: string;
  content: string;
  tags: string;
};

export const QuestionAskForm = () => {
  const { data, handleChange, errors, handleSubmit } = useForm<QuestionAskForm>(
    {
      initialValues: {
        title: '',
        content: '',
        tags: '',
      },
      validations: {
        title: {
          required: {
            value: true,
            message: 'you need to require title',
          },
        },
        content: {
          required: {
            value: true,
            message: 'you need to require content',
          },
        },
        tags: {
          required: {
            value: true,
            message: 'you need to require tag',
          },
        },
      },
      onSubmit: handleAskFormSubmit,
    }
  );

  function handleAskFormSubmit() {}

  const handlemarkdownChange = (content: string) => {
    handleChange('content')(content);
  };

  return (
    <Container onSubmit={handleSubmit}>
      <InputContainer>
        <h3>Title</h3>
        <p>
          Be specific and imagine you’re asking a question to another person
        </p>
        <Input
          paddingLeft="10px"
          value={data.title}
          onChange={handleChange('title')}
        />
        {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
      </InputContainer>
      <FormContent>
        <h3>Body</h3>
        <p>
          Include all the information someone would need to answer your question
        </p>
        <MarkDownEditor onChange={handlemarkdownChange} />
        {errors.content && <ErrorMessage>{errors.content}</ErrorMessage>}
      </FormContent>
      <InputContainer>
        <h3>Tags</h3>
        <p>Add up to 5 tags to describe what your question is about</p>
        <InputChip onChange={(tags) => handleChange('tags')(tags.join(''))} />
        {errors.tags && <ErrorMessage>{errors.tags}</ErrorMessage>}
      </InputContainer>
      <SubmitButton>Post your question</SubmitButton>
    </Container>
  );
};

const Container = styled.form`
  flex: 1;
  padding: 16px;
  position: relative;
  flex-direction: column;
  display: flex;
  width: calc(100% - 340px);
  color: #232629;
  background-color: white;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  h3 {
    font-size: 14px;
    font-weight: 500;
  }

  p {
    margin: 5px 0;
    font-size: 11px;
  }

  @media (max-width: 770px) {
    width: 100%;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormContent = styled.div`
  margin: 15px 0;
`;

const SubmitButton = styled(Button)`
  position: absolute;
  margin-top: 16px;
  width: 135px;
  height: 38px;
  color: white;
  left: 0;
  bottom: -60px;
`;

const ErrorMessage = styled.p`
  color: #d0393e;
  font-size: 13px !important;
  margin-top: 5px !important;
`;
