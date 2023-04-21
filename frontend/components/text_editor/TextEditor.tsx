import { editorValState } from '@/recoil/atom';
import { useCallback } from 'react';
import { SimpleMdeReact } from 'react-simplemde-editor';
import { useRecoilState } from 'recoil';

const TextEditor = () => {
  const [value, setValue] = useRecoilState(editorValState);

  const options = {
    // autoDownloadFontAwesome?: boolean;
    // autofocus?: boolean;
    // autosave?: AutoSaveOptions;
    // autoRefresh?: boolean | { delay: number; };
    // lineNumbers?: boolean;
    // lineWrapping?: boolean;
    // parsingConfig?: ParsingOptions;
    // previewClass?: string | ReadonlyArray<string>;
    // previewImagesInEditor?: boolean;
    // imagesPreviewHandler?: (src: string) => string,
    // previewRender?: (markdownPlaintext: string, previewElement: HTMLElement) => string | null;
    // promptURLs?: boolean;
    // shortcuts?: Shortcuts;
    // showIcons?: ReadonlyArray<ToolbarButton>;
    // uploadImage: true,
    // imageMaxSize?: number;
    // imageAccept?: string;
    // imageUploadFunction?: (file: File, onSuccess: (url: string) => void, onError: (error: string) => void) => void;
    // imageUploadEndpoint?: string;
    // imagePathAbsolute?: boolean;
    // imageCSRFToken?: string;
    // imageCSRFName?: string;
    // imageCSRFHeader?: boolean;
    // imageTexts?: ImageTextsOptions;
  };

  const onChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  return <SimpleMdeReact value={value} onChange={onChange} />;
};

export default TextEditor;
