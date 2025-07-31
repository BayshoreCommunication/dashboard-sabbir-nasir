import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useCallback, useEffect } from 'react';
import ImageResize from 'tiptap-extension-resize-image';
import Toolbar from './Toolbar';

const TextEditor = ({ value, setValue }) => {
  const editor = useEditor({
    extensions: [
      Link.configure({
        openOnClick: false,
      }),

      TextStyle.configure({ types: [ListItem.name] }),

      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),

      Underline,

      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),

      Image.configure({
        allowBase64: true,
        inline: true,
      }),

      ImageResize.configure({
        allowBase64: true,
        inline: true,
      }),

      Youtube.configure({
        controls: false,
        nocookie: true,
        HTMLAttributes: {
          class: 'responsive-video resizable',
        },
      }),
    ],

    content: value || '',

    editorProps: {
      attributes: {
        spellcheck: 'false',
      },
    },

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setValue(html);
    },

    onSelectionUpdate: ({ editor }) => {
      // This ensures the toolbar updates when selection changes
      editor.view.updateState(editor.view.state);
    },
  });

  const updateContent = useCallback(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  }, [editor, value]);

  useEffect(() => {
    updateContent();
  }, [updateContent]);

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className="text-editor-container">
      <Toolbar editor={editor} />
      <div className="editor-content-wrapper">
        <EditorContent 
          editor={editor} 
          className="prose max-w-none focus:outline-none"
        />
      </div>
    </div>
  );
};

export default TextEditor;
