// RichTextEditor.tsx

"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Table } from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Pilcrow,
  TableIcon,
  Minus,
  Trash2,
  Plus,
  ChevronsLeftRight,
  ArrowLeftToLine,
  ArrowRightToLine,
  ArrowUpToLine,
  ArrowDownToLine,
  Columns,
  Rows,
  Split,
  Merge,
  Copy,
} from "lucide-react";

import "@/styles/tiptap.css";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useEditorSelection } from "@/hooks/useEditorSelection";
import { useEffect } from "react";

const EditorToolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border border-input bg-transparent rounded-t-md p-1 flex flex-wrap items-center gap-1">
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="h-8" />
      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 2 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 3 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
      >
        <Heading3 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("paragraph")}
        onPressedChange={() => editor.chain().focus().setParagraph().run()}
      >
        <Pilcrow className="h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="h-8" />
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="h-8" />

      <Button
        size="sm"
        type="button"
        variant="ghost"
        disabled={editor.isActive("table")}
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        }
      >
        <TableIcon className="h-4 w-4" />
      </Button>

      {editor.isActive("table") && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" size="sm" variant="ghost">
              <ChevronsLeftRight className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().addColumnBefore().run()}
            >
              <ArrowLeftToLine className="mr-2 h-4 w-4" /> Add Column Before
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().addColumnAfter().run()}
            >
              <ArrowRightToLine className="mr-2 h-4 w-4" /> Add Column After
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().deleteColumn().run()}
            >
              <Columns className="mr-2 h-4 w-4" /> Delete Column
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => editor.chain().focus().addRowBefore().run()}
            >
              <ArrowUpToLine className="mr-2 h-4 w-4" /> Add Row Before
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().addRowAfter().run()}
            >
              <ArrowDownToLine className="mr-2 h-4 w-4" /> Add Row After
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().deleteRow().run()}
            >
              <Rows className="mr-2 h-4 w-4" /> Delete Row
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => editor.chain().focus().mergeCells().run()}
            >
              <Merge className="mr-2 h-4 w-4" /> Merge Cells
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().splitCell().run()}
            >
              <Split className="mr-2 h-4 w-4" /> Split Cell
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                const tableNode = editor.state.selection.$from.node(-1);
                if (tableNode?.type.name === "table") {
                  const dom = document.createElement("div");
                  dom.appendChild(
                    editor.view
                      .domAtPos(editor.state.selection.from)
                      .node?.closest("table")!
                      .cloneNode(true)
                  );
                  navigator.clipboard.writeText(dom.innerHTML);
                }
              }}
            >
              <Copy className="mr-2 h-4 w-4" /> Copy Table
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => editor.chain().focus().deleteTable().run()}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete Table
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

interface RichTextEditorProps {
  value: string;
  onChange: (richText: string) => void;
}

export const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure(),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value,
    editorProps: {
      attributes: {
        // Updated class for better styling scope
        class:
          "tiptap prose dark:prose-invert prose-sm sm:prose-base m-5 focus:outline-none",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });
  useEditorSelection(editor);

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      console.log("value changes::");
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  return (
    <div className="flex flex-col justify-stretch min-h-[250px] border border-input rounded-md overflow-hidden">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} className="flex-grow overflow-auto" />
    </div>
  );
};
