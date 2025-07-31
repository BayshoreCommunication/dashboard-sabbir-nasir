import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
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

    content: ``,

    editorProps: {
      attributes: {
        spellcheck: 'false',
      },
    },

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setValue(html);

      // const html = editor.getHTML();
      // const wrappedHtml = `<article className="ProseMirror">${html}</article>`;
      // setValue(wrappedHtml);;
    },
  });

  useEffect(() => {
    // this is just an example. do whatever you want to do here
    // to retrieve your editors content from somewhere

    editor?.commands.setContent(value);
  }, [editor?.commands, value]);

  return (
    <div>
      <Toolbar editor={editor} />

      <EditorContent editor={editor} required={true} />
    </div>
  );
};

export default TextEditor;
