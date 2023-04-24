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

export type QuestionAskFormProps = {
  value?: {
    title: string;
    content: string;
    tags: string[];
  };
  onSubmit: (value: QuestionAskFormProps['value']) => void;
};

export type QuestionAskForm = {
  title: string;
  content: string;
  tags: string;
};

export const QuestionAskForm = (props: QuestionAskFormProps) => {
  const { data, handleChange, errors, handleSubmit } = useForm<QuestionAskForm>(
    {
      initialValues: {
        title: props.value?.title || '',
        content: props.value?.content || '',
        tags: props.value?.tags.length ? props.value?.tags.join(',') : '',
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

  function handleAskFormSubmit() {
    props.onSubmit({ ...data, tags: data.tags.split(',') });
  }

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
        <InputChip
          value={data.tags ? data.tags.split(',') : []}
          onChange={(tags) => handleChange('tags')(tags.join(','))}
        />
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
  width: 100%;
  color: #232629;
  background-color: white;

  h3 {
    font-size: 14px;
    font-weight: 500;
  }

  p {
    margin: 5px 0;
    font-size: 11px;
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
  left: 13px;
  bottom: -60px;
`;

const ErrorMessage = styled.p`
  color: #d0393e;
  font-size: 13px !important;
  margin-top: 5px !important;
`;
