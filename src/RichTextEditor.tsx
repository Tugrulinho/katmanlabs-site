import {
  Table,
  TableRow,
  TableHeader,
  TableCell,
} from "@tiptap/extension-table";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Image from "@tiptap/extension-image";
import Blockquote from "@tiptap/extension-blockquote";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function RichTextEditor({
  content,
  onChange,
}: {
  content: string;
  onChange: (value: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Blockquote,
      Image,
      HorizontalRule,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: content || "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    const currentHtml = editor.getHTML();
    const incomingHtml = content || "";

    if (currentHtml !== incomingHtml) {
      editor.commands.setContent(incomingHtml, false);
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div className="border rounded bg-white overflow-hidden">
      <div className="flex flex-wrap gap-2 p-2 border-b bg-gray-50">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="px-3 py-1 border rounded text-sm"
        >
          Bold
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="px-3 py-1 border rounded text-sm"
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className="px-3 py-1 border rounded text-sm"
        >
          Underline
        </button>

        <button
          type="button"
          onClick={() => {
            const url = prompt("Link URL gir");
            if (!url) return;
            editor.chain().focus().setLink({ href: url }).run();
          }}
          className="px-3 py-1 border rounded text-sm"
        >
          Link
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
          className="px-3 py-1 border rounded text-sm"
        >
          Unlink
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className="px-3 py-1 border rounded text-sm"
        >
          Quote
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className="px-3 py-1 border rounded text-sm"
        >
          H2
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className="px-3 py-1 border rounded text-sm"
        >
          H3
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className="px-3 py-1 border rounded text-sm"
        >
          H4
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="px-3 py-1 border rounded text-sm"
        >
          Liste
        </button>

        <button
          type="button"
          onClick={() => {
            const url = prompt("Görsel URL gir");
            if (!url) return;
            editor.chain().focus().setImage({ src: url }).run();
          }}
          className="px-3 py-1 border rounded text-sm"
        >
          Image
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="px-3 py-1 border rounded text-sm"
        >
          Divider
        </button>
        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
          className="px-3 py-1 border rounded text-sm"
        >
          Table
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().addColumnAfter().run()}
          className="px-3 py-1 border rounded text-sm"
        >
          Col+
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().addRowAfter().run()}
          className="px-3 py-1 border rounded text-sm"
        >
          Row+
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().deleteTable().run()}
          className="px-3 py-1 border rounded text-sm"
        >
          DelTable
        </button>
      </div>

      <div className="p-3">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
