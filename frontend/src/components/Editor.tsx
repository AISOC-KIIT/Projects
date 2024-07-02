import "@blocknote/core/fonts/inter.css";
import {
    DefaultReactSuggestionItem,
    getDefaultReactSlashMenuItems,
    SuggestionMenuController,
    useCreateBlockNote,
  } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "../editorStyles.css/";
import { Block, BlockNoteEditor, filterSuggestionItems } from "@blocknote/core";
import { useEffect, useState } from "react";

const Editor = ({clear, onClear}: {clear: boolean, onClear: ()=> void}) => {

    const [blocks, setBlocks] = useState<Block[]>([]);
    const editor = useCreateBlockNote();
    const [customSlashMenuItems, setCustomSlashMenuItems] = useState<DefaultReactSuggestionItem[]>([]);

    let getCustomSlashMenuItems = (
        editor: BlockNoteEditor
      ): DefaultReactSuggestionItem[] => [
        ...getDefaultReactSlashMenuItems(editor)
      ];

    useEffect(()=>{

        // console.log(getCustomSlashMenuItems(editor));
        setCustomSlashMenuItems( getCustomSlashMenuItems(editor).slice(0,9) );
        // console.log(customSlashMenuItems);
              
    },[]);
    
    useEffect(()=>{
        if(clear){
            const n: number = (editor.document).length;
            const arr:string[] =[editor.document[0].id];
            for(let i:number = 1; i<n; i++){
                arr.push(editor.document[i].id)
            }
    
            editor.removeBlocks(arr);

            onClear();
        }
    },[clear]);
    

    return <BlockNoteView slashMenu={false} data-theming-css-variables editor={editor} theme={"dark"}  onChange={() => {
        setBlocks(editor.document);
      }}>
            <SuggestionMenuController
                triggerCharacter={"/"}
                getItems={async (query) => filterSuggestionItems(customSlashMenuItems, query)}
            />
        </BlockNoteView>;

}

export default Editor