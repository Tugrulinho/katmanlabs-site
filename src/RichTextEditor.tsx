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
    extensions: [StarterKit],
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
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className="px-3 py-1 border rounded text-sm"
        >
          H2
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="px-3 py-1 border rounded text-sm"
        >
          Liste
        </button>
      </div>

      <div className="p-3">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
