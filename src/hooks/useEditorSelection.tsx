import { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";

export const useEditorSelection = (editor: Editor | null) => {
  const [, setVersion] = useState(0);

  useEffect(() => {
    if (!editor) return;

    const update = () => setVersion((v) => v + 1);

    editor.on("selectionUpdate", update);
    editor.on("transaction", update);

    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
    };
  }, [editor]);

  return editor;
};
