import React, { useCallback } from 'react';
import {RichTextPlugin,} from '@lexical/react/LexicalRichTextPlugin';
import { EditorState } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';

interface Props {
  onChange: (editorState: EditorState) => void;
  editorRef: React.MutableRefObject<any>;
}

const MurmurEditor: React.FC<Props> = ({ onChange, editorRef }) => {
  const [editor] = useLexicalComposerContext();
  editorRef.current = editor;

  return (
    <>
      <RichTextPlugin
        contentEditable={<ContentEditable className="editor-input w-full" />}
        placeholder={<div className="editor-placeholder left-[10px] top-[8px]">What's happening?</div>}
        ErrorBoundary={({ children }) => <>{children}</>}
      />
      <HistoryPlugin />
      <OnChangePlugin onChange={onChange} />
    </>
  );
};

export default MurmurEditor;
