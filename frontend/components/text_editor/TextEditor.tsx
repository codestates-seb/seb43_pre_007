import { editorValState } from '@/recoil/atom';
import { useCallback } from 'react';
import { SimpleMdeReact } from 'react-simplemde-editor';
import { useRecoilState } from 'recoil';

const TextEditor = () => {
  const [value, setValue] = useRecoilState(editorValState);

  const onChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  return <SimpleMdeReact value={value} onChange={onChange} />;
};

export default TextEditor;
