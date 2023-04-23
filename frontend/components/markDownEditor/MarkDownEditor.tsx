import styled from 'styled-components';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Editor } from 'codemirror';

import EasyMDE from 'easymde';
import hljs from 'highlight.js';
import 'easymde/dist/easymde.min.css';
import 'highlight.js/styles/stackoverflow-light.css';
import 'github-markdown-css/github-markdown.css';

type MarkDownEditorProps = EasyMDE.Options & {
  onChange: (v: string) => void;
  preview?: boolean;
};

const DEFAULT_OPTIONS: EasyMDE.Options = {
  autoDownloadFontAwesome: true,
  sideBySideFullscreen: false,
  spellChecker: false,
  renderingConfig: {
    codeSyntaxHighlighting: true,
    hljs,
  },
  status: false,
  tabSize: 2,
  lineWrapping: true,
  maxHeight: '300px',
  previewClass: ['markdown-body'],
};

export const MarkDownEditor = ({
  preview,
  onChange,
  ...propsOptions
}: MarkDownEditorProps) => {
  const instance = useRef<EasyMDE | null>(null);
  const codeMirror = useRef<CodeMirror.Editor | null>(null);
  const [textArea, setTextArea] = useState<HTMLTextAreaElement | null>(null);

  const handleChange = useCallback(
    (ins: Editor) => onChange(ins.getValue()),
    [onChange]
  );

  const setPreview = (ins: EasyMDE) => {
    //@ts-ignore
    ins.togglePreview();
  };

  useEffect(() => {
    if (!textArea) return;

    if (preview) {
      DEFAULT_OPTIONS['toolbar'] = false;
      DEFAULT_OPTIONS['status'] = false;
      DEFAULT_OPTIONS['maxHeight'] = 'auto';
    }

    const ins = new EasyMDE({
      element: textArea,
      ...DEFAULT_OPTIONS,
      ...propsOptions,
    });

    instance.current = ins;
    codeMirror.current = ins.codemirror;

    if (preview) setPreview(ins);
    //@ts-ignore
    if (!preview) ins.toggleSideBySide();

    return () => {
      ins.toTextArea();
      ins.cleanup();
    };
  }, [propsOptions, textArea, preview]);

  useEffect(() => {
    // setTextArea 되면 useEffect가 순서대로 실행이 되어, codeMirror.current.on이 실행이된다.
    if (!codeMirror.current) return;

    codeMirror.current.on('change', handleChange);

    return () => {
      codeMirror.current?.off('change', handleChange);
    };
  }, [textArea, handleChange]);

  return (
    <Container preview={preview}>
      <textarea ref={setTextArea} />
    </Container>
  );
};

const Container = styled.div<{ preview: boolean | undefined }>`
  .EasyMDEContainer {
    flex: 1;
    display: flex;
    flex-direction: column;

    .markdown-body {
      margin-top: 10px;
      width: 100% !important;
      background-color: unset;
      border: unset;
      height: fit-content !important;
      background-color: white;

      p {
        font-size: 1rem;
      }

      pre {
        max-height: 600px;
      }
    }

    .EasyMDEContainer .CodeMirror {
      border: 1px solid red !important;
    }

    .CodeMirror {
      width: 100% !important;
      border: ${({ preview }) =>
        preview ? 'none !important' : '1px solid #ced4da !important'};
    }
  }
`;
