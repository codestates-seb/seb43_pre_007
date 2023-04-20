import styled from 'styled-components';
import { useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

export type MarkDownEditorProps = {
  content?: string;
  onChangeText: (test: string | undefined) => void;
};

export const MarkDownEditor = (props: MarkDownEditorProps) => {
  const editor = useRef<Editor>(null);

  const handleEditorChange = () => {
    const content = editor.current?.getInstance().getHTML();
    props.onChangeText(content);
  };

  return (
    <Container>
      <Editor
        ref={editor}
        height={'100%'}
        previewStyle={'vertical'}
        initialEditType={'markdown'}
        initialValue={props.content}
        onChange={handleEditorChange}
      />
    </Container>
  );
};

const Container = styled.div`
  border-radius: 4px;
  height: 600px;

  @media (max-width: 640px) {
    height: 800px;
  }

  &:focus-within {
    outline: 1px solid rgba(0, 195, 255, 0.5);
    box-shadow: 0 0 8px 2px rgba(4, 137, 247, 0.555);
  }

  @media (max-width: 640px) {
    .toastui-editor-md-container {
      flex-direction: column;
    }

    .toastui-editor-main {
      .toastui-editor {
        width: 100%;
      }

      .toastui-editor-md-splitter {
        left: 0;
        top: 50%;
        width: 100%;
        height: 1px;
      }

      .toastui-editor-md-preview {
        width: 100%;
      }
    }
  }
`;
