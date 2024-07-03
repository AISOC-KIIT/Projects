import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "../editorStyles.css/"; 
import { useEffect, useMemo, useState } from "react";
 

 
// async function loadFromStorage() {
//   const storageString = localStorage.getItem("editorContent");
//   return storageString
//     ? (JSON.parse(storageString) as PartialBlock[])
//     : undefined;
// }
 
export default function Viewer({ content }: { content: string }) { 

  const storageString = JSON.parse(content) as PartialBlock[];

  const [initialContent, setInitialContent] = useState<PartialBlock[] | undefined | "loading">("loading");

  useEffect(() => {
    setInitialContent(storageString);
  }, []);
  

  const editor = useMemo(() => {
    if (initialContent === "loading") {
      return undefined;
    }
    return BlockNoteEditor.create({ initialContent });
  }, [initialContent]);
 
  if (editor === undefined) {
    return "Loading content...";
  }
 
 
  return (
    <BlockNoteView theme={"dark"} editor={editor} editable={false}/>
    // <div className="text-white">
    //     {content}
    // </div>
  );
}
 