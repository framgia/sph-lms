import React, { useState, Fragment } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export interface RichInputTextFieldProps {
  label: string;
}

const RichInputTextField: React.FC<RichInputTextFieldProps> = ({ label }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const DynamicEditor = dynamic(
    async () => await import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
  );

  return (
    <Fragment>
      <Head>
        <style>
          {`
      .wrapper-class {
        padding: 1rem;
        border: 1px solid #ccc;
      }
      .editor-class {
        padding: 1rem;
        border: 1px solid #ccc;
      }
      .toolbar-class {
        border: 1px solid #ccc;
      }
  `}
        </style>
        ;
      </Head>

      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
        <DynamicEditor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
        />
      </div>
    </Fragment>
  );
};

export default RichInputTextField;
