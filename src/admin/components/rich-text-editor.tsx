import { useEffect } from "react"
import { Button, Text } from "@medusajs/ui"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

type RichTextEditorProps = {
  value: string
  onChange: (value: string) => void
}

const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    editorProps: {
      attributes: {
        class: "rte min-h-[160px] outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (!editor) {
      return
    }
    const current = editor.getHTML()
    if (current !== value) {
      editor.commands.setContent(value || "", false)
    }
  }, [editor, value])

  if (!editor) {
    return (
      <Text size="small" leading="compact" className="text-ui-fg-subtle">
        Loading editor...
      </Text>
    )
  }

  return (
    <div className="flex flex-col gap-y-2">
      <style>
        {`
          .rte {
            white-space: pre-wrap;
          }
          .rte p {
            margin: 0 0 0.75rem;
          }
          .rte h2 {
            font-size: 1.25rem;
            font-weight: 600;
            margin: 1rem 0 0.5rem;
          }
          .rte ul,
          .rte ol {
            padding-left: 1.5rem;
            margin: 0 0 0.75rem;
          }
          .rte ul {
            list-style: disc;
          }
          .rte ol {
            list-style: decimal;
          }
        `}
      </style>
      <div className="flex flex-wrap gap-2">
        <Button
          size="small"
          variant={editor.isActive("bold") ? "primary" : "secondary"}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          Bold
        </Button>
        <Button
          size="small"
          variant={editor.isActive("italic") ? "primary" : "secondary"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          Italic
        </Button>
        <Button
          size="small"
          variant={editor.isActive("bulletList") ? "primary" : "secondary"}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          Bullet List
        </Button>
        <Button
          size="small"
          variant={editor.isActive("orderedList") ? "primary" : "secondary"}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          Numbered List
        </Button>
        <Button
          size="small"
          variant={editor.isActive("heading", { level: 2 }) ? "primary" : "secondary"}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </Button>
      </div>
      <div className="rounded-md border border-ui-border-base bg-ui-bg-base p-3">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

export default RichTextEditor
